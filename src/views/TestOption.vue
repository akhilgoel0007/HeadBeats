<template>
    <v-card class="mx-auto" width="256" tile>
    <!-- <v-navigation-drawer permanent> -->
        <v-system-bar></v-system-bar>
        <v-list>
            <v-list-item>
                <v-list-item-avatar>
                    <v-img src="../assets/MyPic.jpg"></v-img>
                </v-list-item-avatar>
                <v-spacer></v-spacer>
                <v-btn icon>
                    <v-icon>mdi-image-edit</v-icon>
                </v-btn>
            </v-list-item>

            <v-list-item>
                <v-list-item-title class="title">{{PlayerName}}</v-list-item-title>
                <v-list-item-action>
                    <v-btn icon>
                        <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                </v-list-item-action>
            </v-list-item>
        </v-list>
        <!-- <v-divider></v-divider>
        <v-list nav dense>
            <v-list-item-group v-model="item" color="primary">
                <v-list-item v-for="(item, i) in items" :key="i">
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list> -->
    <!-- </v-navigation-drawer> -->
    </v-card>
</template>

<script>
  export default {
    data: () => ({
      item: 0,
      PlayerName: 'Akhil Goel',
      items: [
        { text: 'My Files', icon: 'mdi-folder' },
        { text: 'Shared with me', icon: 'mdi-account-multiple' },
        { text: 'Starred', icon: 'mdi-star' },
        { text: 'Recent', icon: 'mdi-history' },
        { text: 'Offline', icon: 'mdi-check-circle' },
        { text: 'Uploads', icon: 'mdi-upload' },
        { text: 'Backups', icon: 'mdi-cloud-upload' },
      ],
    }),
  }
</script>