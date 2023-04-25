<template>
  <div class="content-box">
    <div class="text"> 🍇 图片懒加载(请下拉) 🍓</div>
    <div class="img-container">
      <img v-lazyImg="item" @error="showError(index)" v-for="(item, index) in srcList" alt="图片正在加载，请稍后...">
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { DirectiveBinding } from '@vue/runtime-core';
import { ElMessage } from 'element-plus';
/**
 * 需求：图片懒加载
 * 思路：当图片的位置出现在视口中，再加载图片
 * 
 * 步骤：
 *  1、监听图片的位置
 *  2、修改图片的 src
 */

// 图片的src
const srcList = [
  'https://w.wallhaven.cc/full/yj/wallhaven-yj971x.1jpg',
  'https://w.wallhaven.cc/full/vq/wallhaven-vqg5wp.jpg',
  'https://w.wallhaven.cc/full/9m/wallhaven-9mjoy1.png'
]

// 图片加载失败
const showError = (index: number) => {
  return ElMessage.error(`糟糕！图片 ${index+1} 加载失败了！`)
}

// 指令核心
const vLazyImg = {
  mounted(el: HTMLImageElement, binding: DirectiveBinding) {
    const observer = new IntersectionObserver(([{isIntersecting}]) => {
      if (isIntersecting) {// 图片出现在视口时
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