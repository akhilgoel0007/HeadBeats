<template>
    <v-card class="mx-auto mt-5" max-width="1400" elevation="6" style="font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif">
        <v-toolbar style="background-color: #FBEAEB; padding-left: 55px;" height="85" flat>
            <v-toolbar-title class="font-weight-bold display-1 TextColor">Help Menu</v-toolbar-title>
        </v-toolbar>
        <v-card-text style="height: 500px; padding: 0px;">
            <v-card flat width="300" height="500px" class="Card-Config TextFont" style="border-radius: 0px 0px 0px 4px;">
                <v-list flat style="border-radius: inherit; height: 500px;" class="BackGround">
                    <h2 class="TextColor TextFont ListHead" style="height: 35px; font-size: 25px;">Options</h2>
                    <v-list-item-group v-model="item" color="primary">
                        <v-list-item v-for="(item, i) in items" :key="i" @click="GetToElement(item.HTMLid)">
                            <v-list-item-icon>
                                <v-icon class="TextColor" v-text="item.icon"></v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-title class="TextFont TextColor" v-text="item.text"></v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list-item-group>
                </v-list>
            </v-card>
            <v-card id="Content" flat width="1100" height="500px" class="Card-Config Text-Card">
                <HelpScreenText />
            </v-card>
        </v-card-text>
    </v-card>
</template>

<script>
import HelpScreenText from '../components/Help/HelpComponent'

export default {
    name: 'HelpMenu',
    components: { HelpScreenText },
    data: () => ({
      item: 1,
      items: [
        { text: 'Account', icon: 'mdi-account', HTMLid: 'Account'},
        { text: 'Dashboard', icon: 'mdi-view-dashboard', HTMLid: 'Dashboard'},
        { text: 'SideMenu', icon: 'mdi-menu', HTMLid: 'SideMenu'}, 
        { text: 'Animation', icon: 'mdi-animation', HTMLid: 'Animation'},
        { text: 'Music Player', icon: 'mdi-play-circle-outline', HTMLid: 'MusicPlayer'},

      ],
    }),

    methods: {
        GetToElement(ScrollToID) {
            var ElementID = document.getElementById(ScrollToID);
            ElementID.scrollIntoView({behavior: "smooth", block: 'start'});
        }
    }
}

</script>
<style scoped>

.Text-Card {
    overflow-y: auto; 
    border-radius: 0px 0px 4px 0px; 
    /* border: 1.5px solid #358597; */
    color: #8AAAE5;
}

.Card-Config {
    float: left;
}

.BackGround {
    background-color: #FBEAEB;
}

.TextColor {
    color: #2F3C7E;
}

.TextFont {
    font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif
}

.ListHead {
    font-weight: bold;
    text-align: center;
}

</style>