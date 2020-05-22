<template>
    <div class="Main-Container">
        <v-card class="card-config">
            <div v-show="MusicPlaying == 1">
                <div class="Loader-Container">
                    <div class="Loader">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>
            <div v-show="MusicPlaying == 2">
                <div class="Container">
                    <div class="Circle-Container">
                        <div class="Circle"></div>
                    </div>
                    <div class="Circle-Container">
                        <div class="Circle"></div>
                    </div>
                    <div class="Circle-Container">
                        <div class="Circle"></div>
                    </div>
                    <div class="Circle-Container">
                        <div class="Circle"></div>
                    </div>
                </div>
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
import Follower from '../components/Canvas/Follower'
import StarShower from '../components/Canvas/StarShower'

export default {
    name: 'AnimationScreen',
    components: { Circles, Visualizer, Follower, StarShower },    
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

.Container {
    position: absolute;
    top: 50%;
    left: 50%;
}

.Circle-Container {
    width: 400px;
    height: 25vh;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}

.Circle-Container:after {
    content: '';
    width: 20px;
    height: 5px;
    position: absolute;
    background: black;
    border-radius: 50%;
    bottom: 0;
    left: 50%;
    opacity: 0.4;
    animation: Shadows 2s linear infinite;
}

.Circle-Container:nth-child(2):after {
    animation-delay: -0.3s
}

.Circle-Container:nth-child(3):after {
    animation-delay: -0.6s
}

.Circle {
    width: 15px;
    height: 15px;
    background: #fff;
    border-radius: 50%;
    position: absolute;
    left: 50%;
    top: 50%;
    animation: Anim 2s linear infinite;
}

.Circle-Container:nth-child(2) .Circle {
    animation-delay: -0.3s
}

.Circle-Container:nth-child(3) .Circle {
    animation-delay: -0.6s;
}

@keyframes Anim {
    0% {
        transform-origin: 400% 50%;
        transform: rotate(0);
    }

    50% {
        transform-origin: 400% 50%;
        transform: rotate(360deg);
    }

    50.1% {
        transform-origin: -300% 50%;
        transform: rotate(0deg);
    } 

    100% {
        transform-origin: -300% 50%;
        transform: rotate(-360deg);
    }
}

@keyframes Shadows {
    0% {

    }

    12.5% {
        transform: translate(50px) scale(0.6);
    }

    25% {
        transform: translate(110px);
    }

    37.5% {
        transform: translate(50px) scale(1.4);
    }

    50% {
        transform: translate(0px);
    }

    67.5% {
        transform: translate(-50px) scale(0.6);
    }

    75% {
        transform: translate(-110px);
    }

    87.5% {
        transform: translate(-50px) scale(1.4);
    }

    100% {
        transform: translate(0px);
    }
}

.Loader-Container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 75vh;
}

.Loader {
    /* background-color: red; */
    position: relative;
    width: 410px;
    height: 410px;
    transform-style: preserve-3d;
    transform: perspective(500px) rotateX(60deg);
}

.Loader span {
    position: absolute;
    display: block;
    border: 5px solid #9c27b0;
    box-shadow: 0 5px 0 rgb(107, 5, 107),
                inset 0 5px 0 rgb(255, 190, 252);
    box-sizing: border-box;
    border-radius: 50%;
    animation: Animate 3s ease-in-out infinite;
}

@keyframes Animate{
    0%, 100% {
        transform: translateZ(-100px);
    }

    50% {
        transform: translateZ(100px);
    }
}

.Loader span:nth-child(1) {
    top: 0px;
    left: 0px;
    bottom: 0px;
    right: 0px;
    animation-delay: -0.1s;
}

.Loader span:nth-child(2) {
    top: 10px;
    left: 10px;
    bottom: 10px;
    right: 10px;
    animation-delay: -0.2s;
}

.Loader span:nth-child(3) {
    top: 20px;
    left: 20px;
    bottom: 20px;
    right: 20px;
    animation-delay: -0.3s;
}

.Loader span:nth-child(4) {
    top: 30px;
    left: 30px;
    bottom: 30px;
    right: 30px;
    animation-delay: -0.4s;
}

.Loader span:nth-child(5) {
    top: 40px;
    left: 40px;
    bottom: 40px;
    right: 40px;
    animation-delay: -0.5s;
}

.Loader span:nth-child(6) {
    top: 50px;
    left: 50px;
    bottom: 50px;
    right: 50px;
    animation-delay: -0.6s;
}

.Loader span:nth-child(7) {
    top: 60px;
    left: 60px;
    bottom: 60px;
    right: 60px;
    animation-delay: -0.7s;
}
.Loader span:nth-child(8) {
    top: 70px;
    left: 70px;
    bottom: 70px;
    right: 70px;
    animation-delay: -0.8s;
}

.Loader span:nth-child(9) {
    top: 80px;
    left: 80px;
    bottom: 80px;
    right: 80px;
    animation-delay: -0.9s;
}

.Loader span:nth-child(10) {
    top: 90px;
    left: 90px;
    bottom: 90px;
    right: 90px;
    animation-delay: -1s;
}

.Loader span:nth-child(11) {
    top: 100px;
    left: 100px;
    bottom: 100px;
    right: 100px;
    animation-delay: -1.1s;
}

.Loader span:nth-child(12) {
    top: 110px;
    left: 110px;
    bottom: 110px;
    right: 110px;
    animation-delay: -1.2s;
}

.Loader span:nth-child(13) {
    top: 120px;
    left: 120px;
    bottom: 120px;
    right: 120px;
    animation-delay: -1.3s;
}

.Loader span:nth-child(14) {
    top: 130px;
    left: 130px;
    bottom: 130px;
    right: 130px;
    animation-delay: -1.4s;
}

.Loader span:nth-child(15) {
    top: 140px;
    left: 140px;
    bottom: 140px;
    right: 140px;
    animation-delay: -1.5s;
}

.Loader span:nth-child(16) {
    top: 150px;
    left: 150px;
    bottom: 150px;
    right: 150px;
    animation-delay: -1.6s;
}

.Loader span:nth-child(17) {
    top: 160px;
    left: 160px;
    bottom: 160px;
    right: 160px;
    animation-delay: -1.7s;
}

.Loader span:nth-child(18) {
    top: 170px;
    left: 170px;
    bottom: 170px;
    right: 170px;
    animation-delay: -1.8s;
}

.Loader span:nth-child(19) {
    top: 180px;
    left: 180px;
    bottom: 180px;
    right: 180px;
    animation-delay: -1.9s;
}

.Loader span:nth-child(20) {
    top: 190px;
    left: 190px;
    bottom: 190px;
    right: 190px;
    animation-delay: -2s;
}

.Loader span:nth-child(21) {
    top: 200px;
    left: 200px;
    bottom: 200px;
    right: 200px;
    animation-delay: -2.1s;
}

</style>

