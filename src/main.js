// 入口文件


// 导入vue模块
import Vue from 'vue'


// 导入全局less
import './app.less'

// 导入vuex
import Vuex from 'vuex'
Vue.use(Vuex)

var car = JSON.parse(localStorage.getItem('car') || '[]')
var store = new Vuex.Store({
  state: {
    // car用于存储加入购物车的产品信息
    // 产品信息：{id:产品id，count：产品数量，price：产品价格，selected：是否选中的状态}
    car: car,
    num: 0, //购物车的总数量
  },
  mutations: {
    addToCar(state, good) {
      var flag = true
      state.car.forEach(item => {
        if (item.id === good.id) {
          item.count += parseInt(good.count)
          flag = false
          return true
        }
      })
      if (flag) {
        state.car.push(good)
      }
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    newNum(state) {
      // 更新购物车商品数量
      state.num = 0
      state.car.forEach(item => {
        state.num += parseInt(item.count)
      })
    },
    remove(state, id) {
      state.car.some((item, index) => {
        if (item.id === id) {
          state.car.splice(index, 1);
          console.log('shanchule');
          
          localStorage.setItem("car", JSON.stringify(state.car))
        }
        return true;
      });
    }
  },
  getters: {
    getNumAndSum(state){
      var o = {
        num:0,
        sum:0
      }
      state.car.forEach(item => {
        if(item.selected){
          o.num += parseInt(item.count)
          o.sum += parseInt(item.count) * parseInt(item.price)
        }
      })
      console.log(o);
      
      return o
    }
  }
})

// 导入vue-resource模块
import VueResource from 'vue-resource'
Vue.use(VueResource)

import VuePreview from 'vue-preview';
Vue.use(VuePreview);


Vue.http.options.root = 'http://www.liulongbin.top:3005'
Vue.http.options.emulateJSON = true;


// 1 导入路由包
import VueRouter from 'vue-router'
// 2 挂载路由模块
Vue.use(VueRouter)
// 3 导入路由对象
import router from './router.js'


import momemt from 'moment'
Vue.filter('dateFormat', function (dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
  return momemt(dataStr).format(pattern)
})


// 导入mui模块
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'


// 按需导入mint-ul组件
// import {
//   Header,
//   Swipe,
//   SwipeItem,
//   Button,
//   Lazyload 
// } from 'mint-ui'
// Vue.component(Header.name, Header)
// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);
// Vue.component(Button.name, Button);
// Vue.use(Lazyload);

import MintUI from 'mint-ui'
Vue.use(MintUI)
import 'mint-ui/lib/style.css'





//导入 App.vue组件
import app from './App.vue'

var vm = new Vue({
  el: '#app',
  render: c => c(app),
  router,
  store,
  created() {
    this.$store.commit('newNum')
  }
})