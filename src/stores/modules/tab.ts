import { defineStore } from 'pinia'
import type { TabsMenuProps, TabsState } from "@/stores/interface";

// 你可以对 `defineStore()` 的返回值进行任意命名，但最好使用 store 的名字，同时以 `use` 开头且以 `Store` 结尾。(比如 `useUserStore`，`useCartStore`，`useProductStore`)
// 第一个参数是你的应用中 Store 的唯一 ID。
export const useTabStore = defineStore(
  'TabState',
  {
  state: ():TabsState => ({
    tabList: [
      {
        title: '首页',
        path: '/home',
        icon: 'HomeFilled'
      }
    ]
  }),
  getters: {},
  actions: {
    addTabs(tabItem: TabsMenuProps){
      // 先排除重复
      if (this.tabList.every(item => item.path !== tabItem.path )) {
        this.tabList.push(tabItem);
      }
    },
    // 清除tabs
    clearTabs(){
      this.tabList = [
        {
          title: '首页',
          path: '/home',
          icon: 'HomeFilled'
        }
      ]
    }
  },
  // 持久化
  persist: true
})