<template>
    <v-navigation-drawer app class="ExtendedProperties" expand-on-hover right height="27.2%">
    <!--Change the height when adding new component-->
        <v-list app class='pt-0 pb-0'>
            <v-list-item-group>
                <v-list-item v-for="Option in SidedrawerItems" :key="Option.Name" v-bind:class='Option.TextColor'>
                    <v-list-item-icon v-bind:class='Option.TextColor'>
                        <v-icon class="white--text font-weight-bold">{{Option.Icon}}</v-icon>
                    </v-list-item-icon >
                    <v-list-item-title class="white--text font-weight-bold" v-bind:class='Option.TextColor'>{{Option.Name}}</v-list-item-title>
                </v-list-item>
                <!-- <v-divider></v-divider> -->
            </v-list-item-group>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
  export default {
    data: () => ({
        SidedrawerItems: [
            { Name: 'Add Music', Icon: 'mdi-music-note-plus', TextColor: 'Add-Music-Color'},
            { Name: 'New Playlist', Icon: 'mdi-playlist-plus', TextColor: 'New-Playlist-Color'},
            { Name: 'Settings', Icon: 'mdi-cogs', TextColor: 'Settings-Color'},
            { Name: 'Help', Icon: 'mdi-help-circle', TextColor: 'Help-Color'},
            // { Name: ''},
        ]
    }),
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