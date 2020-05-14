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
                <v-list-item class="New-Playlist-Color">
                    <v-list-item-icon class='New-Playlist-Color'>
                        <v-icon class="white--text font-weight-bold">mdi-playlist-plus</v-icon>
                    </v-list-item-icon >
                    <v-list-item-title class="white--text font-weight-bold New-Playlist-Color" >New Playlist</v-list-item-title>
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

    export default {
    
    data: () => ({
        //
    }),

    methods: {
        PickSongs: function() {
            const { dialog } = remote;

            dialog.showOpenDialog({
                properties: ['openFile', 'multiSelections'],
                filters: [{
                    name: 'Select Songs',
                }]
            }, function(file) {
                if(file) {
                    console.log(file);
                }
            })
        },

        CreateNewPlaylist: function() {
            //
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