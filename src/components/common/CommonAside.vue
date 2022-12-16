<template>
  <el-menu
    default-active="1"
    class="el-menu-vertical-demo"
    :collapse="globalStore.isCollapse"
  >
    <!-- 标题 -->
    <h1>{{ globalStore.isCollapse ? '后台':'后台管理系统'}}</h1>
    <el-scrollbar style="overflow-x: hidden;">
      <el-menu-item :index="item.path" v-for="item in hasNoChildren()" :key="item.path"  @click="clickMenu(item)">
      <el-icon>
        <component :is="components[item.meta.icon]"></component>
      </el-icon>
      <template #title>
        {{item.meta.title}}
      </template>
      </el-menu-item>
      <el-sub-menu :index="item.meta.title" v-for="item in hasChildren()" :key="item.path">
        <template #title>
          <el-icon>
            <component :is="components[item.meta.icon]"></component>
          </el-icon>
          <span>{{item.meta.title}}</span>
        </template>
        <!-- 子菜单 -->
          <el-menu-item :index="subItem.path" v-for="subItem in item.children" :key="item.meta.title"  @click="clickMenu(subItem)">
            <el-icon>
              <component :is="components[subItem.meta.icon]"></component>
            </el-icon>
            {{subItem.meta.title}}
          </el-menu-item>
      </el-sub-menu>
    </el-scrollbar>
  </el-menu>
</template>

<script lang='ts' setup>
import { HomeFilled, Avatar, Menu, Apple, Orange, Briefcase, Stamp, Postcard, Grape, Cherry, Watermelon } from '@element-plus/icons-vue';
import { useTabStore } from "@/stores/modules/tab";
import { useAuthStore } from "@/stores/modules/auth";
import { useGlobalStore } from "@/stores";
import { onBeforeMount, computed } from 'vue';
import { useRouter } from 'vue-router';

const components = {
  'HomeFilled':HomeFilled,
  'Avatar': Avatar,
  'Menu': Menu,
  'Postcard': Postcard,
  'Briefcase': Briefcase,
  'Stamp': Stamp,
  'Apple': Apple,
  'Orange': Orange,
  'Grape': Grape,
  'Watermelon': Watermelon,
  'Cherry': Cherry
}

const router = useRouter();
const tabStore = useTabStore();
const authStore = useAuthStore();
const globalStore = useGlobalStore();

// 计算属性而不是响应式
const menuList = computed(() => authStore.authMenuList)

const hasNoChildren = function(): Menu[] {
  return menuList.value.filter(item => !item.children);
}

const hasChildren = function(): Menu[] {
  return menuList.value.filter(item => item.children)
}

const clickMenu = function(params: Menu): void {
  // console.log(params);
  tabStore.addTabs({title: params.meta.title, path: params.path, icon: params.meta.icon})
  router.push(params.path);
}
</script>

<style lang="less" scoped>
.el-menu {
  // 撑开侧边栏,尽量使用%，少用vh
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