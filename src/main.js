import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

export const MyMusicBus = new Vue();
export const PlaylistBus = new Vue();
export const MyMusicViewBus = new Vue();
export const PlaylistViewBus = new Vue();
export const VisualizerBus = new Vue();

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
