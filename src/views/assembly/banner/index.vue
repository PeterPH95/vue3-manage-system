<template>
  <div class="content-box">
    <div class="text"> 🍇 请求取消测试 🍓</div>
    <div class="content">
      <el-button @click="get" size="large" >发送请求</el-button>
      <h1 v-show="data" class="data">{{ data }}</h1>
    </div>
  </div>

</template>

<script lang="ts" setup>
import { getCurrentInstance, ref } from 'vue';

let data = ref<string>("")

const { proxy } = getCurrentInstance() as any

const get = async () => {
  let res = await proxy.$api.getData();
  // console.log(res);
  data.value = res.msg;
}

</script>

<style lang="less" scoped>
.content-box {
  text-align: center;
  background-color: #fff;
  height: 100%;
  position: relative;

  .text {
    font-size: 20px;
    padding: 5px 0;
    font-family: '幼圆';
    font-weight: bold;
    background-color: #545c64;
    color: #fff;
  }

  .content {
    position: absolute;
    left: 50%;
    top: 20%;
    transform: translateX(-50%);
    .data {
      margin-top: 50px;
    }
  }
}
</style>