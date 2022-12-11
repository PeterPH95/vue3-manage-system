<template>
  <div class="content-box">
    <div class="text"> 🍇 防抖指令 🍓</div>
    <el-input class="input" v-model="delay" type="number" style="width: 500px">
      <template #append>
        <el-button class="btn" v-debounce> 防抖按钮--延时{{ delay }}s </el-button>
      </template>
    </el-input>
  </div>
</template>

<script lang="ts" setup>
import { ElMessage } from 'element-plus';
import { ref } from 'vue';

interface ElType extends HTMLElement {
  // 使防抖函数唯一，便于后续移除事件回调函数
	__handleClick__: () => any;
}

const delay = ref<number>(1)

const msg = () => {
  // 防止自动执行
  return ElMessage({ type: "success", message: "防抖成功" })
}

const debounce = function (fn: Function, delay: number = 1000) {
  let timer: any = null;
  return function (this: any, ...args: any[]) {
    let context = this;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, delay)
  }
}


// 指令核心
const vDebounce = {
  mounted(el: ElType) {
    el.__handleClick__ = debounce(msg, delay.value * 1000);
    el.addEventListener("click", el.__handleClick__)
  },
  updated(el: ElType) {
    // 清除之前的事件
    el.removeEventListener("click", el.__handleClick__)
    // 更新el上的函数
    el.__handleClick__ = debounce(msg, delay.value * 1000);
    el.addEventListener("click", el.__handleClick__)
  },
  beforeUnMount(el: ElType) {
    el.removeEventListener("click", el.__handleClick__)
  }
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
  .input {
    position: absolute;
    left: 50%;
    top: 30%;
    transform: translateX(-50%);
  }
}
</style>