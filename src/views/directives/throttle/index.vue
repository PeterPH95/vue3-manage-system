<template>
  <div class="content-box">
    <div class="text"> ๐ ่ๆตๆไปค ๐</div>
    <el-input class="input" v-model="delay" type="number" style="width: 500px">
      <template #append>
        <el-button class="btn" v-throttle> ่ๆตๆ้ฎ--้ด้&nbsp;<i style="color: red;font-size: 1.2em;">{{ delay }}</i>&nbsp;s </el-button>
      </template>
    </el-input>
  </div>
</template>

<script lang="ts" setup>
import { ElMessage } from 'element-plus';
import { ref } from 'vue';

interface ElType extends HTMLElement {
  __handleClick: any;
}

const delay = ref<number>(1)

const msg = () => {
  // ้ฒๆญข่ชๅจๆง่ก
  return ElMessage({ type: "success", message: "่ๆตๆๅ๏ผ๐๐๐" })
}

const throttle = function (fn: Function, delay: number = 1000) {
  let previous = Date.now();
  return function (this: any, ...args: any[]) {
    const context = this;
    let current = Date.now();
    if (current - previous < delay ) {
      return;
    }else {
      fn.apply(context, args);
      previous = current;
    }
  }
}

// ๆไปคๆ ธๅฟ
const vThrottle = {
  mounted(el: ElType) {
    el.__handleClick = throttle( msg,delay.value * 1000 );
    el.addEventListener("click", el.__handleClick);
  },
  updated(el: ElType) {
    el.removeEventListener("click", el.__handleClick);
    el.__handleClick = throttle( msg,delay.value * 1000 );
    el.addEventListener("click", el.__handleClick);
  },
  beforeUnmount(el: ElType) {
    el.removeEventListener("click", el.__handleClick);
  },
}

</script>

<style lang="less" scoped>
@import '../common.less';
.content-box {
  position: relative;
  .input {
    position: absolute;
    left: 50%;
    top: 30%;
    transform: translateX(-50%);
  }
}
</style>