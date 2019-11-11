<template>
  <div>
    <ul class="mui-table-view">
      <li class="mui-table-view-cell mui-media" v-for="item in newsList" :key="item.id">
        <router-link :to="'/home/newInfo/' + item.id">
          <img
            class="mui-media-object mui-pull-left"
            :src="item.img_url"
          />
          <div class="mui-media-body">
            <h3>{{ item.title }}</h3>
            <p class="mui-ellipsis">
              <span>发表时间：{{ item.add_time | dateFormat }}</span>
              <span>点击：{{ item.click }}次</span>
            </p>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>


<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      newsList: []
    };
  },
  created(){
      this.getNewsList()
  },
  methods: {
    getNewsList() {
      this.$http.get("api/getnewslist").then(res => {
        console.log(res.body);
        this.newsList=res.body.message
        
      });
    }
  }
};
</script>



<style lang="less" scoped>
.mui-media-body {
  h3 {
    font-size: 14px;
  }
  .mui-ellipsis {
    font-size: 12px;
    display: flex;
    justify-content: space-between;
    color: #22aa22;
  }
}
</style>
