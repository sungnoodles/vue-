<template>
  <div class="goodsInfo">
    <transition
    @before-enter='beforeEnter'
    @enter='enter'
    @after-enter='afterEnter'
    >
      <div class="ball" v-show="flag" ref='ball'></div>
    </transition>
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <lunbotu :lunList="lunList" :isFull="false"></lunbotu>
        </div>
      </div>
    </div>
    <div class="mui-card">
      <div class="mui-card-header">商品购买详情</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p class="price">
            市场价：
            <del>￥{{info.sell_price}}</del>&nbsp;&nbsp;销售价：
            <span class="price-now">￥{{ info.market_price }}</span>
          </p>
          <p class="num">
            购买数量：
            <numbox @func='getCount' :max='info.stock_quantity'></numbox>
          </p>
          <p>
            <mt-button type="primary" size="small">立即购买</mt-button>
            <mt-button type="danger" size="small" @click="add" >加入购物车</mt-button>
          </p>
        </div>
      </div>
    </div>
    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p class="articleNumber">商品货号：{{ info.goods_no }}</p>
          <p class="stock">库存情况：60件</p>
          <p class="updateTime">上架时间： {{ info.add_time | dateFormat }}</p>
        </div>
      </div>
      <div class="mui-card-footer">
        <mt-button type="primary" size="large" plain @click="toIntro(id)">图文介绍</mt-button>
        <mt-button type="danger" size="large" plain @click="toCmt(id)">商品评论</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
import lunbotu from "../lunbotu.vue";
import numbox from "../numbox.vue";




export default {
  data() {
    return {
      lunList: [],
      id: this.$route.params.goodsId,
      info: {},
      flag: false,
      count : 0
    };
  },
  methods: {
    getLun() {
      this.$http.get("api/getthumimages/" + this.id).then(res => {
        if (res.body.status === 0) {
          this.lunList = res.body.message;
          this.lunList.forEach(item => {
            item.img = item.src;
          });
        }
      });
    },
    getInfo() {
      this.$http.get("api/goods/getinfo/" + this.id).then(res => {
        if (res.body.status === 0) {
          this.info = res.body.message[0];
        }
      });
    },
    toIntro(id) {
      this.$router.push({ name: "goodsIntro", params: { userId: id } });
    },
    toCmt(id) {
      this.$router.push({ name: "goodsCmt", params: { userId: id } });
    },
    add() {
      this.flag = !this.flag;
      // 产品信息：{id:产品id，count：产品数量，price：产品价格，selected：是否选中的状态}
      var good = {id:this.id,count: parseInt(this.count),price:this.info.market_price,selected:true}
      this.$store.commit('addToCar',good)
      this.$store.commit('newNum')
      
    },
    beforeEnter(el){
      el.style.transform = 'translate(0,0)'
    },
    enter(el,done){
      el.offsetWidth
      el.style.transition = 'transform 1s ease'

      const offsetBall = this.$refs.ball.getBoundingClientRect()
      const offsetBadge = document.getElementsByClassName('mui-badge')[0].getBoundingClientRect()
      const x = offsetBadge.left - offsetBall.left
      const y = offsetBadge.top - offsetBall.top
      el.style.transform = 'translate('+ x +'px,'+ y +'px)'
      done()
    },
    afterEnter(el){
      this.flag = !this.flag
    },
    getCount(count){
      this.count = count
    }
  },
  created() {
    this.getLun();
    this.getInfo();
  },
  components: {
    lunbotu,
    numbox
  }
};
</script>


<style lang="less" scoped>
.goodsInfo {
  .ball {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: red;
    position: absolute;
    z-index: 99;
    top: 390px;
    left: 153px;
  }
  background-color: #ccc;
  overflow: hidden;
  .mui-card {
    box-shadow: 0 0 8px #888;
  }
}
.num {
  & > div {
    display: inline-block;
  }
}
.price {
  .price-now {
    font-weight: bold;
    font-size: 16px;
    color: red;
  }
}
.mui-card {
  .mui-card-footer {
    display: block;
    button {
      margin-top: 10px;
    }
  }
}
</style>

