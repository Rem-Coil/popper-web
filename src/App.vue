<template>
<div>
<drawer/>
<router-view/>
</div>
  <!-- <main-screen>
    <worker-tab/>
  </main-screen> -->
</template>

<script>
import Drawer from './components/Drawer.vue'
// import mainScreen from './components/MainScreen.vue'
// import workerTab from './components/Worker.vue'

export default {
  name: 'App',
  components: {
    // mainScreen,
    // workerTab,
    Drawer
  },
}
</script>
