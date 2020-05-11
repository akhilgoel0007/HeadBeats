<template>
  <v-card class="mx-auto mt-5" max-width="1400" elevation="6" color="purple">
    <!-- <v-toolbar>
    <v-toolbar-title class="grey--text">Playlists</v-toolbar-title>
      <v-spacer></v-spacer>
        
            <v-btn icon>
                <v-icon>mdi-magnify</v-icon>
            </v-btn>

            <v-btn icon>
                <v-icon>mdi-apps</v-icon>
            </v-btn>

            <v-btn icon>
                <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
    </v-toolbar>-->
    <v-card-title class="text-center justify-center Py-6" >
      <h1 class="font-weight-bold display-1 white--text"> Playlists </h1>
    </v-card-title>
    <!-- <v-divider></v-divider> -->
    <v-tabs  background-color="purple" dark show-arrows center-active centered
      v-model="Tab"
      next-icon="mdi-chevron-right"
      prev-icon="mdi-chevron-left"
    >   
      <v-tabs-slider color="yellow"></v-tabs-slider>
      <v-tab v-for="Playlist in AllPlaylists" :key="Playlist.Name" :href="'#' + Playlist.Name">
        {{ Playlist.Name }}
      </v-tab>
    </v-tabs>
    <v-card flat style="overflow-y: auto; height:430px" max-width="1400">
      <v-tabs-items v-model="Tab">
        <v-tab-item  v-for="Playlist in AllPlaylists" :key="Playlist.Name" :value="Playlist.Name">
          <v-hover 
            v-slot:default="{ hover }" 
            v-for="Song in Playlist.ContentOfPlaylist" 
            :key="Song.Title" 
            class="AdditionalAttributes"
          >
            <v-card 
              class="mt-4" 
              color="grey lighten-4" max-width="300"
            >
              <!-- Image source file path in below src tag -->
              <v-img :aspect-ratio="16/10" src="https://cdn.vuetifyjs.com/images/cards/kitchen.png">
                <v-expand-transition>
                  <div v-if="hover"
                    class="d-flex transition-fast-in-fast-out orange darken-2 v-card--reveal display-3 white--text"
                    style="height: 100%;"
                  >
                    <v-icon style="font-size: 100px" class="white--text">mdi-play</v-icon>
                  </div>
                </v-expand-transition>
              </v-img>
              <v-card-text class="pt-3" style="position: relative;">
                <v-menu transition="slide-y-transition">
                  <template v-slot:activator="{ on: menu }">
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on: tooltip}">
                        <v-btn absolute color="orange" class="white--text" fab large right top v-on="{...tooltip, ...menu}"> 
                          <v-icon>mdi-view-grid-plus</v-icon>
                        </v-btn>
                      </template>
                      <span>Additional Options</span>
                    </v-tooltip>
                  </template>
                  <v-list>
                    <v-list-item>
                      <v-list-item-title @click.stop="dialog = true">Add Tag</v-list-item-title>
                      <v-dialog v-model="dialog" max-width="290">
                        <v-card>
                          <v-card-title class="headline">Add Tags</v-card-title>
                          <v-card-text>
                         </v-card-text>
                          <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn color="green darken-1" text @click="dialog = false">Save Changes</v-btn>
                          <v-btn color="green darken-1" text @click="dialog = false">Close</v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-title>Add To Playlist</v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-title>Misc Option 1</v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-title>Misc Option 2</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
                <!-- <v-fab-transition>
                  <v-btn absolute color="orange" class="white--text" fab large right top>
                    <v-icon>mdi-view-grid-plus</v-icon>
                  </v-btn>
                </v-fab-transition> -->

                <h3 class="Title-Font font-weight-light orange--text mb-2">{{Song.Title}}</h3>
                <div class="Info-Font font-weight-light">
                  Duration: {{Song.Duration}}<br>
                  Author: {{Song.Author}}<br>
                  <!-- Genre<br>
                  Album<br>
                  so..on<br> -->
                </div>
              </v-card-text>
            </v-card>
          </v-hover>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </v-card>
</template>

<script>

const BaseUrl = 'http://localhost:8080/data/Songs.json'

import axios from 'axios';

export default {
  name: 'Playlists',
  data: () => ({
    dialog: false,
    Tab: true, 
    AllPlaylists: [],
  }),

  async created() {
    try {
      const res = await axios.get(BaseUrl);
      this.AllPlaylists = res.data.AllPlaylists;
      console.log(this.AllPlaylists);
    } catch(e) {
      console.log(e);
    }
  },

  methods: {
    AddPlayList: () => {
      //
    },
  }
}

</script>

<style scoped>

.AdditionalAttributes {
  float: left;
  margin: 22.1px;
  width: 300px;
}

.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: .5;
  position: absolute;
  width: 100%;
}

</style>
