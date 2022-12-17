<template>
  <el-container>
    <!--  width="auto" 在折叠菜单时需这么设置 -->
    <el-aside>
      <!-- 侧栏 -->
      <CommonAside />
    </el-aside>
    <el-container>
      <el-header>
        <!-- 头部 -->
        <CommonHeader />
      </el-header>
      <!-- 面包屑 -->
      <!-- <CommonTag /> -->
      <el-main>
        <!-- 路由显示的部分 -->
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
// 新版都不用导入了吗？？？自动导入插件
// import CommonHeader from "../components/CommonHeader.vue";
// import CommonAside from "../components/CommonAside.vue";

</script>

<style lang='less' scoped>
.el-container {
  height: 100%;
  width: 100%;
  // 底色
  background-color: #f5f5f5;

  .el-aside {
    width: auto;
    overflow: inherit;
    // 侧边栏底色
		background-color: #fff;
  }

  .el-header {
    padding: 0;
  }

  .el-main {
    padding: 20px;
  }
}
</style>