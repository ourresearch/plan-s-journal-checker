import Vue from 'vue'
import Router from 'vue-router'
import Meta from 'vue-meta'

import Journal from './views/Journal'
import Search from './views/Search'


Vue.use(Router)
Vue.use(Meta)




export default new Router({
  mode: "history",
    scrollBehavior (to, from, savedPosition) {
  if (savedPosition) {
    return savedPosition
  } else {
    return { x: 0, y: 0 }
  }
},
  routes: [
    {
      path: '/',
      redirect: "/search"
    },

    {
      path: '/search',
      component: Search
    },


    {
      path: '/journal/:id',
      component: Journal
    }

  ]
})
