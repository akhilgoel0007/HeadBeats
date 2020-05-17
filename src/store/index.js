import Vue from 'vue'
import Vuex from 'vuex'
// import axios from 'axios'
// import express from 'express'
import fs from 'fs'

// const BaseUrl = 'http://localhost:8080/data/Songs.json'

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
          // console.log("Working");
          state.MainData.AllSongs.push(payload[i]);
        } else {
          // console.log("Duplicate Found..");
          // console.log(state.AllSongs);
        }
      }
    }
  },
  
  actions: {
    LoadData() {
      fs.readFile('public/data/Songs.json', (err, data) => {  
        if(err) {
          throw err;
        } else {
          var Data = JSON.parse(data);
          this.state.MainData = Data;
        }
      });
    },

    UpdateChanges: async function() {
      let buffer = JSON.stringify(this.state.MainData);
      fs.writeFile('public/data/Songs.json', buffer, (err) => {
        if(err) {
          throw err;
        } else {
          console.log("Saved Data..");
        }
      });
    },

    AddNewSongs: function(context, payload){
      context.commit('AddNewSongs', payload);
      this.dispatch('UpdateChanges');
    }
  },
  
  modules: {
  },
})