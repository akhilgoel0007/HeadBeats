<template>
  <v-row justify="center">
    <v-btn color="primary" dark @click.stop="dialog = true">
      Open Dialog
    </v-btn>

    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-title class="headline">Playlists</v-card-title>
        <v-card-actions>
          <v-container fluid style="padiing-top: 0px;">
            <v-checkbox v-model="selected" label="John" value="John" hide-details></v-checkbox>
            <v-checkbox v-model="selected" label="Jacob" value="Jacob" hide-details></v-checkbox>
            <v-checkbox v-model="selected" label="Akhil" value="Akhil" hide-details></v-checkbox>
          </v-container>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
  export default {
    data () {
      return {
        dialog: false,
        selected: ['John'],
      }
    },
  }
</script>
