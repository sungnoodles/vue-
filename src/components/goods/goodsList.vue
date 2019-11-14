<template>
  <div>
    <div class="goods-list">
      <div class="goods-item" v-for="item in goodsList" :key="item.id" @click='getInfo(item.id)'>
        <img :src="item.img_url" />
        <h1 class="title">{{ item.title }}</h1>
        <div class="info">
          <p class="price">
            <span class="now">￥{{ item.sell_price }}</span>
            <span class="old">￥{{ item.market_price }}</span>
          </p>
          <p class="stock">
            <span>热卖中</span>
            <span>剩{{ item.stock_quantity }}件</span>
          </p>
        </div>
      </div>
      <mt-button type="danger" size="large" @click="getMore">加载更多</mt-button>
    </div>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      pageindex: 1,
      goodsList: []
    };
  },
  methods: {
    getGoodsList(index) {
      this.$http.get("api/getgoods?pageindex=" + index).then(res => {
        if (res.body.status === 0) {
          this.goodsList = this.goodsList.concat(res.body.message);
        } else {
          Toast("数据获取失败");
        }
      });
    },
    getMore() {
      this.pageindex++;
      this.getGoodsList(this.pageindex);
    },
    getInfo (id){
      this.$router.push({ name: 'goodsInfo', params: { goodsId: id }})
    }
  },
  created() {
    this.getGoodsList(this.pageindex);
  }
};
</script>


<style lang="less" scoped>
.goods-list {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 7px;
  .goods-item {
    min-height: 298px;
    width: 49%;
    box-shadow: 0 0 8px #ccc;
    margin: 3px 0;
    padding: 2px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    img {
      width: 100%;
      height: 170px;
    }
    .title {
      font-size: 16px;
    }
    .info {
      background-color: #ddd;
      .price {
        font-size: 12px;
        padding: 2px;
        p {
          padding: 0;
          margin: 0;
        }

        .now {
          color: red;
          font-size: 14px;
          font-weight: bold;
        }
        .old {
          text-decoration: line-through;
          margin-left: 20px;
        }
      }
      .stock {
        display: flex;
        justify-content: space-between;
      }
    }
  }
}
</style>


