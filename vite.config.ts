import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// element plus 按需引入的配置项
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
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
    cors: true
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
