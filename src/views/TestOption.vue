<template>
  <v-row justify="center">
    <v-btn color="primary" dark @click.stop="dialog = true">
      Open Dialog
      
   </v-btn>
    <v-dialog v-model="dialog" max-width="290" height="130" style="padding: 0px,">
      <v-card style="padding: 0px," height="140">
        <v-card-actions>
          <v-alert width="290" height="100" dense border="left" type="warning">
            I'm a dense alert with the <strong>border</strong> prop and a <strong>type</strong> of warning
          </v-alert>
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
