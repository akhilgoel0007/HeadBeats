<template>
    <div class="text--center">
        <div v-for="Theme in AllThemes" :Key="Theme">
            <v-btn class='mt-9' block color='primary' @click="ChangeTheme(Theme)">{{Theme}}</v-btn>
        </div>
    </div>    
</template>

<script>
export default {
    data: () => ({
        AllThemes: [
            'Light Theme',
            'Dark Theme',
            'Theme 3',
            'Theme 4',
            'Theme 5',
            'Theme 6'
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