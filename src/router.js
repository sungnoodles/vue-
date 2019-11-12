import VueRouter from 'vue-router'

// 导入 Account 组件
import home from './components/footbar/home.vue'
import search from './components/footbar/search.vue'
import member from './components/footbar/member.vue'
import shoppingcar from './components/footbar/shoppingcar.vue'
import newsList from './components/news/newsList.vue'
import newInfo from './components/news/newInfo.vue'
import photoList from './components/photos/photoList.vue'


// 3. 创建路由对象
var router = new VueRouter({
  routes: [{
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: home
    },
    {
      path: '/search',
      component: search
    },
    {
      path: '/member',
      component: member
    },
    {
      path: '/shoppingcar',
      component: shoppingcar
    },
    {
      path: '/home/newsList',
      component: newsList
    },
    {
      path: '/home/newInfo/:id',
      component: newInfo
    },
    {
      path:'/home/photoList',
      component: photoList
    }

  ],
  linkActiveClass: 'mui-active' //覆盖router-link默认的类router-link-active
})

// 把路由对象暴露出去
export default router