import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

const BaseUrl = 'http://localhost:8080/data/Songs.json'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    AllPlaylists: [],
    AllSongs: []
  },

  mutations: {
    
  },
  
  actions: {
    async LoadData() {
      try {
        const res = await axios.get(BaseUrl);
        this.state.AllPlaylists = res.data.AllPlaylists;
        this.state.AllSongs = res.data.AllSongs;
      } catch(e) {
        console.log(e);
      }
    },
  },
  
  modules: {
  },
})


