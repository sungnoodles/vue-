<template>
  <div>
    <div
      class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
    >
      <div class="mui-scroll">
        <a
          :class="['mui-control-item',item.id == 0? 'mui-active' : '']"
          v-for="item in titles"
          :key="item.id"
          @click="getListById(item.id)"
        >{{ item.title }}</a>
      </div>
    </div>
    <ul class="imgs">
      <router-link v-for="item in list" :key="item.id" :to="'/home/photoInfo/' + item.id" tag="li">
        <img v-lazy="item.img_url" />
        <div class="info">
          <div class="title">{{ item.title }}</div>
          <div class="body">{{ item.zhaiyao }}</div>
        </div>
      </router-link>
    </ul>
  </div>
</template>

<script>
import mui from "../../lib/mui/js/mui.min.js";

export default {
  data() {
    return {
      titles: [],
      list: []
    };
  },
  created() {
    this.getTitles();
    this.getListById(0);
  },
  methods: {
    getTitles() {
      this.$http.get("api/getimgcategory").then(res => {
        this.titles = res.body.message;
        this.titles.unshift({ title: "全部", id: 0 });
      });
    },
    getListById(id) {
      this.$http.get("api/getimages/" + id).then(res => {
        this.list = res.body.message;
      });
    }
  },
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

.imgs {
  padding: 0;
  margin: 0;
  padding: 10px;
  li {
    list-style: none;
    background-color: #ccc;
    text-align: center;
    margin-bottom: 10px;
    box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.4);
    position: relative;
    .info {
      position: absolute;
      bottom: 0;
      text-align: left;
      max-height: 100px;
      color: #fff;
      background-color: rgba(0,0,0,.4);
      .title {
        font-size: 16px;
        font-weight: bold;
      }
      .body {
        font-size: 14px;
      }
    }
    img {
      width: 100%;
      display: block;
    }
    img[lazy="loading"] {
      width: 40px;
      height: 300px;
      margin: auto;
    }
  }
}
</style>


