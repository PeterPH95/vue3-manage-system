<template>
  <div class="content-box">
    <div class="text"> ð å¾çæå è½½(è¯·ä¸æ) ð</div>
    <div class="img-container">
      <img v-lazyImg="item" @error="showError(index)" v-for="(item, index) in srcList" alt="å¾çæ­£å¨å è½½ï¼è¯·ç¨å...">
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { DirectiveBinding } from '@vue/runtime-core';
import { ElMessage } from 'element-plus';
/**
 * éæ±ï¼å¾çæå è½½
 * æè·¯ï¼å½å¾ççä½ç½®åºç°å¨è§å£ä¸­ï¼åå è½½å¾ç
 * 
 * æ­¥éª¤ï¼
 *  1ãçå¬å¾ççä½ç½®
 *  2ãä¿®æ¹å¾çç src
 */

// å¾ççsrc
const srcList = [
  'https://w.wallhaven.cc/full/yj/wallhaven-yj971x.1jpg',
  'https://w.wallhaven.cc/full/vq/wallhaven-vqg5wp.jpg',
  'https://w.wallhaven.cc/full/9m/wallhaven-9mjoy1.png'
]

// å¾çå è½½å¤±è´¥
const showError = (index: number) => {
  return ElMessage.error(`ç³ç³ï¼å¾ç ${index+1} å è½½å¤±è´¥äºï¼`)
}

// æä»¤æ ¸å¿
const vLazyImg = {
  mounted(el: HTMLImageElement, binding: DirectiveBinding) {
    const observer = new IntersectionObserver(([{isIntersecting}]) => {
      if (isIntersecting) {
        el.src = binding.value;
        observer.unobserve(el);
      }      
    });
    observer.observe(el);
  }
}

</script>

<style lang="less" scoped>
@import '../common.less';

.content-box {
  background-color: #fff;
  text-align: center;
  position: relative;
  height: 2000px;

  .img-container {
    position: absolute;
    top: 52%;
    left: 50%;
    transform: translateX(-50%);

    img {
      display: block;
      margin: 10px;
      height: 200px;
      width: 350px;
      background-color: #545c64;
    }
  }

}
</style>