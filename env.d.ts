/// <reference types="vite/client" />

// 将.vue文件声明为模块，防止ts报错
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
 
// 解决 js-cookie 导入报错
declare module 'js-cookie';