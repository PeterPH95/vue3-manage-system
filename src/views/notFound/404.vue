<template>
  <div>
    <h1>404</h1>
    <el-button type="primary" @click="router.push({name: 'home'})">回到主页</el-button>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
const router = useRouter();

</script>

<style lang="less" scoped>

</style>