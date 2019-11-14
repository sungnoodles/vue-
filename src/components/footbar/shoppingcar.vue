<template>
  <div class="shopcar">
    <div class="goods-list">
      <div class="mui-card" v-for="(item,i) in list" :key="item.id">
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <mt-switch v-model="item.selected" @change="selectedChange(item.id)"></mt-switch>
            <img :src="item.thumb_path" />
            <div class="info">
              <h1>{{ item.title }}</h1>
              <p>
                <span class="price">￥ {{ item.sell_price }}</span>
                <numbox :count="item.cou" :id="item.id"></numbox>
                <a href="#" @click="del(item.id,i)">删除</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mui-card count-bar">
      <div class="mui-card-content">
        <div class="mui-card-content-inner jiesuan">
          <div class="sum">
            <p>总计（不含运费）</p>
            <p>
              已勾选商品
              <span>{{ $store.getters.getNumAndSum.num }}</span> 件，总价
              <span>￥ {{ $store.getters.getNumAndSum.sum }}</span>
            </p>
          </div>
          <mt-button type="danger" size="small">结算</mt-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import numbox from "../shopcar-numbox.vue";
var car = JSON.parse(localStorage.getItem("car") || "[]");
export default {
  data() {
    return {
      list: [],
      bl: true,
      s:0
    };
  },
  created() {
    this.getlist();
  },
  methods: {
    getlist() {
      var ids = [];
      car.forEach(item => ids.push(item.id));
      this.$http.get("api/goods/getshopcarlist/" + ids.join(",")).then(res => {
        if (res.body.status === 0) {
          this.list = res.body.message;
          this.list.forEach((item, index) => {
            item.cou = car[index].count;
            item.selected = car[index].selected;
          });
        }
      });
    },
    del(id, i) {
      this.list.splice(i, 1);
      this.$store.commit("remove", id);
      this.$store.commit("newNum");
    },
    selectedChange(id) {
      car.some(item => {
        if (item.id === id) {
          item.selected = !item.selected;
          return true;
        }
      });
      console.log(car);
      
      this.$store.state.car = car
      localStorage.setItem("car", JSON.stringify(car));
    }
  },
  components: {
    numbox
  }
};
</script>


<style lang='less' scoped>
.shopcar {
  background-color: #ccc;
  overflow: hidden;
}
.goods-list {
  .mui-card-content-inner {
    display: flex;
    align-items: center;
    img {
      height: 60px;
      width: 60px;
    }
    .info {
      width: 100%;
      h1 {
        font-size: 13px;
      }
      p {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-around;
        padding: 0;
        margin: 0;
      }
    }
  }
}
.jiesuan {
  display: flex;
  justify-content: space-between;
  align-items: center;
  p {
    padding: 0;
    margin: 0;
    span {
      color: red;
      font-weight: bold;
    }
  }
}
</style>

