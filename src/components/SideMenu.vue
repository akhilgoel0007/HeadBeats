<template>
    <v-navigation-drawer app class="ExtendedProperties" expand-on-hover right height="27.2%">
    <!--Change the height when adding new component-->
        <audio id="player">
            <source id="SongSource">
        </audio>
        <v-list app class='pt-0 pb-0'>
            <v-list-item-group>
                <v-list-item class="Add-Music-Color" @click="PickSongs()">
                    <v-list-item-icon class="Add-Music-Color">
                        <v-icon class="white--text font-weight-bold">mdi-music-note-plus</v-icon>
                    </v-list-item-icon >
                    <v-list-item-title class="white--text font-weight-bold Add-Music-Color">Add Music</v-list-item-title>
                </v-list-item>
                <v-list-item class="New-Playlist-Color" @click.stop="PlaylistDialog = true">
                    <v-list-item-icon class='New-Playlist-Color'>
                        <v-icon class="white--text font-weight-bold">mdi-playlist-plus</v-icon>
                    </v-list-item-icon >
                    <v-list-item-title class="white--text font-weight-bold New-Playlist-Color" >New Playlist</v-list-item-title>
                    <v-dialog v-model="PlaylistDialog" max-width="600">
                        <v-card>
                            <v-card-title class="headline">Name of the Playlist</v-card-title>
                            <v-card-text>
                                <v-text-field v-model="NewPlaylist" v-on:keyup.enter="PressedEnter()"></v-text-field>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="green darken-1" text @click="GetNewPlaylistName()"> Save </v-btn>
                                <v-btn color="green darken-1" text @click="PlaylistDialog = false"> Close </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-list-item>
                <v-list-item class="Settings-Color">
                    <v-list-item-icon class='Settings-Color'>
                        <v-icon class="white--text font-weight-bold">mdi-cogs</v-icon>
                    </v-list-item-icon >
                    <v-list-item-title class="white--text font-weight-bold Settings-Color">Settings</v-list-item-title>
                </v-list-item>
                <v-list-item class="Help-Color">
                    <v-list-item-icon class="Help-Color">
                        <v-icon class="white--text font-weight-bold">mdi-help-circle</v-icon>
                    </v-list-item-icon >
                    <v-list-item-title class="white--text font-weight-bold Help-Color" >Help</v-list-item-title>
                </v-list-item>
                <!-- <v-divider></v-divider> -->
            </v-list-item-group>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
    import { remote } from 'electron';
    import * as mm from 'music-metadata';
    import * as util from 'util';

    export default {
    
    data: () => ({
        PlaylistDialog: false,
        AllNewSongs: [],
        NewPlaylist: ""
    }),

    methods: {
        AddSongsToStore: function(GetNewSongs) {
            const { dialog } = remote;
            dialog.showOpenDialog({
                properties: ['openFile', 'multiSelections'],
                filters: [{
                    name: 'Select Songs',
                }]
            },async function(file) {
                if(file) {
                    var NewSongs = [];

                    for(let i=0; i<file.length; ++i) {
                        let Path = file[i];
                         
                        var NewSong = { 
                            'Source': Path,
                            'Tags': [],
                        }

                        await mm.parseFile(NewSong.Source)
                        .then( metadata => {
                            util.inspect(metadata, {showHidden:true, depth: null}); 
                            if(metadata.common.picture) {
                                NewSong.ImageSrc = `data:${metadata.common.picture[0].format}; base64,${metadata.common.picture[0].data.toString('base64')}`;
                            } else {
                                NewSong.ImageSrc = "";
                            }

                            NewSong.Title = metadata.common.title;
                        });

                        NewSongs.push(NewSong);
                    }

                    GetNewSongs(NewSongs);
                    
                    // const Source = document.getElementById('SongSource');
                    // var Path = file[0];

                    // console.log(file.length);

                    // Source.src = Path;

                    // const player = document.getElementById('player');

                    // mm.parseFile(Path)
                    // .then( metadata => {
                    //     util.inspect(metadata, {showHidden:true, depth: null});
                        
                    //     if(metadata.common.picture) {
                    //         var Image = document.getElementById("CoverImage")
                    //         Image.src = `data:${metadata.common.picture[0].format}; base64,${metadata.common.picture[0].data.toString('base64')}`;
                    //     }

                    //     var SongName = document.getElementById("SongName");
                    //     SongName.innerHTML = metadata.common.title;
                    // })
                    // .catch(err => {
                    //     console.log(err.message);
                    // });

                    // player.load();
                    // player.play();
                }
            })
        },

        PickSongs: function() {
            var AllNewSongs = this.$store;

            this.AddSongsToStore(function(AllSongs){
                AllNewSongs.dispatch('AddNewSongs', AllSongs)
            });
        },

        PressedEnter: function() {
            this.PlaylistDialog = false
            this.NewPlaylist = ""; // Important to reintialize NewPlaylist Variable...
        },

        GetNewPlaylistName: function() {
            this.PlaylistDialog = false;
            // console.log(this.NewPlaylist);
        },

        CreateNewPlaylist: function() {
            
        },

        OpenSettings: function() {
            //
        },

        OpenHelp: function() {
            //
        }
    }}

</script>

<style scoped>
    .ExtendedProperties {
        margin-top: 300px; 
        border-radius: 30px 0px 0px 30px;
    }
    .Add-Music-Color {
        background-color: #7986CBFF; 
    }

    .New-Playlist-Color {
        background-color: #9575CDFF;
    }
    
    .Settings-Color {
        background-color: #BA68C8FF; 
    }
    
    .Help-Color {
        background-color: #F06292FF; 
    }
    
    /* .AddColor {
        background-color: #7986CBFF; 
    } */
</style>