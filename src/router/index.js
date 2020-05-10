import Vue from 'vue'
import VueRouter from 'vue-router'
import MyMusic from '../views/MyMusic.vue'
import Playlists from '../views/Playlists.vue'
import TestOption from '../views/TestOption.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/MyMusic',
    name: 'MyMusic',
    component: MyMusic
  },
  {
    path: '/Playlists',
    name: 'Playlists',
    component: Playlists
  },
  {
    path: '/TestOption',
    name: 'TestOption',
    component: TestOption
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
