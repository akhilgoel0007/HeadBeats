<template>
    <v-navigation-drawer app class="ExtendedProperties" expand-on-hover right height="27.2%">
    <!--Change the height when adding new component-->
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
                    <v-dialog v-model="SamePlaylistError" max-width="460">
                        <v-card color="yellow" height="50" class="pt-1">
                            <v-icon class="ml-2 mr-2" color="white">mdi-alert-circle-outline</v-icon>
                            Cannot have two Playlist with same name.
                            <v-btn color="red" class="ml-4" text @click="SamePlaylistError = false">
                                Close
                            </v-btn>
                        </v-card>
                    </v-dialog>
                </v-list-item>
                <v-list-item class="Settings-Color" @click="SettingsTab = !SettingsTab;">
                    <v-list-item-icon class='Settings-Color'>
                        <v-icon class="white--text font-weight-bold">mdi-cogs</v-icon>
                    </v-list-item-icon >
                    <v-list-item-title class="white--text font-weight-bold Settings-Color">Settings</v-list-item-title>
                    <v-dialog v-model="SettingsTab" persistent max-width="800px">
                        <Settings v-on:Changed="ExitDialog($event)"/>
                    </v-dialog>
                </v-list-item>
                <v-list-item class="Help-Color" router :to="HelpRoute">
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
import Settings from './Settings'


function GetDisplayDuration(SongDuration) {
    return (((SongDuration-(SongDuration%60))/60).toString(10) + 'min ' + (SongDuration%60).toString(10) + 'sec')
}

export default {
    components: {Settings},
    data: () => ({
        PlaylistDialog: false,
        SettingsTab: false,
        AllNewSongs: [],
        NewPlaylist: "",
        SamePlaylistError: false,
        HelpRoute: '/HelpMenu',
        Selected: '',
        Options: [
            {Name: 'Color'},
            {Name: 'Home Screen'}
        ]
    }),

    methods: {
        ExitDialog(Paramters) {
            this.SettingsTab = !this.SettingsTab;
            if(Paramters['Type'] === 'Save') {
                if(Paramters['Selection'] != '' && Paramters['Selection'] != null) {
                    var Payload = {
                        Target: 'MusicPlaying',
                        MusicPlaying: parseInt(Paramters['Selection'], 10),
                    }
                    
                    this.$store.dispatch('UpdateMainData', Payload);
                }
            }
        },

        AddSongsToStore: function(GetNewSongs) {
            const { dialog } = remote;
            dialog.showOpenDialog({
                properties: ['openFile', 'multiSelections'],
                filters: [{
                    name: 'Select Songs',
                    extensions: ['mp3', 'wav', 'ogg', 'flac']
                }]
            },async function(file) {
                if(file) {
                    var NewSongs = [];

                    for(let i=0; i<file.length; ++i) {
                        let Path = file[i];
                         
                        var NewSong = { 
                            'Id': 0,
                            'Source': Path,
                            'Author': "",
                            'Duration': 0,
                            'DisplayDuration': 0,
                            'Tags': [],
                        }

                        await mm.parseFile(NewSong.Source)
                        .then( metadata => {
                            util.inspect(metadata, {showHidden:true, depth: null});
                            NewSong.Title = metadata.common.title
                            
                            if(!NewSong.Title) {
                                NewSong.Title = 'Custom Title' // if Songs title is not defined
                            }

                            NewSong.Duration = metadata.format.duration
                            NewSong.DisplayDuration = GetDisplayDuration(Math.ceil(NewSong.Duration))
                        });

                        NewSongs.push(NewSong);
                    }

                    GetNewSongs(NewSongs);
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
            var Present = false

            this.$store.state.MainData.AllPlaylists.forEach(Playlist => {
                if(Playlist.Name.toLowerCase() === this.NewPlaylist.toLowerCase()) {
                    Present = true
                }
            })

            if(!Present) {
                this.PlaylistDialog = false
                this.$store.dispatch('AddNewPlaylist', this.NewPlaylist)
                this.NewPlaylist = ""; // Important to reintialize NewPlaylist Variable...
                return true
            } else {
                // alert('Cannot Have two Playlist\'s with same name.')
                console.log('Error Called')
                this.PlaylistDialog = false;
                this.SamePlaylistError = true;
            }
        },

        GetNewPlaylistName: function() {
            this.PressedEnter();
        },

        OpenHelp: function() {
            //
        }
    },

    computed: {
        GetSettingTab: function() {
            return this.SettingsTab;
        }
    }
}

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