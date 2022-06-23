<template>
  <div id="app">
    <v-flex>
      <v-row>
        <v-col cols = "3">
          <navDrawer/>
        </v-col>
        <v-col cols="9">
    <title-head/>
            <worker-tab/>
        </v-col>
      </v-row>
    </v-flex>
    
  </div>
</template>

<script>
import navDrawer from './components/Drawer.vue'
import titleHead from './components/Head.vue'
import workerTab from './components/Worker.vue'

export default {
  name: 'App',
  components: {
    navDrawer,
    titleHead,
    workerTab
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
</style>
