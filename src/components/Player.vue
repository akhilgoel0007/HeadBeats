<template>
  <div>
    <div class="SeekBar">
      <input type="range" id="Seek" name="Seek" value="0" max="100" min="0" />
      <div class="red Attributes" ></div>
    </div>
    <div class="footer-bar-container">
      <audio id="player">
        <source id="SongSource">
      </audio>
      <div class="footer-bar">
        <div class="footer-song-metadata">
          <img id="CoverImage" class="footer-album-art" />
          <div class="footer-song-metadata-text">
            <span id="SongName" class="footer-song-name"></span>
            <span id="ArtistName" class="footer-song-artist"></span>
          </div>
        </div>
        <div class="fab-btns">
          <button id="Shuffle-Button" class="floating-action-btn" @click="ShuffleSongs()">
            <v-icon class="icon-config">mdi-shuffle</v-icon>
          </button>
          <button id="Previous-Button" class="floating-action-btn" @click="PreviousSong()">
            <v-icon class="icon-config">mdi-skip-previous</v-icon>
          </button>
          <button id="Play-Button" class="floating-action-btn footer-fab-play" @click="PlayPause()">
            <v-icon v-if="PlayerStatus" id="Play-Button-Icon" class="icon-config">mdi-pause</v-icon>
            <v-icon v-else-if="!PlayerStatus" id="Play-Button-Icon" class="icon-config">mdi-play</v-icon>
          </button>
          <button id="Next-Button" class="floating-action-btn" @click="NextSong()">
            <v-icon class="icon-config">mdi-skip-next</v-icon>
          </button>
          <button id="Replay-Button" class="floating-action-btn" @click="RepeatCurrentSong()">
            <v-icon class="icon-config">mdi-replay</v-icon>
          </button>
        </div>
        <div class="footer-fab-playlist">
          <button class="floating-action-btn footer-fab-playlist-image">
            <v-icon class="icon-config">mdi-playlist-plus</v-icon>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { MyMusicBus } from '../main';
// import {PlaylistBus} from '../main';

export default {
  data: () => ({
    PlayerStatus: false, // Triangle
    LastSong: null,
    CurrentSong: null,
  }),

  methods: {
    ToggleCardState: async function(Current) {
      if(Current) {
        MyMusicBus.$emit('ToggleCurrentSong', this.CurrentSong.Title, Current)
      } else {
        MyMusicBus.$emit('ToggleCurrentSong', this.LastSong.Title, Current)
      }
    },

    PreviousSong: function() {
      //
    },

    NextSong: function() {
      //
    },
    RepeatCurrentSong: function () {
      //
    },

    ShuffleSongs: function() {
      //
    },

    PlaySong: function() {
      this.PlayerStatus = true
      document.getElementById('player').load() // Load The Song in Player..
      document.getElementById('player').play() // Play The Song in Player..
    },

    PlayCurrentSong: function() {
      var Player = document.getElementById("player");
      
      if(Player.readyState) {
        Player.play();
        this.PlayerStatus = true;
      }
    },

    PauseCurrentSong: function() {
      var Player = document.getElementById("player");
      this.PlayerStatus = false;
      Player.pause();
    },

    PlayPause: function() {
      if(this.PlayerStatus) {
        this.PauseCurrentSong();
      } else {
        this.PlayCurrentSong();
      }
      this.ToggleCardState(true);
    },

    LoadSong: function(Data) {
      this.FeedMetaData(Data)
      this.PlaySong()
    },

    FeedMetaData: function(Data) {
      document.getElementById("SongName").innerHTML = Data.Title
      document.getElementById("ArtistName").innerHTML = Data.Author
      document.getElementById("CoverImage").src = Data.ImageSrc
      document.getElementById('SongSource').src = Data.Source
    }
  },

  created() {
    MyMusicBus.$on('LoadSong', (Data) => {
      if(this.LastSong === null) {
        this.LastSong = Data
      } else {
        this.LastSong = this.CurrentSong
        this.ToggleCardState(false)
      }

      this.CurrentSong = Data
      this.LoadSong(Data);
    })

    MyMusicBus.$on('PauseSong', () => {
      this.PauseCurrentSong()
    })

    MyMusicBus.$on('PlaySong', () => {
      this.PlayCurrentSong()
    })
  }

}
</script>

<style scoped>
.Attributes {
  position: absolute;
  background-color: red;
  height: 7px;
  width: 0%;
}

.SeekBar {
  position: relative;
  height: 7px;
  background-color: lawngreen;
  width: 100%;
}

.SeekBar input[type="range"] {
  position: absolute;
  top: -5px;
  bottom: -5px;
  height: 15px;
  width: 100%;
  cursor: pointer;
  -webkit-appearance: none !important;
}

input[type="range"]:focus {
  outline: none;
}

.SeekBar input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none !important;
  position: relative;
  height: 10px;
  width: 14px;
  left: -0.5px;
  border-radius: 35%;
  background-color: blue;
  transition: 0.2s ease-in-out forwards;
  cursor: pointer;
  opacity: 0;
}

.SeekBar input[type="range"]:hover::-webkit-slider-thumb {
  opacity: 1;
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
  box-shadow: 0 5px 0 rgb(107, 5, 107),
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
  /*border: 0px;*/
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

</style>