import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import './assets/less/index.less'
import './mock/index'
import api from "./api/index";

const app = createApp(App)



// 全局挂载api
app.config.globalProperties.$api = api
app.use(createPinia())
app.use(router)

app.mount('#app')
