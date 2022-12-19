<template>
  <div class="header-container">
    <div class="l-content">
      <el-icon @click="handleMenu" class="collapseIcon" >
        <component v-if="isCollapse" :is="components['Fold']"></component>
        <component v-else :is="components['Expand']"></component>
      </el-icon>
      <div class="bread">
        <el-breadcrumb :separator-icon="ArrowRight">
          <el-breadcrumb-item :to="{ path: '/home' }" key="/home" v-if="tabLists[0].meta.title !== '首页'">
            <el-icon>
              <HomeFilled />
            </el-icon>
            <span>首页</span>
          </el-breadcrumb-item>
          <el-breadcrumb-item 
            v-for="item in tabLists" 
            :to="{ path: item.path }"
          >
            <el-icon>
              <component :is="components[item.meta.icon]"></component>
            </el-icon>
            {{ item.meta.title }}
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="r-content">
      <!-- 背景选择 -->
      <div>
        <button class="toggle-color-mode-button" @click="changeBgColor()">
          <!-- sun -->
          <img src="@/assets/images/sun.svg" class="icon" v-if="bg">
          <!-- moon -->
          <img src="@/assets/images/moon.svg" class="icon" v-else>
        </button>
      </div>
      <!-- 用户信息 -->
      <div class="user">
        <el-dropdown @command="handleExit">
          <span class="el-dropdown-link">
            <img :src="getImageUrl('user')" alt="头像" />
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="a">个人信息</el-dropdown-item>
              <el-dropdown-item command="b">退出</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
    <!-- 退出提示 -->
  </div>
</template>

<script lang="ts" setup>
import { useGlobalStore } from "@/stores";
import { useAuthStore } from "@/stores/modules/auth";
import { useRouter, useRoute } from 'vue-router';
import { resetRouter } from "@/router";
import { HomeFilled, Avatar, Menu, Postcard, Briefcase, Stamp, Apple, Orange, Grape, Watermelon, Cherry, ArrowDown, ArrowRight,Fold,Expand } from "@element-plus/icons-vue";
import { computed, ref } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";


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
  'Cherry': Cherry,
  'Fold': Fold, 
  'Expand': Expand 
}

const router = useRouter();
// 获取面包屑
const route = useRoute();
const globalStore = useGlobalStore();
const authStore = useAuthStore();

// route.matched.path 获取当前路由地址
const tabLists = computed(() => authStore.breadcrumbGet[route.matched[route.matched.length-1].path]);
const bg = computed(() => globalStore.bg);

// 退出的弹窗
const exitDialog = ref(false);

// 切换背景色
function changeBgColor() {
  globalStore.changeBg();
  // 修改整体背景的操作
  console.log(globalStore.bg);
}

// 菜单折叠状态
const isCollapse = computed(() => globalStore.isCollapse);

// 折叠菜单栏
function handleMenu() {
  globalStore.collapseMenu()
  // console.log(globalStore.isCollapse);
}

// 静态资源打包
function getImageUrl(name:string) {
  const imgUrl = new URL(`../../assets/images/${name}.png`, import.meta.url).href
  return imgUrl;
}

// 
const handleExit = (command: string | number | object) => {
  // 退出
  if (command == "b") {
    // 显示退出的弹窗
    ElMessageBox.confirm(
      '你确定要退出登录吗？',
      '提醒',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }
    ).then( () => {
      // 1. 重置路由
      resetRouter();
      // 2. 清除 token
      globalStore.setToken("");
      // 3. 返回首页
      router.push('/login');
      // 4. 退出成功提示
      ElMessage({
        message: '退出登录成功！',
        type: 'success',
      })
    })
  }else {
    console.log('个人信息展示');
  }
}

</script>

<style lang="less" scoped>
.header-container {
  height: 100%;
  padding: 0 20px;
  background-color: #545c64;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .l-content {
    display: flex;
    justify-content: center;
    align-items: center;

    .collapseIcon {
      font-size: 22px;
      color: #f3f5f5cb;
      cursor: pointer;
      transition: all 0.3s;
    }

    .el-breadcrumb {
      margin-left: 20px;
      
      :deep(.el-breadcrumb__inner) {
        display: flex;
        align-items: center;
        font-size: 15px;
        font-weight: normal;
        color: #f3f5f5cb;
        .el-icon {
          margin-right: 6px;
        }
      }
      :deep(.el-icon){
        color: #f3f5f5cb;
      }
    }
  }

  .r-content {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .toggle-color-mode-button {
      display: flex;
      background: none;
      cursor: pointer;

      .icon {
        width: 1.25rem;
        height: 1.25rem;
      }
    }

    .user {
      margin-left: 20px;
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

// 当前激活的标签
.active {
  :deep(.el-breadcrumb__inner) {
    color: rgb(90, 177, 239);
  }
}
</style>