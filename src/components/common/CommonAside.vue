<template>
  <el-menu
    default-active="1"
    class="el-menu-vertical-demo"
    :collapse="tabStore.isCollapse"
    @open="handleOpen"
    @close="handleClose"
  >
    <!-- 标题 -->
    <h1>{{ tabStore.isCollapse ? '后台':'后台管理系统'}}</h1>
    <el-menu-item :index="item.path" v-for="item in hasNoChildren()" :key="item.label">
      <el-icon>
        <component :is="components[item.component]"></component>
      </el-icon>
      <template #title>
        {{item.label}}
      </template>
    </el-menu-item>
    <el-sub-menu :index="item.label" v-for="item in hasChildren()" :key="item.label">
      <template #title>
        <el-icon>
          <component :is="components[item.component]"></component>
        </el-icon>
        <span>{{item.label}}</span>
      </template>
			<!-- 子菜单 -->
        <el-menu-item :index="subItem.path" v-for="subItem in item.children" :key="subItem.label">
					<el-icon>
            <component :is="components[item.component]"></component>
          </el-icon>
					{{subItem.label}}
				</el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script lang='ts' setup>
import { HomeFilled, Avatar, Menu, Guide, Apple, Orange } from '@element-plus/icons-vue';
import { useTabStore } from "@/stores/tab";
import { ref, onBeforeMount } from 'vue';
import Cookies from 'js-cookie';
import type { Menu as MenuType } from '@/interface/routeType'

const components = {
  'HomeFilled':HomeFilled,
  'Avatar': Avatar,
  'Menu': Menu,
  'Guide': Guide,
  'Apple': Apple,
  'Orange': Orange
}

const tabStore = useTabStore();

const menuList: MenuType[] | any = ref([])

const hasNoChildren = function(): MenuType[] {
  return menuList.value.filter((item: { children: any; }) => !item.children);
}

const hasChildren = function(): MenuType[] {
  return menuList.value.filter((item: { children: any; }) => item.children);
}

const handleOpen = (key: string, keyPath: string[]) => {
  console.log('open', key, keyPath);
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
}

const getMenuList = () => {
  let myMenu = JSON.parse(Cookies.get('menu'));
  menuList.value = myMenu
}

onBeforeMount(()=>{
  getMenuList();
})

</script>

<style lang="less" scoped>
.el-menu {
  // 撑开侧边栏
  height: 100%;
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