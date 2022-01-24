import Vue from 'vue'
import VueRouter from 'vue-router'
import Material from '../views/material/Material.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/Material'
  },
  {
    path: '/Material',
    name: 'Material',
    component: Material
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
