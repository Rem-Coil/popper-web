import Vue from 'vue';
import Router from 'vue-router';

import Worker from '../components/Worker.vue';
import Login from '../components/Login.vue';
import Tasks from '../components/Tasks.vue';
import MainScreen from '../components/MainScreen.vue';
import ProgressPage from "@/components/progress/Progress";
import TimeLine from "@/components/progress/TimeLine";
import QRCode from "@/components/QRCode";
import TechSpecification from "@/components/TechSpecification";

Vue.use(Router);

const ifAuth = (to, from, next) => {
    let token = localStorage.getItem('token')
    if (token === null) {
        next('/login');
        return;
    }

    next();
}

export default new Router({
    mode: 'history', // default 'hash'
    routes: [
        {
            path: "/",
            component: MainScreen,
            beforeEnter: ifAuth,
            children: [
                {
                    path: "worker",
                    component: Worker,
                }, {
                    path: "",
                    component: Tasks,
                },
                {
                    path: "TechSpecification",
                    component: TechSpecification,
                }
            ]
        },
        {
            path: "/progress/:id",
            component: ProgressPage,
            beforeEnter: ifAuth,
            props: true,
            children: [
                {
                    path: ":bobbin_id",
                    component: TimeLine,
                    props: true
                }
            ]
        },
        {
            path: "/login",
            component: Login,
        },
        {
            path: "/qrcode/:id",
            component: QRCode,
            props: true,
        }
    ]
});