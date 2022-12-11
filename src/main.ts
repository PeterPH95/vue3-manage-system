import { createApp } from 'vue';

// ElMessage 样式需要这样引入 https://element-plus.gitee.io/zh-CN/guide/quickstart.html#%E6%89%8B%E5%8A%A8%E5%AF%BC%E5%85%A5
import 'element-plus/es/components/message/style/css';
import 'element-plus/es/components/notification/style/css';
// import 'element-plus/dist/index.css';//所有样式

import App from '@/App.vue';
import router from '@/router';
// pinia store
import pinia from "@/stores/index";
import '@/style/index.less';
// 如果使用远程mock，请注释下一行
// 解注释后请在请求api中修改 mock 为true
// import '@/mock/index';
import api from "@/api/index";

const app = createApp(App);


// 全局挂载api
app.config.globalProperties.$api = api;
app.use(pinia);
app.use(router);

app.mount('#app');
