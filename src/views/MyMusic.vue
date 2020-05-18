<template>
    <v-card class="mx-auto mt-5" max-width="1400" elevation="6">
        <v-toolbar flat>
            <v-toolbar-title class="grey--text">All Songs</v-toolbar-title>
            <v-spacer></v-spacer>
        
            <!-- <v-btn icon>
                <v-icon>mdi-magnify</v-icon>
            </v-btn>

            <v-btn icon>
                <v-icon>mdi-apps</v-icon>
            </v-btn>

            <v-btn icon>
                <v-icon>mdi-dots-vertical</v-icon>
            </v-btn> -->
        </v-toolbar>

        <v-divider></v-divider>

        <v-card-text style="height: 500px; overflow-y: auto">
            <div v-for="Song in AllSongs" :key="Song.Title">
                <CardView :CurrentSong="Song" Place="AllSongs"></CardView>
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
        //
    }),

    computed: {
        AllSongs: function() {
            return this.$store.state.MainData.AllSongs;
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