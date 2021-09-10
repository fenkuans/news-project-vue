import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/Index'
import login from '@/components/Login'
import register from '@/components/Register'
import hello from '@/components/HelloWorld'
import item from '@/components/NewsItem'
import manage from '@/components/NewsManage'
import newsCreate from '@/components/NewsCreate'
import newsRedact from '@/components/NewsRedact'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/index',
      name: 'index',
      component: index
    },
    {
      path: '/login',
      component: login
    },
    {
      path: '/register',
      component: register
    },
    {
      path: '/hello',
      component: hello
    },
    {
      path: '/news_item',
      component: item
    },
    {
      path: '/news_manage',
      component: manage
    },
    {
      path: '/news_create',
      component: newsCreate
    },
    {
      path: '/news_redact',
      component: newsRedact
    }
  ]
})
