<template>
    <v-hover v-slot:default="{ hover }" class="AdditionalAttributes">
        <v-card class="mt-4" color="grey lighten-4" max-width="300">
            <v-img :aspect-ratio="16/10" :src="CurrentSong.ImageSrc">
                <v-expand-transition>
                    <button v-if="hover" v-on:click="PlaySong(CurrentSong)" class="d-flex transition-fast-in-fast-out orange darken-2 v-card--reveal display-3 white--text" style="height: 100%;">
                        <v-icon v-if="Playing" style="font-size: 100px" class="white--text">mdi-pause</v-icon>
                        <v-icon v-else-if="!Playing" style="font-size: 100px" class="white--text">mdi-play</v-icon>
                    </button>
                </v-expand-transition>
            </v-img>
            <v-card-text class="pt-3" style="position: relative;">
                <v-menu transition="slide-y-transition">
                    <template v-slot:activator="{ on: menu }">
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on: tooltip}">
                                <v-btn style="background-color: transparent;" absolute class="white--text" fab large top right v-on="{...tooltip, ...menu}"> 
                                    <v-icon style="color: rgb(45, 0, 129);">mdi-view-grid-plus</v-icon>
                                </v-btn>
                            </template>
                            <span>Additional Options</span>
                        </v-tooltip>
                    </template>
                    <v-list style="cursor: pointer">
                        <v-list-item class="List-Items" @click.stop="TagDialog = true">
                            <v-list-item-title>Add Tag</v-list-item-title>
                            <v-dialog v-model="TagDialog" max-width="800px" class="Card-Config">
                                <v-card>
                                    <v-card-title class="headline">Add Tags</v-card-title>
                                    <v-card-text>
                                        <v-combobox v-model="CurrentSong.Tags" chips multiple label="Song Tags">
                                            <template v-slot:selection="data">
                                                <v-chip close @click:close="Remove(data.item)">
                                                    <v-avatar left class="accent white--text" v-text="data.item.slice(0, 1).toUpperCase()"></v-avatar>
                                                    {{ data.item }}
                                                </v-chip>
                                            </template>
                                        </v-combobox>
                                    </v-card-text>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn color="green darken-1" text @click="Output()">Save Changes</v-btn>
                                        <v-btn color="green darken-1" text @click="TagDialog = false">Close</v-btn>
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
                                            <br><br>
                                            <v-btn color="green darken-1" text @click="GetPlaylists()"> Save </v-btn>
                                            <v-btn color="green darken-1" text @click="PlaylistDialog = false"> Close </v-btn>
                                        </v-container>
                                    </v-card-actions>
                                </v-card>
                             </v-dialog>
                        </v-list-item>
                        <v-list-item class="List-Items">
                            <v-list-item-title>Add Lyrics</v-list-item-title>
                        </v-list-item>
                        <v-list-item class="List-Items" @click.stop="SongNameDialog = true">
                            <v-list-item-title>Edit Song Name</v-list-item-title>
                            <v-dialog v-model="SongNameDialog" max-width="600">
                                <v-card>
                                    <v-card-title class="headline">Name Of The Song</v-card-title>
                                    <v-card-text>
                                        <v-text-field v-model="SongName" v-on:keyup.enter="SongNameEnter()"></v-text-field>
                                    </v-card-text>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn color="green darken-1" text @click="GetSongName()"> Save </v-btn>
                                        <v-btn color="green darken-1" text @click="SongNameDialog = false"> Close </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                        </v-list-item>
                        <v-list-item class="List-Items" @click.stop="AuthorNameDialog = true">
                            <v-list-item-title>Edit Author Name</v-list-item-title>
                            <v-dialog v-model="AuthorNameDialog" max-width="600">
                                <v-card>
                                    <v-card-title class="headline">Name Of The Author</v-card-title>
                                    <v-card-text>
                                        <v-text-field v-model="AuthorName" v-on:keyup.enter="AuthorNameEnter()"></v-text-field>
                                    </v-card-text>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn color="green darken-1" text @click="GetAuthorName()"> Save </v-btn>
                                        <v-btn color="green darken-1" text @click="AuthorNameDialog = false"> Close </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                        </v-list-item>
                    </v-list>
                </v-menu>
                <div class=" Song-Title"> {{CurrentSong.Title}} </div>
                <div class="Info-Font font-weight-light">
                    Duration: {{CurrentSong.DisplayDuration}}<br>
                    Author: {{AuthorName}}<br>
                    <!-- Genre<br>
                    Album<br>
                    so..on<br> -->
                </div>
            </v-card-text>
        </v-card>
    </v-hover>
</template>

<script>

import { MyMusicBus, PlaylistBus } from '../main'

export default {
    props: ['CurrentSong', 'Place', 'IsPlaying'],

    data: function() {
        return {
            TagDialog: false,
            PlaylistDialog: false,
            AuthorNameDialog: false,
            SongNameDialog: false,
            Loaded: false,
            Playing: this.IsPlaying,
            SongName: this.CurrentSong.Title,
            AuthorName: this.CurrentSong.Author,
            selected: [],
            chips: [],
        }
    },

    methods: {
        Output: function() {
            this.TagDialog = false;
            this.$store.dispatch('UpdateChanges');
        },

        Remove: function(item) {
            this.$store.state.MainData.AllSongs.Tags.splice(this.$store.state.MainData.AllSongs.Tags.indexOf(item), 1)
            this.$store.state.MainData.AllSongs.Tags = [...this.$store.state.MainData.AllSongs.Tags]
        },

        GetAuthorName: function() {
            this.AuthorNameDialog = false

            var Payload = {
                AuthorName: this.AuthorName,
                Source: this.CurrentSong.Source
            }
            
            this.$store.dispatch('ChangeAuthorName', Payload);
            // this.NewAuthorName = ""
        },

        GetSongName: function() {
            this.SongNameDialog = false

            var Payload = {
                SongName: this.SongName,
                Source: this.CurrentSong.Source
            }

            this.$store.dispatch('ChangeSongName', Payload);
            // this.NewSongName = ""
        },

        GetPlaylists: function() {
            this.PlaylistDialog = false
            
            var Payload = {
                Id: this.CurrentSong.Id,
                Playlists: this.selected
            }

            this.$store.dispatch('AddToPlaylist', Payload)
        },

        AuthorNameEnter: function() {
            this.GetAuthorName()
        },

        SongNameEnter: function() {
            this.GetSongName()
        },

        CommitChanges: function(Song, Window) {
            var Payload = {
                PlayingSong: Song,
                PlayingWindow: Window
            }

            this.$store.commit('ChangeData', Payload)
        },

        PlaySong: function(PlayingSong) {
            if(this.Place === "AllSongs") { 
                // AllMusic Window
                
                if(!this.Playing) {
                    if(!this.Loaded) {
                        MyMusicBus.$emit('LoadSong', PlayingSong)
                        MyMusicBus.$emit('SetSongList', "AllSongs" , this.$store.state.MainData.AllSongs);

                        this.CommitChanges(this.CurrentSong, this.Place)
                        
                        this.Playing = true
                        this.Loaded = true
                    } else {
                        MyMusicBus.$emit('PlaySong')
                        this.Playing = true
                    }
                } else {
                    MyMusicBus.$emit('PauseSong')
                    this.Playing = false
                }
            } else {
                // Playlist Window

                if(!this.Playing) { 
                    if(!this.Loaded) {
                        PlaylistBus.$emit('LoadSong', PlayingSong)
                        this.$store.state.MainData.AllPlaylists.forEach(Playlist => {
                            if(Playlist.Name === this.Place) {
                                PlaylistBus.$emit('SetSongList', Playlist.Name, Playlist.ContentOfPlaylist)
                            }
                        });

                        this.CommitChanges(this.CurrentSong, this.Place)
                        
                        this.Playing = true
                        this.Loaded = true
                    } else {
                        PlaylistBus.$emit('PlaySong')
                        this.Playing = true
                    }
                } else {
                    PlaylistBus.$emit('PauseSong')
                    this.Playing = false
                }
            }
        },

        ToggleSongState: function(Status) {
            if(Status) {
                this.Playing = !this.Playing
            } else {
                this.Playing = false; // Stop the Last Song
                this.Loaded = false;
            }
        },
    },

    computed: {
        AllPlaylists: function() {
            return this.$store.state.MainData.AllPlaylists;
        },
    },

    created() {
        MyMusicBus.$on('ToggleCurrentSong', (SongName, Status) => {
            if(this.CurrentSong.Title == SongName) {
                this.ToggleSongState(Status)
            }
        })

        MyMusicBus.$on('NextSong', (LastSong, CurrentSong) => {
            if(this.CurrentSong.Title === CurrentSong) {
                this.Playing = !this.Playing;
                this.Loaded = true // Loaded this song in the player..
                this.CommitChanges(this.CurrentSong, this.Place)
            }

            if(this.CurrentSong.Title === LastSong) {
                this.Playing = !this.Playing;
                this.Loaded = false // Removed this song from player..
            }
        })

        PlaylistBus.$on('ToggleCurrentSong', (PlaylistName, SongName, Status) => {
            if(PlaylistName === this.Place) {
                if(this.CurrentSong.Title === SongName) {
                    this.ToggleSongState(Status)
                }
            }
        })

        PlaylistBus.$on('NextSong', (PlaylistName, LastSong, CurrentSong) => {
            if(PlaylistName === this.Place) {
                if(this.CurrentSong.Title === CurrentSong) {
                    this.Playing = !this.Playing;
                    this.Loaded = true // Loaded this song in the player..
                    this.CommitChanges(this.CurrentSong, this.Place)
                }

                if(this.CurrentSong.Title === LastSong) {
                    this.Playing = !this.Playing;
                    this.Loaded = false // Removed this song from player..
                }
            }
        })
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