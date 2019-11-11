<template>
  <div>
    <mt-swipe class="swipe" :auto="4000">
      <mt-swipe-item v-for="item in lunList" :key="item.id">
        <img :src="item.img" />
      </mt-swipe-item>
    </mt-swipe>
    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/newsList">
          <img src="../../images/menu1(1).png" alt />
          <div class="mui-media-body">新闻资讯</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../images/menu2.png" alt />

          <div class="mui-media-body">图片分享</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../images/menu3.png" alt />
          <div class="mui-media-body">商品购买</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../images/menu4.png" alt />
          <div class="mui-media-body">留言反馈</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../images/menu5.png" alt />
          <div class="mui-media-body">视频专区</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../images/menu6.png" alt />
          <div class="mui-media-body">联系我们</div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
export default {
  created() {
    this.getLun();
  },
  data() {
    return {
      lunList: []
    };
  },
  methods: {
    getLun() {
      this.$http
        .get("http://www.liulongbin.top:3005/api/getlunbo")
        .then(res => {
          if (res.body.status === 0) {
            this.lunList = res.body.message;
          } else {
            Toast("图片获取失败");
          }
        });
    }
  }
};
</script>


<style lang='less' scoped>
.app-container {
  padding-top: 40px;
}
.swipe {
  height: 200px;
  img {
    width: 100%;
    height: 100%;
  }
}
// 六宫格
.mui-grid-view.mui-grid-9 {
  background-color: #fff;
  li {
    border: none;
    font-size: 12px;
  }
  img {
    width: 60px;
    height: 60px;
  }
}
</style>

