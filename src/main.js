import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/plugins/router'
import naive from 'naive-ui'

// Not Recomended use Naive: https://www.naiveui.com/en-US/os-theme/docs/usage-sfc
createApp(App)
    .use(naive)
    .use(router)
    .mount('#app')
