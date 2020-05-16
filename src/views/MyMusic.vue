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
            <v-hover 
                v-slot:default="{ hover }" 
                v-for="Song in AllSongs" 
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
                                    <v-dialog v-model="dialog" max-width="800px" class="Card-Config">
                                        <v-card>
                                            <v-card-title class="headline">Add Tags</v-card-title>
                                            <v-card-text>
                                                <v-combobox v-model="chips" chips multiple label="Song Tags">
                                                    <template v-slot:selection="data">
                                                        <v-chip @click="select" close @click:close="remove(data.item)">
                                                            <v-avatar left class="accent white--text" v-text="data.item.slice(0, 1).toUpperCase()"></v-avatar>
                                                            {{ data.item }}
                                                        </v-chip>
                                                    </template>
                                                </v-combobox>
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
        </v-card-text>
    </v-card>
</template>


<script>

export default {
    name: 'MyMusic',
    
    data: () => ({
        dialog: false,
        Tab: true, 
        chips: [],
    }),

    computed: {
        AllSongs() {
            return this.$store.state.AllSongs;
        }
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

.Card-Config {
  padding: 10px;
}

</style>