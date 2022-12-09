import { createApp } from 'vue';
import { createPinia } from 'pinia';

// 引入element-plus样式
import 'element-plus/dist/index.css';

import App from '@/App.vue';
import router from '@/router';
// pinia store
import pinia from "@/stores/index";
import '@/style/index.less';
// 关闭本地mock
import '@/mock/index';
import api from "@/api/index";

const app = createApp(App);


// 全局挂载api
app.config.globalProperties.$api = api;
app.use(pinia);
app.use(router);

app.mount('#app');
