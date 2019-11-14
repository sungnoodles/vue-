// 入口文件


// 导入vue模块
import Vue from 'vue'

import './app.less'

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
  router
})