<template>
    <v-card class="mx-auto mt-5" max-width="1400" elevation="6">
        <v-toolbar flat>
            <v-toolbar-title class="grey--text">All Songs</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-text-field hide-details prepend-icon="mdi-magnify" single-line v-model="search" placeholder="Search Songs"></v-text-field>
        </v-toolbar>

        <v-divider></v-divider>

        <v-card-text style="height: 500px; overflow-y: auto">
            <div v-for="Song in FilteredSongs" :key="Song.Title">
                <CardView :CurrentSong="Song" Place="AllSongs" :IsPlaying="GetPlayingStatus(Song)"></CardView>
            </div>
        </v-card-text>
    </v-card>
</template>


<script>
import CardView from '../components/CardView';

export default {
    name: 'MyMusic',
    components: { CardView },

    data: () => ({
        search: "",
    }),

    methods: {
        GetPlayingStatus: function(Song) {
            if(this.$store.state.PlayingSong != null && this.$store.state.PlayingWindow != null) {
                if(this.$store.state.PlayingSong.Title === Song.Title && this.$store.state.PlayingWindow === "AllSongs") {
                    return true
                } else {
                    return false
                }
            }
        },
    },

    computed: {
        AllSongs: function() {
            return this.$store.getters.GetAllSongs
        },

        FilteredSongs: function() {
            var Songs = this.$store.getters.GetAllSongs
            if(Songs) {
                return Songs.filter((Song) => {
                    return Song.Title.match(this.search)
                })
            } else {
                return null
            }
        },

        AllPlaylists: function() {
            return this.$store.state.MainData.AllPlaylists;
        },
    }
}
</script>

<style scoped>

.AdditionalAttributes {
  float: left;
  margin: 18.9px;
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

.Icon-Color {
    color: rgb(45, 0, 129);    
}

.Song-Title {
    height: 30px;
    font-size: 22px;
    font-weight: 100;
    color: orange; 
    font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    overflow-x: auto;
}

.Card-Config {
  padding: 10px;
}

.List-Items {
    font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif /*Use this as universal font.*/ 
}

.List-Items:hover {
    background-color: rgb(223, 223, 223);
}

</style>