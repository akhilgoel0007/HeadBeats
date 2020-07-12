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
            <v-card id="Content" flat width="1100" height="500px" class="Card-Config" style="overflow-y: auto; border-radius: 0px 0px 4px 0px; border: 1.5px solid #358597">
                <pre>
                    <h1 id="ID1">Help Menu Content goes to ID 1</h1>
                    <h1>Help Menu Content goes here</h1>
                    <h1>Help Menu Content goes here</h1>
                    <h1>Help Menu Content goes here</h1>
                    <h1>Help Menu Content goes here</h1>
                    <h1>Help Menu Content goes here</h1>
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    <h1>Help Menu Content goes here</h1>
                    <h1>Help Menu Content goes here</h1>
                    <h1>Help Menu Content goes here</h1>
                    <h1>Help Menu Content goes here</h1>
                    <h1>Help Menu Content goes here</h1>
                    <h1>Help Menu Content goes here</h1>
                    <h1>Help Menu Content goes here</h1>
                    <h1>Help Menu Content goes here</h1>
                    <h1>Help Menu Content goes here</h1>
                    <h1>Help Menu Content goes here</h1>
                    <h1>Help Menu Content goes here</h1>
                    <h1>Help Menu Content goes here</h1>
                    <h1>Help Menu Content goes here</h1>
                    <h1>Help Menu Content goes here</h1>
                    <h1 id="ID2">Help Menu Content goes to ID 2</h1>
                    <h1>Help Menu Content goes here</h1>
                    <h1>Help Menu Content goes here</h1>
                    <h1>Help Menu Content goes here</h1>
                    <h1>Help Menu Content goes here</h1>
                    <h1>Help Menu Content goes here</h1>
                    <h1>Help Menu Content goes here</h1>
                    <h1>Help Menu Content goes here</h1>
                    <h1>Help Menu Content goes here</h1>
                    <h1>Help Menu Content goes here</h1>
                    <h1 id="ID3">Help Menu Content goes to ID 3</h1>
                    <h1>Help Menu Content goes here</h1>
                    <h1>Help Menu Content goes here</h1>
                    <h1>Help Menu Content goes here</h1>
                    <h1>Help Menu Content goes here</h1>
                    <h1>Help Menu Content goes here</h1>
                    <h1>Help Menu Content goes here</h1>
                    <h1>Help Menu Content goes here</h1>
                    <h1>Help Menu Content goes here</h1>
                    <h1>Help Menu Content goes here</h1>
                    <h1>Help Menu Content goes here</h1>
                    <h1>Help Menu Content goes here</h1>
                    <h1>Help Menu Content goes here</h1>
                    <h1>Help Menu Content goes here</h1>
                    <h1>Help Menu Content goes here</h1>
                    <h1>Help Menu Content goes here</h1>
                    <h1>Help Menu Content goes here</h1>
                    <h1>Help Menu Content goes here</h1>
                    <h1>Help Menu Content goes here</h1>
                    <h1>Help Menu Content goes here</h1>
                    <h1>Help Menu Content goes here</h1>
                    <h1>Help Menu Content goes here</h1>
                    <h1>Help Menu Content goes here</h1>
                    <h1>Help Menu Content goes here</h1>
                    <h1>Help Menu Content goes here</h1>
                    <h1>Help Menu Content goes here</h1>
                    <h1 id="ID4">Help Menu Content goes to ID 4</h1>
                    <h1>Help Menu Content goes here</h1>
                    <h1>Help Menu Content goes here</h1>
                    <h1>Help Menu Content goes here</h1>
                    <h1>Help Menu Content goes here</h1>
                    <h1>Help Menu Content goes here</h1>
                    <h1>Help Menu Content goes here</h1>
                    <h1>Help Menu Content goes here</h1>
                    <h1>Help Menu Content goes here</h1>
                    <h1>Help Menu Content goes here</h1>
                    <h1>Help Menu Content goes here</h1>
                    <h1>Help Menu Content goes here</h1>
                    <h1>Help Menu Content goes here</h1>
                    <h1>Help Menu Content goes here</h1>
                    <h1>Help Menu Content goes here</h1>
                    <h1>Help Menu Content goes here</h1>
                    <h1>Help Menu Content goes here</h1>
                    <h1>Help Menu Content goes here</h1>
                    <h1>Help Menu Content goes here</h1>
                    <h1>Help Menu Content goes here</h1>
                    <h1>Help Menu Content goes here</h1>
                    <h1>Help Menu Content goes here</h1>
                    <h1>Help Menu Content goes here</h1>
                    <h1>Help Menu Content goes here</h1>
                    <h1>Help Menu Content goes here</h1>
                    <h1>Help Menu Content goes here</h1>
                    <h1>Help Menu Content goes here</h1>
                    <h1>Help Menu Content goes here</h1>
                    <h1>Help Menu Content goes here</h1>
                    <h1 id='ID5'>Help Menu Content goes to ID 5</h1>
                    <h1>Help Menu Content goes here</h1>
                    <h1>Help Menu Content goes here</h1>
                    <h1>Help Menu Content goes here</h1>
                    <h1>Help Menu Content goes here</h1>
                </pre>
            </v-card>
        </v-card-text>
    </v-card>
</template>
<script>

export default {
    name: 'HelpMenu',
    data: () => ({
      item: 1,
      items: [
        { text: 'Account', icon: 'mdi-account', HTMLid: 'ID1'},
        { text: 'Dashboard', icon: 'mdi-view-dashboard', HTMLid: 'ID2'},
        { text: 'SideMenu', icon: 'mdi-menu', HTMLid: 'ID3'}, 
        { text: 'Animation', icon: 'mdi-animation', HTMLid: 'ID4'},
        { text: 'Music Player', icon: 'mdi-play-circle-outline', HTMLid: 'ID5'},

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