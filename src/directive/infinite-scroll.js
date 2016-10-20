// 无限加载
var jQuery = require('jQuery');
var Vue = require('vue');
Vue.directive('infinite-scroll', {
  bind: function() {
    var directive = this;
    var $el = jQuery(directive.el);
    this.$el = $el;
    // 距底部距离多少触发
    this.distance = $el.attr('infinite-scroll-distance');
    if (!isNaN(this.distance)) {
      this.distance = parseFloat(this.distance);
    } else {
      this.distance = 0;
    }

    var throttleDoCheck = throttle(this.doCheck, 200, this);

    $el.scroll(function() {
      throttleDoCheck();
    });
  },
  doCheck: function() {
    var directive = this;
    var $el = this.$el;
    var disabledExpr = $el.attr('infinite-scroll-disabled');
    if (directive.vm.$get(disabledExpr)) {
      return;
    }
    var totalHeight = $el.prop('scrollHeight');
    var scrollTop = $el.scrollTop();
    var height = $el.height();
    if (this.isTouchEnd(totalHeight, scrollTop, height)) {
      directive.vm.$get(this.expression);
    }
  },
  isTouchEnd: function(totalHeight, scrollTop, height) {
    if (totalHeight - (height + scrollTop) <= this.distance) {
      return true;
    } else {
      return false;
    }
  },
  update: function(newValue, oldValue) {

  },
  unbind: function() {
    this.$el.unbind('scroll');
  }
});

function throttle(fn, time, ctx) {
  time = time || 200;
  ctx = ctx || fn;
  var runId = null;
  return function() {
    var args = arguments;
    clearTimeout(runId); // 把之前没执行的给去掉
    runId = setTimeout(function() {
      fn.apply(ctx, args);
    }, time);
  }
}
