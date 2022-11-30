<template>
  <div class="common-layout">
    <el-container>
      <!--  width="auto" 在折叠菜单时需这么设置 -->
      <el-aside width="auto">
        <!-- 侧栏 -->
        <CommonAside />
      </el-aside>
      <el-container>
        <el-header>
          <!-- 头部 -->
          <CommonHeader />
        </el-header>
        <!-- 面包屑 -->
        <CommonTag />
        <el-main>
          <!-- 路由显示的部分 -->
    			<router-view />
				</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
// 新版都不用导入了吗？？？
// import CommonHeader from "../components/CommonHeader.vue";
// import CommonAside from "../components/CommonAside.vue";

</script>

<style lang='less' scoped>
.common-layout {
	// height: 100vh;
  background-color: #f5f5f5;
  .el-container {
    .el-header {
      padding: 0;
    }
    .el-main {
      padding: 20px;
    }
  }
}
</style>