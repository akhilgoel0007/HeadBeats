<template>
    <div id="MainDiv">
        <canvas ref="Circle-Canvas" id="circlecnv"></canvas>
            <div id="UI">
                <canvas ref="Top-Canvas" id="topcnv"></canvas>
                <div class="topBar">
                    <audio controls id="audio"></audio>
                        <input id="audioFile" type="file" accept="Audio/*" capture/> 
            <!--             <select id="colorSelect" onchange="changeColor()">
                            <option value="0">Color Spectrum</option>
                            <option value="1">Red</option>
                            <option value="2">Orange</option>
                            <option value="3">Yellow</option>
                            <option value="4">Green</option>
                            <option value="5">Blue</option>
                            <option value="6">Purple</option>
                        </select> -->
                </div>
            </div>
        <p></p>
        <canvas ref="Visulaizer-Canvas" class="visualizer" id="cnv1" width="1024" height="350"></canvas>
    </div>    
</template>
<script>

import { VisualizerBus } from '../../main';

export default {
    data() {
        return {
            context: null,
            SongSource: null,
            Thisaudio: document.getElementById('audio')
        }
    },
    
    // methods: {
    //     ChangedSong() {
    //         console.log('called');
    //         // var audio = document.getElementById('audio');
    //         this.Thisaudio.src = this.SongSource;
    //         this.Thisaudio.play();
    //     }
    // },

    created() {
        VisualizerBus.$on('ChangeSong', (Data) => {
            document.getElementById('audio').src = Data.src;
            document.getElementById('audio').play()
            // this.ChangedSong();
        })
    },

    mounted() {
        var grd1;
        var bigBars = 0;
        var colorStyle = 0;
        // var pastIndex = 900;
        var WIDTH = 1024; // Width of the visualizer
        var HEIGHT = 350; // Position of the visulaizer in the canvas..
        var INTERVAL = 128;//256; // the number of plates in the visulaizer..
        var SAMPLES = 2048;//4096;//1024;//512;//2048; //this is the main thing to change right now // frequency

        // Colors...
        var r = 0;
        var g = 0;
        var b = 255;
        var x = 0;
        ////

        // var currVol = .3;  Volume
            
        var canvas = document.getElementById("cnv1"); //drawing the canvas
        var context = canvas.getContext('2d')

        var audio = document.getElementById('audio');
        audio.volume = .3;
        // var vol = document.getElementById("volumeSlider");
        // var colorSelect = document.getElementById("colorSelect");

        var audioctx = new AudioContext(); //setting up audio analyzer to get frequency info
        var analyser = audioctx.createAnalyser();

        analyser.fftSize = SAMPLES;
            
        var oscillator = audioctx.createOscillator();
        oscillator.connect(audioctx.destination);

        // Connecting node to audio source
        ///////////////////////////////////////////////////////////////////
        var source = audioctx.createMediaElementSource(audio); 
        source.connect(analyser);
        source.connect(audioctx.destination);

        //////////////////////////////////////////////////////////////////

        var freqArr = new Uint8Array(analyser.frequencyBinCount);
        var barHeight = HEIGHT;

        /////////////////////////////////////////////////////////////////////
        // Canvas Properties 
        var canvasC = document.getElementById("circlecnv"); 
        var contextC = canvasC.getContext("2d");
        
        var windowWidth = 1500;
        var windowHeight = 650;

        canvasC.width = 1500;
        canvasC.height = 650;
        //////////////////////////////////////////////////////////////////////////

        var canvasTop = document.getElementById("topcnv");
        var contextTop = canvasTop.getContext("2d");

        canvasTop.width = 1500;
        canvasTop.height = 75;

        contextTop.fillStyle = "rgb(" + 128 + "," + 128 + "," + 128 + ")";
        contextTop.fillRect(0,0, windowWidth, 75);
            
        window.requestAnimationFrame(draw);
        
        // audio = document.getElementById('audio');
        // audio.src = this.SongSource
        // audio.play();
        window.requestAnimationFrame(draw);

        function drawSides() {
            //this is for the circular colors that come in from the sides of the screen
            grd1 = contextC.createRadialGradient(windowWidth/2, windowHeight/2, 800 - (bigBars*40), windowWidth/2, windowHeight/2, 2400);
            if(colorStyle == 0){
                grd1.addColorStop(1,"fuchsia");
                grd1.addColorStop(0,"black"); //ORIGINAL rgb color cycle 
            }
            else if(colorStyle == 1){
                grd1.addColorStop(1,"red");
                grd1.addColorStop(0,"black"); //red color gradient depending on height of bar
            }
            else if(colorStyle == 2){
                grd1.addColorStop(1,"orange");
                grd1.addColorStop(0,"black"); //orange color gradient depending on height of bar
            }
            else if(colorStyle == 3){
                grd1.addColorStop(1,"yellow");
                grd1.addColorStop(0,"black"); //yellow color gradient depending on height of bar
            }
            else if(colorStyle == 4){
                grd1.addColorStop(1,"LightGreen");
                grd1.addColorStop(0,"black"); //green color gradient depending on height of bar
            }
            else if(colorStyle == 5){
                grd1.addColorStop(1,"DodgerBlue");
                grd1.addColorStop(0,"black"); //blue color gradient depending on height of bar
            }
            else{
                grd1.addColorStop(1,"fuchsia");
                grd1.addColorStop(0,"black"); //purple color gradient depending on height of bar
            }

            contextC.fillStyle = grd1;
            contextC.fillRect(0,0,windowWidth,windowHeight);
        }

        function draw(){
            // console.log("called")
            // if(!audio.paused){
                bigBars = 0;
                r = 0;
                g = 0;
                b = 255;
                x = 0;
                context.clearRect(0,0,WIDTH, HEIGHT);
                analyser.getByteFrequencyData(freqArr);
                for(var i = 0; i < INTERVAL; i++){
                    if(/*i <= 50 &&*/ barHeight >= (240 /* currVol*/)){
                        bigBars++;
                    }
                    //max = 900; //default placeholder
                    var num = i;
                    barHeight = ((freqArr[num] - 128) * 2) + 2;
                    if(barHeight <= 1){
                        barHeight = 2;
                    }
                    
                    r = r + 10; //this is for the color spectrum
                    if(r > 255){
                        r = 255;
                    }
                    g = g + 1;
                    if(g > 255){
                        g = 255;
                    }
                    b = b - 2;
                    if(b < 0){
                    b = 0;
                    }

                    if(colorStyle == 0){
                        context.fillStyle = "rgb(" + r + "," + g + "," + b + ")"; //rgb color cycle 
                    }
                    else if(colorStyle == 1){
                        context.fillStyle = "rgb(" + ((2/3)*(barHeight)) + "," + (0*(barHeight)) + "," + (0*(barHeight)) + ")"; //red color gradient depending on height of bar
                    }
                    else if(colorStyle == 2){
                        context.fillStyle = "rgb(" + (1*(barHeight)) + "," + (.6*(barHeight)) + "," + (0*(barHeight)) + ")"; //orange color gradient depending on height of bar
                    }
                    else if(colorStyle == 3){
                        context.fillStyle = "rgb(" + (.95*(barHeight)) + "," + (.85*(barHeight)) + "," + (0*(barHeight)) + ")"; //yellow color gradient depending on height of bar
                    }
                    else if(colorStyle == 4){
                        context.fillStyle = "rgb(" + (0*(barHeight)) + "," + ((2/3)*(barHeight)) + "," + (0*(barHeight)) + ")"; //green color gradient depending on height of bar
                    }
                    else if(colorStyle == 5){
                        context.fillStyle = "rgb(" + (.58*(barHeight/10)) + "," + (0*(barHeight)) + "," + (1*(barHeight)) + ")"; //blue color gradient depending on height of bar
                    }
                    else{
                        context.fillStyle = "rgb(" + (1*(barHeight)) + "," + (0*(barHeight)) + "," + (1*(barHeight)) + ")"; //purple color gradient depending on height of bar
                    }

                    context.fillRect(x, HEIGHT - barHeight, (WIDTH/INTERVAL) - 1 , barHeight);
                    x = x + (WIDTH/INTERVAL);
                }
            }

            if(bigBars >= 1){
                drawSides();
            }
            else{
                contextC.clearRect(0,0,windowWidth,windowHeight);
            }
            window.requestAnimationFrame(draw);
        // }
    }
}

</script>

<style scoped>

#MainDiv {
    height: 90vh;
    width: 100%;
}

#circlecnv{
    z-index: -1;
    padding: 0;
    display: block;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin:auto;
}

.topBar{
    position: relative;
    padding: 0;
    display: block;
    top: 0;
    left: 0;
    right: 0;
    margin:auto;
    color: white;
}

#topcnv{
    z-index: -1;
    position: absolute;
    z-index: -1;
    padding: 0;
    display: block;
    top: 0;
    left: 0;
    margin:auto;
    opacity: .65;
}

.visualizer{
    width: 1024px;
    height: 350px;
    padding: 0;
    display: block;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin:auto;
}
</style>