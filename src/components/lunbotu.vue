<template>
  <div>
    <mt-swipe class="swipe" :auto="4000">
      <mt-swipe-item v-for="item in lunList" :key="item.id">
        <img :src="item.img"  :class="{full:isFull}"/>
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>
export default {
    props:['lunList','isFull']
};
</script>

<style lang="less" scoped>
.swipe {
  height: 200px;
  text-align: center;
  img {
    height: 100%;
  }
}
.full {
  width: 100%;
}
</style>
