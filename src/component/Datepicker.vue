<template>
  <input type="text" >
</template>
<script>
  // http://xdsoft.net/jqplugins/datetimepicker/
  require('../vendor/datepicker/jquery.datetimepicker')
  var defaultOption = {

  }
  import { mapGetters } from 'vuex'
  export default {
    props: {
      option: {
        type: Object
      },
      value: {
        default: '',
        type: String
      }
    },
    computed: {
      ...mapGetters(['currLan']),
    },
    data() {
      return {
        $datepicker:{}
      }
    },
    mounted: function () {
      this.init()
    },
    methods: {
      init(){
        var vm = this
        this.$datepick = $(this.$el)
        var option = Object.assign({}, defaultOption, this.option)
        this.$datepick
          .val(this.value)
          .jq_datetimepicker({
            ...option,
            lang: this.currLan,
            onChangeDateTime(date) {
              vm.$emit('change', date)
            }
          })
      }
    },
    watch: {
      currLan(newVal){
        // this.$datepick.jq_datetimepicker('setOptions', {lang: newVal})
        this.init()
      }
    }
  }
</script>
<style src="../vendor/datepicker/jquery.datetimepicker.css"></style>