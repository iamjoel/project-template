
<template> 
  <div class="main">
    <media 
      v-bind="{
        'image.width': '.2rem',
        'spaceBetween': '.2rem'
}"
    >
      <template name="default" >
        <div 
          v-html="'<h2>xxxx</h2><p>dffffdf</p>'"
        ></div>
      </template>
    </media>

    <van-swipe 
      v-bind="{}"
    >
      <template name="default" >
        <component 
            is="van-swipe-item"
            v-for="i in 3"
            :key="i"
            v-html="'<img src=http://via.placeholder.com/200x100 alt= style=width:100%/>'">
          </component>
      </template>
    </van-swipe>

    <placeholder 
      v-bind="{}"
    >
      <template name="default" >
        <div 
          v-html="'xx组件'"
        ></div>
      </template>
    </placeholder>

    <placeholder 
      v-bind="{}"
    >
      <template name="default" >
        <div 
          v-html="'xx组件2'"
        ></div>
      </template>
    </placeholder>

    <placeholder 
      v-bind="{}"
    >
      <template name="default" >
        <div 
          v-html="'乱骑ibidz'"
        ></div>
      </template>
    </placeholder>
  </div>
</template>

<script src="./main.js"></script>

<style scoped src="./style.css"></style>