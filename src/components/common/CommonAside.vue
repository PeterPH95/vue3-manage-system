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
        <component :is="item.component"></component>
      </el-icon>
      <template #title>
        {{item.label}}
      </template>
    </el-menu-item>
    <el-sub-menu :index="item.label" v-for="item in hasChildren()" :key="item.label">
      <template #title>
        <el-icon>
          <component :is="item.component"></component>
        </el-icon>
        <span>{{item.label}}</span>
      </template>
			<!-- 子菜单 -->
        <el-menu-item :index="subItem.path" v-for="subItem in item.children" :key="subItem.label">
					<el-icon>
            <component :is="subItem.component"></component>
          </el-icon>
					{{subItem.label}}
				</el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script lang='ts' setup>
  import { HomeFilled, Avatar, Menu, Guide, Apple, Orange } from '@element-plus/icons-vue'
  import { useTabStore } from "../../stores/tab"

  const tabStore = useTabStore()

  const menuList = [{
    path: '/home',
    name: 'home',
    label: '首页',
    component: HomeFilled,
    url: 'Home.vue'
  },
  {
    path: '/mall',
    name: 'mall',
    label: '商品管理',
    component: Avatar,
    url: 'Mall.vue'
  },
  {
    path: '/user',
    name: 'user',
    label: '用户管理',
    component: Menu,
    url: 'User.vue'
  },
  {
    label: '其他',
    name: 'more',
    component: Guide,
    children: [{
      path: '/page1',
      name: 'page1',
      label: '页面1',
      component: Apple,
      url: 'PageOne'
    },
    {
      path: '/page2',
      name: 'page2',
      label: '页面2',
      component: Orange,
      url: 'PageTwo'
    }
    ]
  }]

  const hasNoChildren = () => {
    return menuList.filter(item => !item.children)
  }

  const hasChildren = () => {
    return menuList.filter(item => item.children)
  }
  
  const handleOpen = (key: string, keyPath: string[]) => {
    console.log('open', key, keyPath)
  }
  const handleClose = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
  }

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
    color: #fff;
    background-color: #545c64;
  }
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}
</style>