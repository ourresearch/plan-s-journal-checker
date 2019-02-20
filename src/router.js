import Vue from 'vue'
import Router from 'vue-router'
import Meta from 'vue-meta'

import Journal from './views/Journal'
import Wizard from './views/Wizard'
import Home from './views/Home'


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
      component: Home
    },

    {
      path: '/wizard',
      component: Wizard
    },

    {
      path: '/journal/:id',
      component: Journal
    }

  ]
})
