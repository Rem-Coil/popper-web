import Vue from 'vue';
import Router from 'vue-router';

import Worker from '../components/Worker.vue';
import Tasks from '../components/Tasks.vue';
import Settings from '../components/Settings.vue';

Vue.use(Router);

export default new Router({
  mode: 'history', // default 'hash'
  routes: [
    {
      path: "/",
      component: Worker, 
    },{
      path: "/tasks",
      component: Tasks, 
    },
    {
      path: "/settings",
      component: Settings,
    }
  ]
});