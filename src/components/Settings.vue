<template>
    <v-card height="600">
        <v-app-bar flat color="deep-purple" dark>
            <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
            <v-toolbar-title>Settings</v-toolbar-title>
        </v-app-bar>
        <v-navigation-drawer v-model="drawer" absolute temporary class="indigo">
            <v-list style="margin-top: 150px">
                <v-list-item-group>
                    <v-list-item @click="GetSetting(1)">
                        <v-list-item-icon>
                            <v-icon class="white--text">mdi-palette</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title class='white--text font-weight-bold' >Themes</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item @click="GetSetting(2)">
                        <v-list-item-icon>
                            <v-icon class="white--text">mdi-animation</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title class='white--text font-weight-bold'>Animations</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item @click="GetSetting(3)">
                        <v-list-item-icon>
                            <v-icon class="white--text">mdi-google-assistant</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title class='white--text font-weight-bold'>Spectrum</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
        </v-navigation-drawer>
        <v-card-text>
            <div v-if="ChoosenSetting == 1">
                <ColorSettings />
            </div>
            <div v-if="ChoosenSetting == 2">
                <AnimationSettings />
            </div>
            <div v-if="ChoosenSetting == 3">
            </div>
        </v-card-text>
        <!-- <v-card-text style="height:500px;">
            <v-tabs show-arrows center-active centered v-model="Tab" next-icon="mdi-chevron-right" prev-icon="mdi-chevron-left">
                <v-tab v-for="Option in Options" :key="Option.Name"> {{ Option.Name }} </v-tab>
            </v-tabs>
            <v-tabs-items v-model="Tab">
                <v-tab-item>
                    Hello Color
                </v-tab-item>
                <v-tab-item>
                    <v-divider></v-divider><br>
                    <v-tabs show-arrows center-active centered v-model="InnerTab" next-icon="mdi-chevron-right" prev-icon="mdi-chevron-left">
                        <v-tab>Animations</v-tab>
                        <v-tab>Awesome Animation </v-tab>
                        <v-tab>Spectrum..</v-tab>
                    </v-tabs>
                    <v-tabs-items v-model="InnerTab">
                        <v-radio-group v-model="Selected">
                            <v-tab-item>
                                Css Animations
                                <br><br>
                                <v-radio color="red" value="1" label="3-D Rings">
                                </v-radio>
                                <br>
                                <v-radio color="red" value="2" label="3 Circles">
                                </v-radio>
                            </v-tab-item>
                            <v-tab-item>
                                Canvas Animation
                                <br><br>
                                <v-radio color="red" value="3" label="Expanding Circles">
                                </v-radio><br>
                                <v-radio color="red" value="5" label="Cursor Follower">                                  
                                </v-radio>
                                <br>
                                <v-radio color="red" value="6" label="Star Shower">
                                </v-radio><br>
                            </v-tab-item>
                            <v-tab-item>
                                Men at Work :) <br>
                                P.S. No Spectrums are available right now..
                            </v-tab-item>
                        </v-radio-group>
                    </v-tabs-items>
                </v-tab-item>   
            </v-tabs-items>
        </v-card-text> -->
        <v-card-actions class="OptionStyles">
            <v-btn color="green darken-1" text @click="ClickedExit('Save')">Save</v-btn>
            <v-btn color="green darken-1" text @click="ClickedExit('Close')">Close</v-btn>
        </v-card-actions>
    </v-card>
</template>
<script>
import ColorSettings from './Settings/Colors';
import AnimationSettings from './Settings/Animation';

export default {
    components: { ColorSettings, AnimationSettings},
    data: () => ({
        Tab: true,
        InnerTab: true,
        Selected: '',
        drawer: false,
        ChoosenSetting: 1,
        Options: [
            {Name: 'Color' },
            {Name: 'Home Screen'}
        ],
    }),
    methods: {
        ClickedExit: function(Type) {
            this.$emit('Changed', {'Type': Type, 'Selection': this.Selected})
        },

        GetSetting: function(SettingNumber) {
            // console.log('Setting Number: ', SettingNumber)
            this.ChoosenSetting = SettingNumber;
            this.drawer = false; // Close the navigation drawer on click event..
        }
    }
}

</script>

<style scoped>

.OptionStyles {
    position: absolute; 
    bottom: 0; 
    right: 0;
}

</style>