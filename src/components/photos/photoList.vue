<template>
  <div>
    <div
      class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
    >
      <div class="mui-scroll">
        <a class="mui-control-item mui-active">推荐</a>
        <a class="mui-control-item">热点</a>
        <a class="mui-control-item">北京</a>
        <a class="mui-control-item">社会</a>
        <a class="mui-control-item">娱乐</a>
        <a class="mui-control-item">科技</a>
      </div>
    </div> 
  </div>
</template>

<script>
import mui from "../../lib/mui/js/mui.min.js";

export default {
  data() {
    return {};
  },
  methods: {},
  mounted() {
    console.log();

    mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0006 //阻尼系数,系数越小滑动越灵敏
    });
  }
};
</script>

<style lang="less" scoped>
* {
  touch-action: pan-y;
}
</style>


