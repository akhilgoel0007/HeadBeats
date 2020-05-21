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
    <v-card-title class="text-center ml-6 Py-6" >
      <h1 class="font-weight-bold display-1 white--text"> Playlists </h1>
      <v-spacer></v-spacer>
      <v-text-field hide-details prepend-icon="mdi-magnify" single-line v-model="search" placeholder="Search Songs"></v-text-field>
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
          <!-- <div v-if="Tab"> -->
            <div v-for="Song in FilteredSongs(Playlist.ContentOfPlaylist)" :key="Song.Title">
              <CardView :CurrentSong="Song" :Place="Playlist.Name" :IsPlaying="GetPlayingStatus(Song, Playlist.Name)"></CardView>
            </div>
          <!-- </div>
          <div v-if="!Tab">
            <div v-for="Song in Playlist.ContentOfPlaylist" :key="Song.Title">
              <CardView :CurrentSong="Song" :Place="Playlist.Name" :IsPlaying="GetPlayingStatus(Song, Playlist.Name)"></CardView>
            </div> -->
          <!-- </div> -->
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
    search: "",
    CurrentPlaylist: ""
  }),

  methods: {
    GetPlayingStatus: function(Song, PlaylistName) {
      if(this.$store.state.PlayingSong != null && this.$store.state.PlayingWindow != null) {
        if(this.$store.state.PlayingSong.Title === Song.Title && this.$store.state.PlayingWindow === PlaylistName) {
          return true
        } else {
          return false
        }
      }
    }
  },
  computed: {
    AllPlaylists() {
      return this.$store.state.MainData.AllPlaylists;
    },

    FilteredSongs: function() {
      return PlaylistSongs => {
        if(PlaylistSongs) {
          return PlaylistSongs.filter((Song) => {
            return Song.Title.match(this.search)
          })
        } else {
          return null
        }
      }
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
