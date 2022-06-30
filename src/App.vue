<template>

<div id="app">
  <v-app id="inspire">
    <v-flex>
      <v-row>
        <v-col cols = "2" id="drawer">
          <navDrawer/>
        </v-col>
        <v-col cols="10">
          <router-view/>
        </v-col>
      </v-row>
    </v-flex>
  </v-app>
  </div>
</template>

<script>
import navDrawer from './components/Drawer.vue'
export default {
  name: 'App',
  components: {
    navDrawer
  },
}
</script>
<style>
.router-link-exact-active{
  width: 100%;
  height: 48px;
  padding: 0px;
  color: #2196f3;
  border-left: solid 5px #2196f3;
  text-align: left;
}
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