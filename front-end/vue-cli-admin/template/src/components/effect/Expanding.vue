<!-- (The MIT License)

Copyright (c) 2016 fundon &lt;cfddream@gmail.com&lt;

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE. -->
<!-- https://github.com/vue-bulma/expanding -->
<template>
  <transition
    @beforeEnter="beforeEnter"
    @afterEnter="afterEnter"
    @beforeLeave="beforeLeave"
    @afterLeave="afterLeave"
  >
    <slot></slot>
  </transition>
</template>

<script>
export default {
  methods: {
    beforeEnter (el) {
      this.$nextTick(function () {
        el.style.overflow = 'hidden'
        el.style.visibility = 'hidden'
        el.classList.remove('collapse')
        el.style.display = 'block'
        var height = `${el.scrollHeight}px`
        el.style.height = 0

        setTimeout(() => {
          el.style.visibility = 'visible'
          el.classList.add('collapsing')
          el.style.height = height
          console.info(height)
        }, 0)
      })
    },
    afterEnter (el) {
      el.classList.remove('collapsing')
      el.classList.add('collapse', 'in')
    },
    beforeLeave (el) {
      el.classList.add('collapsing')
      el.classList.remove('collapse', 'in')
      el.style.height = 0
    },
    afterLeave (el) {
      el.classList.remove('collapsing')
      el.classList.add('collapse')
      el.style.display = 'none'
      el.style.height = ''
    }
  }
}
</script>

<style scoped>
.collapse {
  display: none;
}
.collapse.in {
  display: block;
}

.collapsing {
  height: 0;
  overflow: hidden;
  transition: height 0.377s ease;
}
</style>
