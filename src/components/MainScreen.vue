<template>
    <div id="app">
    <v-flex>
      <v-row>
        <v-col cols = "2" id="drawer">
          <navDrawer/>
        </v-col>
        <v-col cols="10">
          <title-head/>
          <slot></slot>
        </v-col>
      </v-row>
    </v-flex>    
  </div>
</template>

<script>
import navDrawer from './Drawer.vue'
import titleHead from './Head.vue'

export default {
    name: 'mainScreen',
    components: {
        navDrawer,
        titleHead,
    },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;   
}

#drawer {
    padding-bottom: 0px;
}

</style>