import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import 'vuetify/dist/vuetify.min.css'
import router from "./router"
import axios from 'axios'

Vue.use(vuetify)

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')

let token = localStorage.getItem('token')
if (token !== null) {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
}
