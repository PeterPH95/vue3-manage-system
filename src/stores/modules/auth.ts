import { defineStore, createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import { menuListApi } from "@/api/modules/login";
import type { AuthState } from '../interface';

// 你可以对 `defineStore()` 的返回值进行任意命名，但最好使用 store 的名字，同时以 `use` 开头且以 `Store` 结尾。(比如 `useUserStore`，`useCartStore`，`useProductStore`)
// 第一个参数是你的应用中 Store 的唯一 ID。
export const useAuthStore = defineStore(
  'AuthState', 
  {
  state: (): AuthState => ({ 
    // 动态路由，不做持久化存储
    authMenuList: [],
  }),
  getters: {
    // 获取菜单
		authMenuListGet: state => state.authMenuList,
  },
  actions: {
    async getAuthMenuList() {
			const { data } = await menuListApi();
      this.authMenuList = data.menuList;
		}
  },
  persist: false
})