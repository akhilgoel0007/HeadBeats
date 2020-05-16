import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

const BaseUrl = 'http://localhost:8080/data/Songs.json'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    AllPlaylists: [],
    AllSongs: [],
  },

  mutations: {
    AddNewSongs: (state, payload) => { //Identifies if the added song is already present.. if not adds it to list..
      for(var i=0; i<payload.length; ++i) {
        var Present = false;
        state.AllSongs.forEach(Song => {
          if((Song.Title == payload[i].Title) || (Song.Source == payload[i].Source)) {
            Present = true;
          }
        })

        if(!Present) {
          // console.log("Working");
          state.AllSongs.push(payload[i]);
        } else {
          // console.log("Duplicate Found..");
          // console.log(state.AllSongs);
        }
      }
      // console.log(state.AllSongs);
    }
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

    AddNewSongs: (context, AllSongs) => {
      context.commit('AddNewSongs', AllSongs);
    }
  },
  
  modules: {
  },
})