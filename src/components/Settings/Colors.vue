<template>
    <div class="text--center">
        <div v-for="CurrentTheme in AllThemes" :Key="CurrentTheme.Theme">
            <v-btn class='mt-9' block :color='CurrentTheme.ThemeBack' @click="ChangeTheme(CurrentTheme.Theme)">{{CurrentTheme.Theme}}</v-btn>
        </div>
    </div>    
</template>

<script>
export default {
    data: () => ({
        AllThemes: [
            { Theme: 'Light Theme', ThemeBack: 'primary'},
            { Theme: 'Dark Theme', ThemeBack: 'success'},
            { Theme: 'Custom Theme 1', ThemeBack: 'error'},
            { Theme: 'Custom Theme 2', ThemeBack: 'warning'},
            { Theme: 'Custom Theme 3', ThemeBack: 'indigo'},
            { Theme: 'Custom Theme 4', ThemeBack: 'grey'}
        ]
    }),

    methods: {
        ChangeTheme: function(NewTheme) {
            var Payload = {
                Target: 'Theme',
                Theme: NewTheme
            };
            this.$store.dispatch('UpdateMainData', Payload);
        }
    }
}
</script>>
<style scoped>
</style>