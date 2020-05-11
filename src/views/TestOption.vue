<template>
  <v-card>
    <v-combobox multiple chips label="Song Tags">
      <template v-slot:selection="data">
        <v-chip>
          <v-avatar left class="accent white--text" v-text="data.item.slice(0, 1).toUpperCase()"></v-avatar>
          {{ data.item }}
        </v-chip>
      </template>
    </v-combobox>
  </v-card>
</template>

<script>
  export default {
    data () {
      return {
        items: [
          'Programming',
          'Design',
          'Vue',
          'Vuetify',
        ],
      }
    },
  }
</script>