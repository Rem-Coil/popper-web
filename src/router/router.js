import Vue from 'vue';
import Router from 'vue-router';

import Worker from './component/Worker.vue';
// ...

Vue.use(Router);

export default new Router({
  mode: 'history', // default 'hash'
  routes: [
    {
	path: "/",
	component: Worker, 
    },
    // ...
  ]
});