import Vue from 'vue'
import Vuex from 'vuex'
import fs from 'fs'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    MainData: [],
  },

  mutations: {
    AddNewSongs: (state, payload) => { 
      
      //Identifies if the added song is already present.. if not adds it to list..
      for(var i=0; i<payload.length; ++i) {
        var Present = false;
        state.MainData.AllSongs.forEach(Song => {
          if((Song.Title == payload[i].Title) || (Song.Source == payload[i].Source)) {
            Present = true;
          }
        })

        if(!Present) {
          payload[i].Id = state.MainData.AllSongs.length + 1;
          state.MainData.AllSongs.push(payload[i]);
        }
      }
    },

    UpdateChanges: function() {
      let buffer = JSON.stringify(this.state.MainData);
      
      fs.writeFile('src/Songs.json', buffer, (err) => {
        if(err) {
          throw err;
        }
      });
    },
  },
  
  actions: {
    async LoadData() {
      fs.readFile('src/Songs.json', (err, data) => {
        if(err) {
          throw err;
        } else {
          this.state.MainData = JSON.parse(data);
        }
      })
    },

    UpdateChanges: function(context) {
      context.commit('UpdateChanges');
    },

    AddNewSongs: function(context, payload) {
      context.commit('AddNewSongs', payload);
      context.dispatch('UpdateChanges');
    }
  },
  
  modules: {
    
  },
})