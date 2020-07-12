<template>
    <div>
        <v-system-bar app window style="background-color: #A7FFEB;">
        <!-- <v-system-bar app window class=""> -->
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

<style scoped>

.SystemBarColors {
    background-color: #004D40;
}

</style>