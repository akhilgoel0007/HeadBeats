<template>
  <v-app>
    <SystemBar />
    <SideMenu />
    <NavBar />
    <v-content>
      <router-view></router-view>
    </v-content>
    <Player />
  </v-app>
</template>



<script>

import NavBar from '@/components/NavBar'
import SideMenu from '@/components/SideMenu'
import SystemBar from '@/components/SystemBar'
import Player from '@/components/Player'

export default {
  name: 'App',
  components: { NavBar, SideMenu, SystemBar, Player }, 
  
  data: () => ({
    //
  }),
};
</script>
