<template>
  <div>
    <div class="media" 
      v-if="!dirVer"
      :style="{
        padding: padding
      }"
      :class="{
        'media--border': !noBorder,
        'media--round': imgRound,
        'media--right': imgRight,
      }"
    >
      <img class="media__img" :src="src" alt=""
        :style="imgStyle"
      />
      <div class="media__body">
        <slot/>
      </div>
    </div>
    <!-- 垂直 Media -->
    <div v-else
      class="media-ver"
      :style="{
        padding: padding
      }"
    >
      <img class="media__img" :src="src" alt=""
        :style="imgStyle"
        />
      <div class="media__body">
        <slot/>
      </div>
    </div>
  </div>
  
</template>

<script src="./main.js"></script>

<style scoped src="./style.css"></style>