<template>
  <div class="main ta-c p-20rem">
    首页，欢迎：\{{ $mock.Random.cname() }}
    \{{ user }}
    \{{ anotherUser }}
  </div>
</template>

<script src="./main.js"></script>

<style scoped src="./style.css"></style>
