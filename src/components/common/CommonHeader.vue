<template>
  <div class="header-container">
    <div class="l-content">
      <el-button @click="handleMenu">
        <el-icon><Menu /></el-icon>
      </el-button>
    </div>
    <div class="r-content">
      <!-- 背景选择 -->
      <div>
        <button class="toggle-color-mode-button" @click="changeBgColor()">
          <!-- sun -->
          <svg
            :style="tabStore.bg ? 'display: none' : ''"
            class="icon"
            focusable="false"
            viewBox="0 0 32 32"
          >
            <path
              d="M16 12.005a4 4 0 1 1-4 4a4.005 4.005 0 0 1 4-4m0-2a6 6 0 1 0 6 6a6 6 0 0 0-6-6z"
              fill="currentColor"
            ></path>
            <path
              d="M5.394 6.813l1.414-1.415l3.506 3.506L8.9 10.318z"
              fill="currentColor"
            ></path>
            <path d="M2 15.005h5v2H2z" fill="currentColor"></path>
            <path
              d="M5.394 25.197L8.9 21.691l1.414 1.415l-3.506 3.505z"
              fill="currentColor"
            ></path>
            <path d="M15 25.005h2v5h-2z" fill="currentColor"></path>
            <path
              d="M21.687 23.106l1.414-1.415l3.506 3.506l-1.414 1.414z"
              fill="currentColor"
            ></path>
            <path d="M25 15.005h5v2h-5z" fill="currentColor"></path>
            <path
              d="M21.687 8.904l3.506-3.506l1.414 1.415l-3.506 3.505z"
              fill="currentColor"
            ></path>
            <path d="M15 2.005h2v5h-2z" fill="currentColor"></path>
          </svg>
          <!-- moon -->
          <svg
            :style="tabStore.bg ? '' : 'display: none'"
            class="icon"
            focusable="false"
            viewBox="0 0 32 32"
          >
            <path
              d="M13.502 5.414a15.075 15.075 0 0 0 11.594 18.194a11.113 11.113 0 0 1-7.975 3.39c-.138 0-.278.005-.418 0a11.094 11.094 0 0 1-3.2-21.584M14.98 3a1.002 1.002 0 0 0-.175.016a13.096 13.096 0 0 0 1.825 25.981c.164.006.328 0 .49 0a13.072 13.072 0 0 0 10.703-5.555a1.01 1.01 0 0 0-.783-1.565A13.08 13.08 0 0 1 15.89 4.38A1.015 1.015 0 0 0 14.98 3z"
              fill="currentColor"
            ></path>
          </svg>
        </button>
      </div>
      <!-- 语言选择 -->
      <div class="langeuage">
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            选择语言
            <el-icon class="el-icon--right">
              <ArrowDown />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="a">简体中文</el-dropdown-item>
              <el-dropdown-item command="b">English</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <!-- 用户信息 -->
      <div class="user">
        <el-dropdown>
          <span class="el-dropdown-link">
            <img :src="getImageUrl('user')" alt="头像" />
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>个人信息</el-dropdown-item>
              <el-dropdown-item>退出</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import {Menu, ArrowDown} from '@element-plus/icons-vue'
import { useTabStore } from "../../stores/tab";

const tabStore = useTabStore()

// 切换背景色
function changeBgColor(params: void) {
  tabStore.changeBg();
  // 修改整体背景的操作
  console.log(tabStore.bg);
}

// 折叠菜单栏
function handleMenu(params: void) {
  tabStore.collapseMenu()
  console.log(tabStore.isCollapse);
  
}

// 静态资源打包
function getImageUrl(name:string) {
  const imgUrl = new URL(`../../assets/images/${name}.png`, import.meta.url).href
  return imgUrl;
}

const handleCommand = (command: string | number | object) => {
  console.log(`click on item ${command}`);
};
</script>

<style lang="less" scoped>
.header-container {
  height: 100%;
  padding: 0 20px;
  background-color: #545c64;
  display: flex;
  justify-content: space-between;
  align-items: center;

  // .l-content {
  // }

  .r-content {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .toggle-color-mode-button {
      display: flex;
      margin: auto;
      margin-left: 1rem;
      border: 0;
      background: none;
      color: #f3f4f5;
      opacity: 0.8;
      cursor: pointer;

      .icon {
        width: 1.25rem;
        height: 1.25rem;
      }
    }

    .langeuage {
      margin: 5px 20px 0 20px;
      .el-dropdown-link {
        color: #c9c5c5;
      }
    }

    .user {
      .el-dropdown-link {
        img {
          height: 40px;
          width: 40px;
          border-radius: 50%;
        }
      }
    }
  }

  .el-dropdown-link {
    cursor: pointer;
    color: var(--el-color-primary);
    display: flex;
    align-items: center;
  }
}
</style>