<template>
  <div class="content-box">
    <div class="text"> ð é²ææä»¤ ð</div>
    <el-input class="input" v-model="delay" type="number" style="width: 500px">
      <template #append>
        <el-button class="btn" v-debounce> é²ææé®--å»¶æ¶&nbsp;<i style="color: red;font-size: 1.2em;">{{ delay }}</i>&nbsp;s </el-button>
      </template>
    </el-input>
  </div>
</template>

<script lang="ts" setup>
import { ElMessage } from 'element-plus';
import { ref } from 'vue';

interface ElType extends HTMLElement {
  // ä½¿é²æå½æ°å¯ä¸ï¼ä¾¿äºåç»­ç§»é¤äºä»¶åè°å½æ°
	__handleClick__: () => any;
}

const delay = ref<number>(1)

const msg = () => {
  // é²æ­¢èªå¨æ§è¡
  return ElMessage({ type: "success", message: "é²ææåððð" })
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


// æä»¤æ ¸å¿
const vDebounce = {
  mounted(el: ElType) {
    el.__handleClick__ = debounce(msg, delay.value * 1000);
    el.addEventListener("click", el.__handleClick__)
  },
  updated(el: ElType) {
    // æ¸é¤ä¹åçäºä»¶
    el.removeEventListener("click", el.__handleClick__)
    // æ´æ°elä¸çå½æ°
    el.__handleClick__ = debounce(msg, delay.value * 1000);
    el.addEventListener("click", el.__handleClick__)
  },
  beforeUnMount(el: ElType) {
    el.removeEventListener("click", el.__handleClick__)
  }
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