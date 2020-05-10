<template>
    <nav>
        <v-app-bar app clipped-right>
            <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

            <v-toolbar-title class="grey--text">
                <span class="font-weight-light">Head</span>
                <span class="font-weight-bold">Beats</span>
                <!-- <span> by @Akhil Goel ;)</span> -->
            </v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn depressed class="grey--text">
                <v-icon>mdi-logout</v-icon> 
                <span class="font-weight-bold">Sign Out</span>
            </v-btn>
<!-- 
            <v-btn icon>
                <v-icon>mdi-heart</v-icon>
            </v-btn>

            <v-btn icon @click="Sidedrawer = !Sidedrawer">
                <v-icon>mdi-dots-vertical</v-icon>
            </v-btn> -->
        </v-app-bar>

        <v-navigation-drawer app temporary v-model='drawer' class="indigo">
            <v-avatar
                size="200"
                min-width="250px"
                min-height="250px"
            >
                <img
                    src="../assets/MyPic.jpg"
                    alt="John"
                >
            </v-avatar>
            <v-list>
                <v-list-item-group>
                    <v-list-item v-for="Content in SideMenu" :key="Content.Title" router :to="Content.Route">
                        <v-list-item-icon>
                            <v-icon class="white--text">
                                {{Content.Icon}}
                            </v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title class='white--text font-weight-bold'>
                                {{Content.Title}}
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
        </v-navigation-drawer>
    </nav>
</template>

<script>

export default {
    data() {
        return {
            drawer: false,
            Sidedrawer: false,
            SideMenu: [
                { Title: 'My Music', Icon: 'mdi-account-music', Route:'/MyMusic' },
                { Title: 'Playlists', Icon: 'mdi-playlist-music', Route:'/Playlists' },
                { Title: 'Test Option', Icon: 'mdi-playlist-music', Route:'/TestOption'}
            ],
        }
    }
}
</script>