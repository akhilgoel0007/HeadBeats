<template>
  <div>
    
    <div class="SeekBar-Container" v-show="PlayerHasSong">
      <span class="SeekBar-Bar"><span class="SeekBar-Fill" id="SeekBarFill"></span></span>
      <input type="range" id="Seek" class="SeekBar-Slider" name="Seek" value="0" max="100000" min="0" />
    </div>
    
    <div class="footer-bar-container">
      
      <audio id="player"></audio>
      
      <div class="footer-bar">

        <!-- Song Metadata on left side of Player -->

        <div class="footer-song-metadata">
          <img id="CoverImage" v-bind:class="{'footer-album-art': PlayerHasSong}" />
          <div class="footer-song-metadata-text">
            <span id="SongName" class="footer-song-name"></span>
            <span id="ArtistName" class="footer-song-artist"></span>
          </div>
        </div>
        
        <!-- Song Metadata on left side of Player End-->

        <!-- Action Buttons -->

        <div class="fab-btns">

          <!-- Shuffle Songs Button -->
          
          <v-tooltip top>
            <template v-slot:activator="{ on: tooltip }">
              <button v-show="PlayerHasSong" id="Shuffle-Button" class="floating-action-btn" v-on="{...tooltip}" @click="ShuffleSongs()">
                <v-icon v-if="!Shuffle" class="icon-config">mdi-shuffle</v-icon>
                <v-icon v-else-if="Shuffle" class="icon-config" style="background-color: white; color: #9575cdff;">mdi-shuffle</v-icon>
              </button>
            </template>
            <span>Shuffle</span>
          </v-tooltip>

          <!-- Shuffle Songs Button End-->

          <!-- Play Previous Song Button -->

          <v-tooltip top>
            <template v-slot:activator="{ on: tooltip }">
              <button v-show="PlayerHasSong" id="Previous-Button" class="floating-action-btn" v-on="{...tooltip}" @click="PreviousSong()">
                <v-icon class="icon-config">mdi-skip-previous</v-icon>
              </button>
            </template>
            <span>Previous</span>
          </v-tooltip>

          <!-- Play Previous Song Button End-->

          <!-- Play and Pause Song Button -->
          
          <v-tooltip top>
            <template v-slot:activator="{ on: tooltip }">
              <button v-show="PlayerHasSong" id="Play-Button" class="floating-action-btn footer-fab-play" v-on="{...tooltip}" @click="PlayPause()">
                <v-icon v-if="PlayerStatus" id="Play-Button-Icon" class="icon-config" style="background-color: white; color: #9575cdff;">mdi-pause</v-icon>
                <v-icon v-else-if="!PlayerStatus" id="Play-Button-Icon" class="icon-config">mdi-play</v-icon>
              </button>
            </template>
            <span v-if="PlayerStatus">Pause</span>
            <span v-else-if="!PlayerStatus">Play</span>
          </v-tooltip>
          
          <!-- Play and Pause Song Button End -->

          <!-- Play Next Song Button -->

          <v-tooltip top>
            <template v-slot:activator="{ on: tooltip }">
              <button v-show="PlayerHasSong" id="Next-Button" v-on="{...tooltip}" class="floating-action-btn" @click="NextSong()">
                <v-icon class="icon-config">mdi-skip-next</v-icon>
              </button>
            </template>
            <span>Next</span>
          </v-tooltip>
          
          <!-- Play Next Song Button End -->
          
          <!-- Replay One Song Button -->
          <v-tooltip top>
            <template v-slot:activator="{ on: tooltip }">
              <button v-show="PlayerHasSong" id="Replay-Button" v-on="{...tooltip}" class="floating-action-btn" @click="RepeatCurrentSong()">
                <v-icon v-if="!Repeat" class="icon-config">mdi-replay</v-icon>
                <v-icon v-else-if="Repeat" class="icon-config" style="background-color: white; color: #9575cdff;">mdi-replay</v-icon> 
              </button>
            </template>
            <span>Repeat</span>
          </v-tooltip>

          <!-- Replay One Song Button End-->

        </div>
        <!-- Action Buttons End-->

        <!-- Player Volume Slider -->
        <div v-show="PlayerHasSong" class="footer-fab-volume-slider">
          <v-icon class="Volume-Icons">mdi-volume-low</v-icon>
          <div class="Slider-Container">
            <span class="bar"><span class="fill" id="SliderFill"></span></span>
            <input type="range" min="0" max="100" value="5" id="Volume-Slider" class="Slider">
          </div>
          <v-icon class="Volume-Icons">mdi-volume-high</v-icon>
        </div>
        
        <!-- Player Volume Slider End-->

        <!-- Add To Playlist Button -->

        <div class="footer-fab-playlist"> 
          <v-tooltip left>
            <template v-slot:activator="{ on: tooltip }">
              <button v-show="PlayerHasSong" v-on="{...tooltip}" class="floating-action-btn footer-fab-playlist-image">
                <v-icon class="icon-config" style="padding-left:6px;">mdi-playlist-plus</v-icon>
              </button>
            </template>
            <span>Add To Playlist</span>
          </v-tooltip>
        </div>
        
        <!-- Add To Playlist Button End-->
      
      </div>
    </div>
  </div>

</template>

<script>
import { MyMusicBus } from '../main';
import { PlaylistBus } from '../main';
import { VisualizerBus } from '../main';

export default {

  data: () => ({
    WindowName: null,
    PlayerStatus: false, // Triangle
    LastSong: null,
    CurrentSong: null,
    CurrentSongsList: null,
    SeekBar: null,
    SeekSlide: null,
    Repeat: false,
    Shuffle: false
  }),

  methods: {
    ToggleMyMusicCardState: async function(Current) {
      if(Current) {
        MyMusicBus.$emit('ToggleCurrentSong', this.CurrentSong.Title, Current);
      } else {
        MyMusicBus.$emit('ToggleCurrentSong', this.LastSong.Title, Current);
      }
    },

    TogglePlaylistCardState: async function(Current) {
      if(Current) {
        PlaylistBus.$emit('ToggleCurrentSong', this.WindowName, this.CurrentSong.Title, Current);
      } else {
        PlaylistBus.$emit('ToggleCurrentSong', this.WindowName, this.LastSong.Title, Current);
      }
    },

    SeekTimeUpdate: function() {
      document.getElementById('Seek').value = document.getElementById('player').currentTime * (100000/this.CurrentSong.Duration);
      document.getElementById('SeekBarFill').style.width = (document.getElementById('Seek').value/1000) + '%';
    },

    SeekUpdate: function() {
      document.getElementById('player').currentTime = this.CurrentSong.Duration * (document.getElementById('Seek').value/100000);
    },

    NextSongToggle: async function(WindowName) {
      if(WindowName === "AllSongs") {
        MyMusicBus.$emit('NextSong', this.LastSong.Title, this.CurrentSong.Title);
      } else {
        PlaylistBus.$emit("NextSong", WindowName, this.LastSong.Title, this.CurrentSong.Title);
      }
    },

    NextSong: function() {
      if(this.CurrentSongsList != null) {
        var NextSong = null;

        if(this.CurrentSong.Id != this.CurrentSongsList.length) {
          this.CurrentSongsList.forEach(Song => {
            if(Song.Id === this.CurrentSong.Id+1) {
              NextSong = Song;
            }
          });
        } else {
          this.CurrentSongsList.forEach(Song =>{
            if(Song.Id === 1) {
              NextSong = Song; // Go to the start of the list.. basically repeat
            }
          })
        }

        this.LastSong = this.CurrentSong;
        this.CurrentSong = NextSong;
        this.NextSongToggle(this.WindowName);
        this.LoadSong(NextSong);
      }
    },

    PreviousSong: function() {
      if(this.CurrentSongsList != null) {
        var PreviousSong = null;

        if(this.CurrentSong.Id != 1) {
          this.CurrentSongsList.forEach(Song => {
            if(Song.Id === this.CurrentSong.Id-1) {
              PreviousSong = Song;
            }
          });
        } else {
          this.CurrentSongsList.forEach(Song =>{
            if(Song.Id === this.CurrentSongsList.length) {
              PreviousSong = Song; // Go to the start of the list.. basically repeat
            }
          })
        }

        this.LastSong = this.CurrentSong;
        this.CurrentSong = PreviousSong;
        this.NextSongToggle(this.WindowName);
        this.LoadSong(PreviousSong);
      }
    },

    ChangeSong: function() {
      if(!this.Repeat) {
        document.getElementById('player').currentTime = 0;
        this.NextSong();
      }
    },

    RepeatCurrentSong: function () {
      this.Repeat = !this.Repeat;
      document.getElementById('player').loop = this.Repeat;
    },

    ShuffleSongs: function() {
      this.Shuffle = !this.Shuffle;
    },

    PlaySong: function() {
      this.PlayerStatus = true;
      
      this.$store.dispatch('ChangePlayingSongStatus', true);
      
      document.getElementById('player').load(); // Load The Song in Player..
      document.getElementById('player').play(); // Play The Song in Player..
    },

    PlayCurrentSong: function() {
      var Player = document.getElementById("player");
      
      if(Player.readyState) {
        Player.play();
        this.$store.dispatch('ChangePlayingSongStatus', true);
        this.PlayerStatus = true;
      }
    },

    PauseCurrentSong: function() {
      var Player = document.getElementById("player");

      this.$store.dispatch('ChangePlayingSongStatus', false);
      
      this.PlayerStatus = false;
      Player.pause();
    },

    PlayPause: function() {
      if(this.CurrentSong != null && this.LastSong != null) {
        if(this.PlayerStatus) {
          this.PauseCurrentSong();
        } else {
          this.PlayCurrentSong();
        }
        if(this.WindowName === "AllSongs") {
          this.ToggleMyMusicCardState(true);
        } else {
          this.TogglePlaylistCardState(true);
        }
      }
    },

    LoadSong: function(Data) {
      if(this.$store.getters.GetMusicPlaying == 4) {
        VisualizerBus.$emit('ChangeSong', Data);
      }
      this.FeedMetaData(Data);
      this.PlaySong();
    },

    SetVolume: function() {
      document.getElementById('player').volume = document.getElementById('Volume-Slider').value/100;
      document.getElementById('SliderFill').style.width = document.getElementById('Volume-Slider').value + '%';
    },

    FeedMetaData: function(Data) {
      document.getElementById("SongName").innerHTML = Data.Title;
      document.getElementById("ArtistName").innerHTML = Data.DisplayDuration;
      document.getElementById("CoverImage").src = Data.ImageSrc;
      document.getElementById('player').src = Data.Source;
      document.getElementById('player').volume = 0.05;

      // this.ConnectAnalyzer();

      document.getElementById('Seek').addEventListener('change', this.SeekUpdate, false);
      document.getElementById('player').addEventListener('timeupdate', this.SeekTimeUpdate, false);
      document.getElementById('player').addEventListener('ended', this.ChangeSong, false);
      document.getElementById('Volume-Slider').addEventListener('mousemove', this.SetVolume);
    },

    ConnectAnalyzer: function() {
      var audio = document.getElementById('player');
      var AudioContext = new (window.AudioContext || window.webkitAudioContext)();
      var analyser = AudioContext.createAnalyser();
      var source = AudioContext.createMediaElementSource(audio);

      source.connect(analyser);
      analyser.connect(AudioContext.destination);
  
      var frequency_array = new Uint8Array(analyser.frequencyBinCount);

      var Payload = {
        'FrequencyArray': frequency_array,
        'Analyser': analyser
      }

      this.$store.dispatch('StoreSpectrumDetails', Payload);
    }
  },

  computed: {
    PlayerHasSong: function() {
      if(!this.CurrentSong) {
        return false;
      } else {
        return true;
      }
    }
  },

  created() {
    MyMusicBus.$on('LoadSong', (Data) => {
      if(this.LastSong === null) {
        this.LastSong = Data;
      } else {
        this.LastSong = this.CurrentSong;
        this.ToggleMyMusicCardState(false);
      }

      this.CurrentSong = Data
      this.LoadSong(Data);
    })

    MyMusicBus.$on('PauseSong', () => {
      this.PauseCurrentSong();
    })

    MyMusicBus.$on('PlaySong', () => {
      this.PlayCurrentSong();
    })

    MyMusicBus.$on('SetSongList', (Name, SongsList) => {
      this.WindowName = Name;
      this.CurrentSongsList = SongsList;
    })
    
    // Make another window to work on the switching of the windows..

    PlaylistBus.$on('LoadSong', (Data) => {
      
      if(this.LastSong === null) {
        this.LastSong = Data;
      } else {
        this.LastSong = this.CurrentSong;
        this.TogglePlaylistCardState(false);
      }

      this.CurrentSong = Data;
      this.LoadSong(Data);
    })

    PlaylistBus.$on('SetSongList', (Name, SongsList) => {
      this.WindowName = Name;
      this.CurrentSongsList = SongsList;
    })

    PlaylistBus.$on('PauseSong', () => {
      this.PauseCurrentSong();
    })

    PlaylistBus.$on('PlaySong', () => {
      this.PlayCurrentSong();
    })
  },

  // mounted() {
  //   this.ConnectAnalyzer;
  // }
}

</script>

<style scoped>

.SeekBar-Container {
  height: 4px;
  width: 100%;
  position: relative;
}

.SeekBar-Container .SeekBar-Slider {
  -webkit-appearance: none;
  appearance: none;
  position: absolute;
  z-index: 2;
  top: 3px;
  bottom: -5px;
  height: 15px;
  width: 100%;
  background: transparent;
  height: 3px;
  outline: none;
  cursor: pointer;
}

.SeekBar-Container .SeekBar-Slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 16px;
  height: 16px;
  background: #9C27B0;
  border-radius: 50px;
  box-shadow: 0 0 0 0 rgba(186, 104, 200, 1);
  transition: .2s ease-in-out;
}

.SeekBar-Container .SeekBar-Slider::-webkit-slider-thumb:hover {
  box-shadow: 0 0 0 20px rgba(209, 147, 216, .3);
}

.SeekBar-Container .SeekBar-Slider::-webkit-slider-thumb:active {
  box-shadow: 0 0 0 25px rgba(186, 104, 200, .5);
}
.SeekBar-Container .SeekBar-Bar {
  position: absolute;
  z-index: 1;
  top: 2px;
  bottom: -5px;
  height: 5px;
  width: 100%;
  background: #E1BEE7;
  overflow: hidden;
}

.SeekBar-Container .SeekBar-Bar .SeekBar-Fill {
  display: block;
  background: #9C27B0;
  height: 5px;
  width: 0%;
}

.Slider-Container {
  float: left;
  width: 120px;
  height: 30px;
  position: relative;
}

.Slider-Container .Slider {
  position: absolute;
  z-index: 2;
  bottom: 13px;
  -webkit-appearance: none;
  background: transparent;
  height: 3px;
  outline: none;
  border-radius: 10px;
  width: 110px;
  cursor: pointer;
}

.Slider-Container .Slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 14px;
  height: 14px;
  background: #673AB7;
  border-radius: 50px;
  box-shadow: 0 0 0 0 rgba(98, 0, 238, 1);
  transition: .3s ease-in-out;
}

.Slider-Container .Slider::-webkit-slider-thumb:hover {
  box-shadow: 0 0 0 10px rgba(98, 0, 238, .1);
}

.Slider-Container .Slider::-webkit-slider-thumb:active {
  box-shadow: 0 0 0 13px rgba(98, 0, 238, .3);
}

.Slider-Container .bar {
  position: absolute;
  z-index: 1;
  bottom: 13px;
  height: 3px;
  width: 110px;
  background: white;
  border-radius: 10px;
  overflow: hidden;
}

.Slider-Container .bar .fill {
  display: block;
  background: #673AB7;
  height: 3px;
  width: 5%;
}

.icon-config {
  height: inherit;
  width: inherit;
  border-radius: 100%;
  color: white;
  background-color: #9575cdff;
  font-size: inherit;
  border: 2.5px solid white;
}

.icon-config:hover {
  background-color: white;
  color: #9575cdff;
}

.footer-bar-container {
  background-color: #9575cdff;
  width: 100%;
  height: 80px;
  margin-bottom: 10px;
  border: 1px solid rgb(0, 0, 0, 0.2);
  position: relative;
  left: 0;
  bottom: 0;
  margin: auto;
  padding: 10px 0px;
}

.footer-bar {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer-song-metadata {
  position: relative;
  display: flex;
  justify-content: start;
  font-size: 17px;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  width: 25%;
  height: 60px;
}

.footer-album-art {
  height: 60px;
  width: 60px;
  margin: 0px 15px;
  border: 1.5px solid white;
}

.footer-song-metadata-text {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.fab-btns {
  text-align: center;
  width: 100%;
  position: absolute;
}

.floating-btn {
  width: 60px;
  height: 60px;
  border-radius: 100%;
}

.floating-action-btn {
  width: 45px;
  height: 45px;
  font-size: 25px;
  background-color: #9575cdff;
  color: white;
  position: relative;
  margin-right: 10px;
  border-radius: 100%;
  outline: none;
  cursor: pointer;
  transition: 0.25s;
}

.floating-action-btn::after {
  display: none;
  content: "";
  position: absolute;
  border-radius: 50%;
  background-color: #b3d4fc;
  width: 60px;
  height: 60px;
  margin-top: -30px;
  margin-left: -30px;
  top: 50%;
  left: 50%;
  animation: ripple 0.75s;
  opacity: 0;
}

.floating-action-btn:focus:not(:active)::after {
  display: block;
}

@keyframes ripple {
  from {
    opacity: 1;
    transform: scale(0);
  }
  to {
    opacity: 0;
    transform: scale(1.7);
  }
}

.floating-action-btn:hover {
  color: #9575cdff;
  background-color: white;
  border: 0px;
}

.footer-fab-play {
  width: 60px;
  height: 60px;
  font-size: 30px;
  background-color: #9575cdff;
  color: white;
}

.footer-fab-play:hover {
  background-color: white;
  border-color: 0px;
  color: white;
}

.footer-fab-playlist {
  position: absolute;
  right: 10px;
  color: black;
  width: 60px;
}

.footer-fab-playlist-image:hover {
  background-color: white;
}

.footer-fab-volume-slider {
  position: absolute;
  right: 230px;
  bottom: 15px;
  color: black;
  width: 180px;
  float: left;
}

.Volume-Icons {
  width: 30px;
  height: 30px;
  color: white;
  float: left;
}

</style>