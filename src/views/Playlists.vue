<template>
  <v-card class="mx-auto mt-5" max-width="1400" elevation="6" color="purple">
    <v-toolbar class="purple" height="85">
      <v-toolbar-title class="font-weight-bold display-1 white--text">Playlists</v-toolbar-title>
      <v-spacer></v-spacer>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn icon @click="SortBy('Title')" v-on="on">
              <v-icon>mdi-alpha-t-box-outline</v-icon>
            </v-btn>
          </template>
          <span>Sort By Title</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn icon @click="SortBy('Author')" v-on="on">
              <v-icon>mdi-account-details-outline</v-icon>
            </v-btn>
          </template>
          <span>Sort By Author</span>
        </v-tooltip>
      <v-text-field prepend-icon="mdi-magnify" hide-details v-model="search" :label="SearchLabel" placeholder="Search Songs"></v-text-field>
    </v-toolbar>
    <v-tabs  background-color="purple" dark show-arrows center-active centered v-model="Tab" next-icon="mdi-chevron-right" prev-icon="mdi-chevron-left">   
      <v-tabs-slider color="yellow"></v-tabs-slider>
      <v-tab v-for="Playlist in AllPlaylists" :key="Playlist.Name" :href="'#' + Playlist.Name">
        {{ Playlist.Name }}
      </v-tab>
    </v-tabs>
    <v-card flat style="overflow-y: auto; height:430px" max-width="1400">
      <v-tabs-items v-model="Tab">
        <v-tab-item  v-for="Playlist in AllPlaylists" :key="Playlist.Name" :value="Playlist.Name">
          <div v-for="Song in FilteredSongs(Playlist.ContentOfPlaylist)" :key="Song.Title">
            <CardView :CurrentSong="Song" :Place="Playlist.Name" :IsPlaying="GetPlayingStatus(Song, Playlist.Name)"></CardView>
          </div>
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
    CurrentPlaylist: "",
    SearchLabel: 'Song Title',
    Labels: [
      'Song Tags',
      'Song Author',
      'Song Title'
    ]
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
    },

    SortBy(Prop) {
      this.$store.state.MainData.AllPlaylists.forEach((Playlist) => {
        Playlist.ContentOfPlaylist.sort((a, b) => a[Prop] < b[Prop] ? -1 : 1)
      })
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
            return (Song.Title).toLowerCase().match(this.search.toLowerCase())
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
