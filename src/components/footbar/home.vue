<template>
  <div>
    <mt-swipe class="swipe" :auto="4000">
      <mt-swipe-item v-for="item in lunList" :key="item.id">
        <img :src="item.img">
      </mt-swipe-item>
    </mt-swipe>
    
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
export default {
  created(){
    this.getLun()
  },
  data() {

    return {
      lunList: []
    };
  },
  methods: {
    getLun() {
      this.$http.get("http://www.liulongbin.top:3005/api/getlunbo").then(res => {
        if (res.body.status === 0) {
          this.lunList = res.body.message;
        } else {
          Toast('图片获取失败')
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
</style>

