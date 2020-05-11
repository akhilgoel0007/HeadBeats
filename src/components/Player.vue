<template>
  <div class="footer-bar-container">
    <div class="footer-bar">
      <div class="footer-song-metadata">
        <img src="shape.jpg" class="footer-album-art" />
        <div class="footer-song-metadata-text">
          <span class="footer-song-name">Shape of You</span>
          <span class="footer-song-artist">Ed Sheeran</span>
        </div>
      </div>
      <div class="fab-btns">
        <button class="floating-action-btn">
          <v-icon class="icon-config">mdi-shuffle</v-icon>
        </button>
        <button class="floating-action-btn">
          <v-icon class="icon-config">mdi-skip-previous</v-icon>
        </button>
        <button class="floating-action-btn footer-fab-play">
          <v-icon class="icon-config">mdi-play</v-icon>
        </button>
        <button class="floating-action-btn">
          <v-icon class="icon-config">mdi-skip-next</v-icon>
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

<style scoped>
.icon-config {
  height: 55px;
  width: 55px;
  border-radius: 100%;
  color: white;
  background-color: #9575cdff;
  font-size: inherit;
}

.icon-config:hover {
  background-color: white;
  color: #9575cdff;
  /* font-size: inherit; */
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
}

.footer-song-metadata {
  position: relative;
  display: flex;
  justify-content: start;
  font-size: 20px;
  width: 25%;
  height: 60px;
}

.footer-album-art {
  height: 60px;
  width: 60px;
  margin: 0px 5px;
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
  width: 60px;
  height: 60px;
  font-size: 30px;
  background-color: #9575cdff;
  color: white;

  position: relative;
  margin-right: 10px;

  border-radius: 100%;
  border: 2.5px solid white;
  outline: none;

  cursor: pointer;
  transition: 0.25s;
  /* color: rgb(0, 0, 0, 0.2); */
}

.floating-action-btn::after {
  display: none;
  content: "";
  position: absolute;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.3);
  /*border: 0px;*/

  width: 60px;
  height: 60px;
  margin-top: -30px;
  margin-left: -30px;

  /* Center the ripple */
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