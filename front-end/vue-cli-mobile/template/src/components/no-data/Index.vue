<template>
  <div class="no-data">
    <img src="./no-data.png" class="no-data__img" />
    <div class="no-data__text">
      <slot> </slot>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  methods: {}
}
</script>

<style scoped>
.no-data {
  text-align: center;
  padding: 1.5rem 0;
  background: #f2f2f2;
}
.no-data__img {
  display: inline-block;
}

.no-data__text {
  margin-top: 0.2rem;
  font-size: 14px;
}
</style>
