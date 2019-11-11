// 入口文件


// 导入vue模块
import Vue from 'vue'

// 导入vue-resource模块
import VueResource from 'vue-resource'
Vue.use(VueResource)


// 1 导入路由包
import VueRouter from 'vue-router'
// 2 挂载路由模块
Vue.use(VueRouter)
// 3 导入路由对象
import router from './router.js'


// 导入mui模块
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'


// 按需导入mint-ul组件
import { Header,Swipe, SwipeItem } from 'mint-ui'
Vue.component(Header.name,Header)
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);

//导入 App.vue组件
import app from './App.vue'

var vm = new Vue({
  el:'#app',
  render: c => c(app),
  router
})