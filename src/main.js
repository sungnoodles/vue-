// 入口文件


// 导入vue模块
import Vue from 'vue'

// 导入mui模块
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icon-extra.css'


// 按需导入mint-ul组件
import { Header } from 'mint-ui'
Vue.component(Header.name,Header)

//导入 App.vue组件
import app from './App.vue'

var vm = new Vue({
  el:'#app',
  render: c => c(app)
})