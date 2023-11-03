import { createRouter, createWebHistory } from 'vue-router';

import LoginScreen from '@/screens/LoginScreen.vue';
import MainScreen from '@/screens/MainScreen.vue';
import QRCodesScreen from '@/screens/QRCodesScreen.vue';

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
        { path: '/', component: MainScreen, beforeEnter: ifAuth },
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