import { createRouter, createWebHistory } from 'vue-router';

import LoginScreen from '@/screens/login/LoginScreen.vue';
import MainScreen from '@/screens/main/MainScreen.vue';
import QRCodesScreen from '@/screens/qr_code/QRCodesScreen.vue';
import KitsScreen from '@/screens/kits/KitsScreen.vue';
import WorkersScreen from '@/screens/workers/WorkersScreen.vue';
import TasksScreen from '@/screens/tasks/TasksScreen.vue';

const ifAuth = (to, from, next) => {
    let token = localStorage.getItem('token')
    // if (token === null) {
    //     next({ name: 'Login' });
    //     return;
    // }

    next();
}

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/', component: MainScreen, beforeEnter: ifAuth, children: [
                {
                    path: '',
                    component: KitsScreen,
                },
                {
                    path: 'tasks',
                    component: TasksScreen,
                },
                {
                    path: 'workers',
                    component: WorkersScreen,
                },
            ],
        },
        { path: "/login", component: LoginScreen, name: 'Login' },
        { path: "/qrcode/:id", component: QRCodesScreen, name: 'QR Code' }
    ],
})

export default router;

// export default new Router({
//     mode: 'history', // default 'hash'
//     routes: [
//         {
//             path: "/",
//             component: MainScreen,
//             beforeEnter: ifAuth,
//             children: [
//                 {
//                     path: "worker",
//                     component: Worker,
//                 }, {
//                     path: "",
//                     component: Tasks,
//                 },
//                 {
//                     path: "TechSpecification",
//                     component: TechSpecification,
//                 }
//             ]
//         },
//         {
//             path: "/progress/:id",
//             component: ProgressPage,
//             beforeEnter: ifAuth,
//             props: true,
//             children: [
//                 {
//                     path: ":bobbin_id",
//                     component: TimeLine,
//                     props: true
//                 }
//             ]
//         },
// {
//     path: "/login",
//     component: Login,
// },
//         {
//             path: "/qrcode/:id",
//             component: QRCode,
//             props: true,
//         }
//     ]
// });