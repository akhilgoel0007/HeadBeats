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
          state.MainData.AllSongs.push(payload[i]);
        }
      }
    },

    UpdateLocalChanges: function() {
      let buffer = JSON.stringify(this.state.MainData);
      
      fs.writeFile('src/Songs.json', buffer, (err) => {
        if(err) {
          throw err;
        } else {
          console.log("Saved Data..");
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

    AddNewSongs: function(context, payload) {
      context.commit('AddNewSongs', payload);
      context.commit('UpdateLocalChanges');
    }
  },
  
  modules: {
    
  },
})