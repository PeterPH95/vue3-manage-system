import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// element plus 按需引入的配置项
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  // 设置部署的 repo https://cn.vitejs.dev/guide/static-deploy.html#github-pages
  base: '/vue3-manage-system/',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    // 设置可以使用 ip 访问
    host: "0.0.0.0",
    port: 9527,
    open: false,
    cors: true,
    // 跨域代理
    proxy: {
      "/api": {
        target: "https://mock.mengxuegu.com/mock/6391da9d93a67b5f10669a02/api",
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, "")
      }
    }
  },
  plugins: [
    vue(),
    
    //  element plus 按需引入的配置项
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    //  element plus 按需引入的配置项
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
})
