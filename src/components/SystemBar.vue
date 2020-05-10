<template>
    <div>
        <v-system-bar app window dark>
            <v-spacer></v-spacer>
            <v-icon @click="MiniMizeWindow" class="pl-4">mdi-minus</v-icon>
            <v-icon @click="MaximizeWindow" class="pl-4">mdi-checkbox-blank-outline</v-icon>
            <v-icon @click="CloseWindow" class="pl-4">mdi-close</v-icon>
        </v-system-bar>
    </div>
</template>

<script>
const {remote} = require('electron');

export default {
    methods: {
        MiniMizeWindow: () => {
            remote.getCurrentWindow().minimize();
        },

        CloseWindow: () => {
            remote.getCurrentWindow().close();
        },

        MaximizeWindow: () => {
            var Window = remote.getCurrentWindow();
            Window.isMaximized() ? Window.unmaximize():Window.maximize()
        },
    }    
}
</script>