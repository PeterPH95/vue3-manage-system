<template>
  <div class="menu" :style="{ width: isCollapse ? '60px' : '210px' }">
    <!-- 标题 -->
    <div class="logo flx-center">
      <img src="@/assets/images/logo.svg" alt="logo" />
      <span v-show="!isCollapse">后台管理系统</span>
    </div>
    <el-scrollbar>
      <el-menu default-active="1" :collapse="isCollapse">
        <el-menu-item :index="item.path" v-for="item in hasNoChildren()" :key="item.path" @click="clickMenu(item)">
          <el-icon>
            <component :is="components[item.meta.icon]"></component>
          </el-icon>
          <template #title>
            {{ item.meta.title }}
          </template>
        </el-menu-item>
        <el-sub-menu :index="item.meta.title" v-for="item in hasChildren()" :key="item.path">
          <template #title>
            <el-icon>
              <component :is="components[item.meta.icon]"></component>
            </el-icon>
            <span>{{ item.meta.title }}</span>
          </template>
          <!-- 子菜单 -->
          <el-menu-item :index="subItem.path" v-for="subItem in item.children" :key="item.meta.title"
            @click="clickMenu(subItem)">
            <el-icon>
              <component :is="components[subItem.meta.icon]"></component>
            </el-icon>
            {{ subItem.meta.title }}
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script lang='ts' setup>
import { HomeFilled, Avatar, Menu, Apple, Orange, Briefcase, Stamp, Postcard, Grape, Cherry, Watermelon } from '@element-plus/icons-vue';
import { useTabStore } from "@/stores/modules/tab";
import { useAuthStore } from "@/stores/modules/auth";
import { useGlobalStore } from "@/stores";
import { onBeforeMount, computed } from 'vue';
import { useRouter } from 'vue-router';

const components = {
  'HomeFilled': HomeFilled,
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
const menuList = computed(() => authStore.authMenuList);
const isCollapse = computed(() => globalStore.isCollapse);

const hasNoChildren = function (): Menu[] {
  return menuList.value.filter(item => !item.children);
}

const hasChildren = function (): Menu[] {
  return menuList.value.filter(item => item.children)
}

const clickMenu = function (params: Menu): void {
  // console.log(params);
  tabStore.addTabs({ title: params.meta.title, path: params.path, icon: params.meta.icon })
  router.push(params.path);
}
</script>

<style lang="less" scoped>
.menu {
  display: flex;
  flex-direction: column;
  height: 100%;
  transition: all 0.3s ease;

  .el-scrollbar {
    height: calc(100% - 60px);

    .el-menu {
      overflow-x: hidden;
      border-right: none;
    }
  }

  .flx-center {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .logo {
    box-sizing: border-box;
    height: 60px;
    // border-bottom: 1px solid #282a35;
    background-color: #545c64;
    border-right: 1px solid var(--el-border-color) ;

    span {
      font-size: 21.5px;
      font-weight: bold;
      color: #dadada;
      white-space: nowrap;
    }

    img {
      width: 28px;
      object-fit: contain;
      margin-right: 6px;
    }
  }
}
</style>