<template>
    <div class="Main-Container">
        <v-card class="card-config">
            <div v-show="MusicPlaying == 1">
                <Rings />
            </div>
            <div v-show="MusicPlaying == 2">
                <ThreeDots />
            </div>
            <div v-show="MusicPlaying == 3" style="height: inherit; width: 1500px;">
                <Circles />
            </div>
            <div v-show="MusicPlaying == 4" style="height: inherit; width: inherit;">
                <Visualizer />
            </div>
            <div v-show="MusicPlaying == 5" style="height: inherit; width: inherit;">
                <Follower />
            </div>
            <div v-show="MusicPlaying == 6" style="height: inherit; width: inherit;">
                <StarShower />
            </div>
        </v-card>
    </div>
</template>

<script>

import Circles from '../components/Canvas/Circles';
import Visualizer from '../components/Canvas/BarVisualizer';
import Follower from '../components/Canvas/Follower';
import StarShower from '../components/Canvas/StarShower';
import Rings from '../components/Canvas/3DRings';
import ThreeDots from '../components/Canvas/ThreeDots'

export default {
    name: 'AnimationScreen',
    components: { Circles, Visualizer, Follower, StarShower, Rings, ThreeDots },    
    data: () => ({
        //
    }),

    methods: {
        MakeCircles: function() {
            //
        }
    },

    computed: {
        MusicPlaying: function() {
            return this.$store.getters.GetMusicPlaying
        }
    },

    mounted() {
        if(this.$store.getters.GetMusicPlaying == 3) {
            this.MakeCircles()
        }
    }
}
</script>

<style scoped>

/* #Canvas1 {
    width: 1000px;
    height: 500px;
    background-color: red;
} */

.Main-Container {
    margin-top: 11px;
    margin-left: 10px;
    height: 75vh;
    width: 1500px;
}

.card-config {
    width: 1500px;
    height: 75vh;
    float: left;
}
</style>

