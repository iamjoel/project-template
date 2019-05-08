<template>
  <div>
    <div
      class="media"
      v-if="!dirVer"
      :class="{
        'media--round': img.isCircle,
        'media--right': img.isRight
      }"
    >
      <img class="media__img" :src="img.src" alt="" :style="imgStyle" />
      <div class="media__body">
        <slot />
      </div>
    </div>
    <!-- 垂直 Media -->
    <div v-else class="media-ver">
      <img class="media__img" :src="img.src" alt="" :style="imgStyle" />
      <div class="media__body">
        <slot />
      </div>
    </div>
  </div>
</template>

<script src="./main.js"></script>

<style scoped src="./style.css"></style>
