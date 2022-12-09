<template>
  <el-menu
    default-active="1"
    class="el-menu-vertical-demo"
    :collapse="tabStore.isCollapse"
  >
    <!-- 标题 -->
    <h1>{{ tabStore.isCollapse ? '后台':'后台管理系统'}}</h1>
    <el-menu-item :index="item.path" v-for="item in hasNoChildren()" :key="item.label"  @click="clickMenu(item)">
      <el-icon>
        <component :is="components[item.icon]"></component>
      </el-icon>
      <template #title>
        {{item.label}}
      </template>
    </el-menu-item>
    <el-sub-menu :index="item.label" v-for="item in hasChildren()" :key="item.label">
      <template #title>
        <el-icon>
          <component :is="components[item.icon]"></component>
        </el-icon>
        <span>{{item.label}}</span>
      </template>
			<!-- 子菜单 -->
        <el-menu-item :index="subItem.path" v-for="subItem in item.children" :key="subItem.label"  @click="clickMenu(subItem)">
					<el-icon>
            <component :is="components[subItem.icon]"></component>
          </el-icon>
					{{subItem.label}}
				</el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script lang='ts' setup>
import { HomeFilled, Avatar, Menu, Guide, Apple, Orange } from '@element-plus/icons-vue';
import { useTabStore } from "@/stores/tab";
import { useAuthStore } from "@/stores/modules/auth";
import { ref, onBeforeMount } from 'vue';
import type { Menu as MenuType } from '@/interface/routeType';
import { useRouter } from 'vue-router';

const components = {
  'HomeFilled':HomeFilled,
  'Avatar': Avatar,
  'Menu': Menu,
  'Guide': Guide,
  'Apple': Apple,
  'Orange': Orange
}

const tabStore = useTabStore();
const router = useRouter();
const authStore = useAuthStore()

const menuList: MenuType[] | any = ref([])

const hasNoChildren = function(): MenuType[] {
  return menuList.value.filter((item: { children: any; }) => !item.children);
}

const hasChildren = function(): MenuType[] {
  return menuList.value.filter((item: { children: any; }) => item.children);
}

const clickMenu = function(parmas: MenuType): void {
  // console.log(parmas);
  router.push(parmas.path);
}

const getMenuList = () => {
  // let myMenu = JSON.parse(Cookies.get('menu'));
  let myMenu = authStore.authMenuListGet;
  menuList.value = myMenu;
}

onBeforeMount(()=>{
  getMenuList();
})

</script>

<style lang="less" scoped>
.el-menu {
  // 撑开侧边栏
  height: 100vh;
  h1 {
    height: 60px;
    line-height: 60px;
    font-size: 20px;
    text-align: center;
    font-family: "幼圆";
    font-weight: bold;
    color: #fff;
    background-color: #545c64;
  }
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}
</style>