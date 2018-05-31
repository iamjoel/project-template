<template>
  <div class="main">
    <ImgBadge class="mb-10">
      <van-tag type="danger">热卖</van-tag>
    </ImgBadge>

    <ImgBadge class="mb-10"
      postion="top-right"
      >
      <van-tag type="danger">热卖</van-tag>
    </ImgBadge>

    <ImgBadge class="mb-10"
      postion="bottom-left"
      img-width="2rem"
      img-height="1rem"
      >
      <van-tag type="danger">热卖</van-tag>
    </ImgBadge>

    <ImgBadge class="mb-10"
      postion="bottom-right">
      <van-tag type="danger">热卖</van-tag>
    </ImgBadge>
  </div>
</template>

<script>
import ImgBadge from '@/components/image-badge'
export default {
  components: {
    ImgBadge
  },
}
</script>

<style scoped></style>