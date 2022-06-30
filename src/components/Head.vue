<template>
  <v-toolbar width="100%" flat="true">
    <v-toolbar-title>{{ title }}</v-toolbar-title>
    <v-spacer></v-spacer>
  </v-toolbar>
</template>


<script>
export default {
  name: 'titleHead',

  components: {},
  props: {
    title: {
      type: String
    }
  }


};
</script>