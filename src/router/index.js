import Vue from 'vue';
import Router from 'vue-router';

import Worker from '../components/Worker.vue';
import Tasks from '../components/Tasks.vue';
import MainScreen from '../components/MainScreen.vue';
import ProgressPage from "@/components/Progress";
import TimeLine from "@/components/TimeLine";

Vue.use(Router);

export default new Router({
    mode: 'history', // default 'hash'
    routes: [
        {
            path: "/",
            component: MainScreen,
            children: [
                {
                    path: "/worker",
                    component: Worker,
                }, {
                    path: "/",
                    component: Tasks,
                }
            ]
        },
        {
            path: "/progress/:id",
            component: ProgressPage,
            props: true,
            children: [
                {
                    path: ":bobbin_id",
                    component: TimeLine,
                    props: true
                }
            ]
        }
    ]
});