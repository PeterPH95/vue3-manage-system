import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import './assets/less/index.less'
import './mock/index'


const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
