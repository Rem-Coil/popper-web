<template>
  <v-toolbar width="100%" flat>
    <v-btn :to="'/'" text color="secondary">
      <v-icon color="secondary">mdi-keyboard-backspace</v-icon>
      Назад
    </v-btn>
    <v-toolbar-title>&nbsp; Партия - {{ title }}</v-toolbar-title>
  </v-toolbar>
</template>


<script>
export default {
  name: 'progressHead',

  components: {},
  props: {
    title: {
      type: String
    }
  }


};
</script>