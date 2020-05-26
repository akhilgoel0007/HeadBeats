import Vue from 'vue'
import VueRouter from 'vue-router'
import AnimationScreen from '../views/AnimationScreen.vue'
import MyMusic from '../views/MyMusic.vue'
import Playlists from '../views/Playlists.vue'
import TestOption from '../views/TestOption.vue'
import HelpMenu from '../views/HelpMenu.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'AnimationScreen',
    component: AnimationScreen
  },
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
  },
  {
    path: '/HelpMenu',
    name: 'HelpMenu',
    component: HelpMenu,
  },  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
