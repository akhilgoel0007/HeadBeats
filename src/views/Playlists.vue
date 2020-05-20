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
    <v-tabs  background-color="purple" dark show-arrows center-active centered v-model="Tab" next-icon="mdi-chevron-right" prev-icon="mdi-chevron-left">   
      <v-tabs-slider color="yellow"></v-tabs-slider>
      <v-tab v-for="Playlist in AllPlaylists" :key="Playlist.Name" :href="'#' + Playlist.Name">
        {{ Playlist.Name }}
      </v-tab>
    </v-tabs>
    <v-card flat style="overflow-y: auto; height:430px" max-width="1400">
      <v-tabs-items v-model="Tab">
        <v-tab-item  v-for="Playlist in AllPlaylists" :key="Playlist.Name" :value="Playlist.Name">
          <div v-for="Song in Playlist.ContentOfPlaylist" :key="Song.Title">
            <CardView :CurrentSong="Song" :Place="Playlist.Name"></CardView>
          </div>
          <!-- <v-hover v-slot:default="{ hover }" v-for="Song in Playlist.ContentOfPlaylist" :key="Song.Title" class="AdditionalAttributes">
            <v-card class="mt-4" color="grey lighten-4" max-width="300">
              Image source file path in below src tag
              <v-img :aspect-ratio="16/10" src="https://cdn.vuetifyjs.com/images/cards/kitchen.png">
                <v-expand-transition>
                  <div v-if="hover" class="d-flex transition-fast-in-fast-out orange darken-2 v-card--reveal display-3 white--text" style="height: 100%;">
                    <v-icon style="font-size: 100px" class="white--text">mdi-play</v-icon>
                  </div>
                </v-expand-transition>
              </v-img>
              <v-card-text class="pt-3" style="position: relative;">
                <v-menu transition="slide-y-transition">
                  <template v-slot:activator="{ on: menu }">
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on: tooltip}">
                        <v-btn style="background-color: transparent;" absolute class="white--text" fab large right top v-on="{...tooltip, ...menu}"> 
                          <v-icon style="color: rgb(45, 0, 129);">mdi-view-grid-plus</v-icon>
                        </v-btn>
                      </template>
                      <span>Additional Options</span>
                    </v-tooltip>
                  </template>
                  <v-list style="cursor: pointer">
                    <v-list-item class="List-Items" @click.stop="TagDialog = true">
                      <v-list-item-title >Add Tag</v-list-item-title>
                      <v-dialog v-model="TagDialog" max-width="800px" class="Card-Config">
                        <v-card>
                          <v-card-title class="headline">Add Tags</v-card-title>
                          <v-card-text>
                          <v-combobox v-model="chips" chips multiple label="Song Tags">
                            <template v-slot:selection="data">
                              <v-chip close @click:close="remove(data.item)">
                                <v-avatar left class="accent white--text" v-text="data.item.slice(0, 1).toUpperCase()"></v-avatar>
                                {{ data.item }}
                              </v-chip>
                            </template>
                          </v-combobox>
                          </v-card-text>
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="green darken-1" text @click="Output()">Save Changes</v-btn>
                            <v-btn color="green darken-1" text @click="dialog = false">Close</v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </v-list-item>
                    <v-list-item class="List-Items" @click.stop="PlaylistDialog = true">
                      <v-list-item-title>Add To Playlist</v-list-item-title>
                      <v-dialog v-model="PlaylistDialog" max-width="290">
                        <v-card>
                          <v-card-title class="headline">Playlists</v-card-title>
                          <v-card-actions>
                            <v-container fluid>
                              <div v-for="SongPlaylist in AllPlaylists" :key="SongPlaylist.Name">
                                <v-checkbox v-model="selected" :label="SongPlaylist.Name" :value="SongPlaylist.Name" hide-details></v-checkbox>
                              </div>
                            </v-container>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </v-list-item>
                    <v-list-item class="List-Items">
                      <v-list-item-title>Add Lyrics</v-list-item-title>
                    </v-list-item>
                    <v-list-item class="List-Items">
                      <v-list-item-title>Edit Song Name</v-list-item-title>
                    </v-list-item>
                    <v-list-item class="List-Items">
                      <v-list-item-title>Edit Author Name</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
                <v-fab-transition>
                  <v-btn absolute color="orange" class="white--text" fab large right top>
                    <v-icon>mdi-view-grid-plus</v-icon>
                  </v-btn>
                </v-fab-transition>

                <div class=" Song-Title"> {{Song.Title}} </div>
                <div class="Info-Font font-weight-light">
                  Duration: {{Song.Duration}}<br>
                  Author: {{Song.Author}}<br>
                  Genre<br>
                  Album<br>
                  so..on<br>
                </div>
              </v-card-text>
            </v-card>
          </v-hover> -->
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </v-card>
</template>

<script>

import CardView from '../components/CardView';

export default {
  name: 'Playlists',
  components: { CardView },
  
  data: () => ({
    Tab: true,
  }),

  computed: {
    AllPlaylists() {
      return this.$store.state.MainData.AllPlaylists;
    }
  }
}

</script>

<style scoped>

.AdditionalAttributes {
  float: left;
  margin: 22.1px;
  width: 300px;
}

.Song-Title {
    height: 30px;
    font-size: 22px;
    font-weight: 100;
    color: orange; 
    font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    overflow-x: auto;
}

.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: .5;
  position: absolute;
  width: 100%;
}

.Card-Config {
  padding: 10px;
  /* overflow-y: auto; */
}

.List-Items {
  font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif /*Use this as universal font.*/ 
}
.List-Items:hover {
  background-color: rgb(223, 223, 223);
}
</style>
