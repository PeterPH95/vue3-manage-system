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
import { ref } from 'vue';
import { getUserList } from "@/api/modules/user";

let data = ref<string>("")

const get = async () => {
  try {
    let res = await getUserList();
    data.value = res.data.msg;
  } catch (error) {
    console.log('频繁请求，请稍后再试！');
  }
  // console.log(res);
}

</script>

<style lang="less" scoped>
@import '../common.less';

.content-box {
  position: relative;
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