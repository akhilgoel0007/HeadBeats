<template>
    <v-row justify="center">
        <v-btn color="primary" dark @click.stop="dialog = true">
            Open Dialog
        </v-btn>

        <v-dialog v-model="dialog" persistent max-width="800px">
            <v-card>
                <v-card-title height="50" class="headline">Settings</v-card-title>
                <v-card-text style="height:500px;">
                    <v-tabs show-arrows center-active centered v-model="Tab" next-icon="mdi-chevron-right" prev-icon="mdi-chevron-left">
                        <v-tab v-for="Option in Options" :key="Option.Name">
                            {{ Option.Name }}
                        </v-tab>
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
                                        <v-list-item>
                                            <v-radio color="red" value="1" label="3-D Rings">
                                                <v-list-item-content>
                                                    <v-list-item-title>3-D Rings</v-list-item-title>
                                                    <v-list-item-subtitle>Rings in continous 3D motion</v-list-item-subtitle>
                                                </v-list-item-content>
                                            </v-radio>
                                        </v-list-item>
                                        <v-list-item>
                                            <v-radio color="red" value="2" label="3 Circles">
                                                <v-list-item-content>
                                                    <v-list-item-title>3 Circles</v-list-item-title>
                                                    <v-list-item-subtitle>3 Circles in Continuos motion</v-list-item-subtitle>
                                                </v-list-item-content>
                                            </v-radio>
                                        </v-list-item>
                                    </v-tab-item>
                                    <v-tab-item>
                                        Canvas Animation
                                        <v-list-item>
                                            <v-radio color="red" value="3" label="Expanding Circles">
                                                <v-list-item-content>
                                                    <v-list-item-title>Expanding Circles</v-list-item-title>
                                                    <v-list-item-subtitle>Circles Expand When Hovered upon</v-list-item-subtitle>
                                                </v-list-item-content>
                                            </v-radio>
                                        </v-list-item>
                                        <v-list-item>
                                            <v-radio color="red" value="5" label="Cursor Follower">                                  
                                                <v-list-item-content>
                                                    <v-list-item-title>Cursor Follower</v-list-item-title>
                                                    <v-list-item-subtitle>Rotating lines which follow the motion of cursor</v-list-item-subtitle>
                                                </v-list-item-content>
                                            </v-radio>
                                        </v-list-item>
                                        <v-list-item>
                                            <v-radio color="red" value="6" label="Star Shower">
                                                <v-list-item-content>
                                                    <v-list-item-title>Star Shower</v-list-item-title>
                                                    <v-list-item-subtitle>See Star shower on screen whilst enjoying your music.</v-list-item-subtitle>
                                                </v-list-item-content>
                                            </v-radio>
                                        </v-list-item>
                                    </v-tab-item>
                                    <v-tab-item>
                                        Men at Work :) <br>
                                        P.S. No Spectrums are available right now..
                                    </v-tab-item>
                                </v-radio-group>
                            </v-tabs-items>
                        </v-tab-item>   
                    </v-tabs-items>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" text @click="ExitDialog('Save')">Save</v-btn>
                    <v-btn color="green darken-1" text @click="ExitDialog('Close')">Close</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
  export default {
    data () {
      return {
        Tab: true,
        InnerTab: true,
        dialog: false,
        Selected: this.$store.getters.GetMusicPlaying,
        Options: [
            {Name: 'Color'},
            {Name: 'Home Screen'}
        ]
      }
    },

    methods: {
        ExitDialog(Action) {
            this.dialog = !this.dialog;

            if(Action === 'Save') {
                var Payload = {
                    MusicPlaying: parseInt(this.Selected, 10)
                }
                
                this.$store.dispatch('UpdateSettings', Payload);
            }
        }
    }
  }
</script>