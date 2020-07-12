<template>
    <nav>
        <v-app-bar app clipped-right>
            <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title class="grey--text">
                <span class="font-weight-light">Head</span>
                <span class="font-weight-bold">Beats</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-menu origin= "center center"  transition="scale-transition">
                <template v-slot:activator="{ on: Menu }">
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on: ToolTip }">
                            <v-avatar v-on="{...Menu, ...ToolTip}" size="40" style="right: 25px;">
                                <img :src="GetProfileImage">
                            </v-avatar>
                        </template>
                        <span>Account</span>
                    </v-tooltip>
                </template> 
                <v-card class="mx-auto" width="256" tile>
                    <v-list>
                        <v-list-item>
                            <v-list-item-avatar>
                                <v-avatar size="40">
                                    <img :src="GetProfileImage">
                                </v-avatar>
                            </v-list-item-avatar>
                            <v-spacer></v-spacer>
                            <v-btn icon @click="EditImage()">
                                <v-icon>mdi-image-edit</v-icon>
                            </v-btn>
                        </v-list-item>

                        <v-list-item @click.stop="ChangeProfileName = true">
                            <v-list-item-title v-if="ProfileNamePresent" class="title">{{ GetProfileName }}</v-list-item-title>
                            <v-list-item-title v-if="!ProfileNamePresent" class="title">No Name..</v-list-item-title>
                            <v-list-item-action>
                                <v-btn icon @click="ChangeProfileName = !ChangeProfileName">
                                    <v-icon>mdi-pencil</v-icon>
                                </v-btn>
                            </v-list-item-action>
                            <v-dialog v-model="ChangeProfileName" persistent max-width="600">
                                <v-card>
                                    <v-card-title class="headline">New Profile Name</v-card-title>
                                    <v-card-text>
                                        <v-text-field v-model="NewProfileName" v-on:keyup.enter="PressedEnter()"></v-text-field>
                                    </v-card-text>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn color="green darken-1" text @click="GetNewProfileName()"> Save </v-btn>
                                        <v-btn color="green darken-1" text @click="ChangeProfileName = false"> Close </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                        </v-list-item>
                    </v-list>
                </v-card>
            </v-menu>
        </v-app-bar>
        <v-navigation-drawer app temporary v-model='drawer' class="indigo">
            <v-avatar size="200" min-width="250px" min-height="250px">
                <img :src="GetProfileImage">
            </v-avatar>
            <v-list>
                <v-list-item-group>
                    <v-list-item v-for="Content in SideMenu" :key="Content.Title" router :to="Content.Route">
                        <v-list-item-icon>
                            <v-icon class="white--text">
                                {{Content.Icon}}
                            </v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title class='white--text font-weight-bold'>
                                {{Content.Title}}
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
        </v-navigation-drawer>
    </nav>
</template>

<script>
import { remote } from 'electron';

export default {
    data() {
        return {
            drawer: false,
            Sidedrawer: false,
            AccountImage: false,
            item: 0,
            ChangeProfileName: false,
            NewProfileImage: null,
            NewProfileName: "",
            SideMenu: [
                { Title: 'Home', Icon: 'mdi-home', Route:'/'},
                { Title: 'My Music', Icon: 'mdi-account-music', Route:'/MyMusic' },
                { Title: 'Playlists', Icon: 'mdi-playlist-music', Route:'/Playlists' },
                { Title: 'Test Option', Icon: 'mdi-playlist-music', Route:'/TestOption'}
            ],
        }
    },

    methods: {
        PressedEnter: function() {
            this.ChangeProfileName = false;
            if(this.NewProfileName === "") {
                this.NewProfileName = 'No Name..'
            }
            var Payload = {
                Target: 'ProfileName',
                ProfileName: this.NewProfileName
            };

            this.$store.dispatch('UpdateMainData', Payload);
            this.NewProfileName = ""; // Important to reintialize NewProfileName Variable...
        },

        GetNewProfileName: function() {
            this.PressedEnter();
        },

        EditImage: function() {
            const { dialog } = remote;
            var Store = this.$store;

            dialog.showOpenDialog({
                properties: ['openFile'],
                filters: [{
                    name: 'Select Picture',
                    extensions: ['png', 'jpg', 'jpeg']
                }]
            }, function(file) {
                if(file) {
                    console.log(file[0])
                    var Payload = {
                        Target: 'ProfileImage',
                        ProfileImage: file[0]
                    }

                    Store.dispatch('UpdateMainData', Payload);
                }
            })
        },
    },

    computed: {
        GetProfileImage: function() {
            return this.$store.getters.GetProfileImage;
        },

        GetProfileName: function() {
            return this.$store.getters.GetProfileName;
        },
        
        ProfileNamePresent: function() {
            return this.$store.getters.CheckProfileName
        },
    },
}
</script>