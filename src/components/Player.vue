<template>
    <div class="footer-bar-container">
        <div class="footer-bar">
            <div class="footer-song-metadata">
                <img id="CoverImage" class="footer-album-art" />
                <div class="footer-song-metadata-text">
                    <span id="SongName" class="footer-song-name"></span>
                    <span id="ArtistName" class="footer-song-artist"></span>
                </div>
            </div>
            <div class="fab-btns">
                <button id="Shuffle-Button" class="floating-action-btn">
                    <v-icon class="icon-config">mdi-shuffle</v-icon>
                </button>
                <button id="Previous-Button" class="floating-action-btn">
                    <v-icon class="icon-config">mdi-skip-previous</v-icon>
                </button>
                <button id="Play-Button" class="floating-action-btn footer-fab-play" @click="PlayPause()">
                    <v-icon id="Play-Button-Icon" class="icon-config">mdi-play</v-icon>
                </button>
                <button id="Next-Button" class="floating-action-btn">
                    <v-icon class="icon-config">mdi-skip-next</v-icon>
                </button>
                <button id="Replay-Button" class="floating-action-btn">
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
</template>

<script>
// import {MyMusicBus} from '../main';
// import {PlaylistBus} from '../main';

export default {
  data: () => ({
    return: {
      PlayerStatus: true,
    }
  }),

  methods: {
    GetMetaData: function() {
      //
    },

    PlayPause: function() {
      var Player = document.getElementById("player");

      if(this.PlayerStatus) {
        Player.pause();
        this.PlayerStatus = false;
      } else {
        if(Player.readyState) {
          Player.play();
          this.PlayerStatus = true;
        }
      }
    }
  }
}
</script>

<style scoped>
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
  font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
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