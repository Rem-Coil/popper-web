<template>

<div id="app">
          <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
  },
}
document.title = 'Rem&Coil';
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
    padding-bottom: 0;
}
</style>