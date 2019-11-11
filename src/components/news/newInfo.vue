<template>
  <div class="news_containner">
    <h3 class="title">{{news.title}}</h3>
    <p class="subTitle">
      <span>发表时间: {{ news.add_time | dateFormat }}</span>
      <span>点击：{{ news.click }}次</span>
    </p>
    <hr />
    <p v-html="news.content"></p>
    <comment :id='id'></comment>
  </div>
</template>

<script>
// 导入品论模块
import comment from "../comment/comment.vue";

export default {
  data() {
    return {
      id: this.$route.params.id,
      news: {}
    };
  },
  created() {
    this.getNews();
    console.log(this.news);
  },
  methods: {
    getNews() {
      this.$http.get("api/getnew/" + this.id).then(res => {
        if (res.body.status === 0) {
          this.news = res.body.message[0];
        } else {
          // alert('获取失败')
        }
      });
    }
  },
  components: {
      comment
  }
};
</script>

<style lang="less">
.news_containner {
  padding: 0 10px;

  .title {
    font-size: 16px;
    color: red;
    text-align: center;
    padding: 10px 0;
  }
  .subTitle {
    font-size: 14px;
    color: cyan;
    justify-content: space-between;
    display: flex;
  }
}
</style>
