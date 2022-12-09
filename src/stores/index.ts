import { defineStore, createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

// 你可以对 `defineStore()` 的返回值进行任意命名，但最好使用 store 的名字，同时以 `use` 开头且以 `Store` 结尾。(比如 `useUserStore`，`useCartStore`，`useProductStore`)
// 第一个参数是你的应用中 Store 的唯一 ID。
export const useGlobalStore = defineStore(
  'GlobalState', 
  {
  // 其他配置...
  state: () => ({ 
    token: "",
  }),
  getters: {},
  actions: {
    // 存储后端返回的 token
    setToken(token: string) {
      this.token = token
    }
  },
  persist: true
})

// 数据持久化 插件：piniaPersist
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

export default pinia;
