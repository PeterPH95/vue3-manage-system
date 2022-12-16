<template>
  <div class="content-box" v-waterMarker="{ text: '版权所有', textColor: 'rgba(84, 92, 100, 0.6)' }">
    <div class="text"> 🍇 水印指令 🍓</div>
  </div>
</template>

<script lang="ts" setup>
import type { DirectiveBinding } from '@vue/runtime-core';
/**
 * 需求：添加水印
 * 
 * 思路：设置当前背景图片
 * 
 * 方法：canvas
 *  1、使用 canvas 特性生成 base64 格式的图片文件，设置其字体大小，颜色等
 *  2、将其设置为背景图片
 * 
 * 使用示例：
 * <div v-waterMarker="{text:'版权所有',textColor:'rgba(180, 180, 180, 0.4)'}"></div>
 */

/**
 * @param str 水印文字内容
 * @param parentNode 需要加水印的元素
 * @param font 字体
 * @param textColor 文字颜色
 */
const addWaterMarker = (str: string, parentNode: any, font: any, textColor: string) => {
  let can: HTMLCanvasElement = document.createElement("canvas");
  parentNode.appendChild(can);
  can.width = 215;
  can.height = 140;
  can.style.display = "none";
  let cans = can.getContext("2d") as CanvasRenderingContext2D;
  cans.rotate((-30 * Math.PI) / 180);
  cans.font = font || "16px Microsoft JhengHei";
  cans.fillStyle = textColor || "rgba(180, 180, 180, 0.3)";
  // cans.textAlign = "left";
  // cans.textBaseline = "Middle" as CanvasTextBaseline;
  cans.fillText(str, can.width / 10, can.height / 2);
  parentNode.style.backgroundImage = "url(" + can.toDataURL("image/png") + ")";
}
  
const vWaterMarker = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    addWaterMarker(binding.value.text, el, binding.value.font, binding.value.textColor);
  }
}

</script>

<style lang="less" scoped>
.content-box {
  text-align: center;
  background-color: #fff;
  height: 100%;
  .text {
    font-size: 20px;
    padding: 5px 0;
    font-family: '幼圆';
    font-weight: bold;
    background-color: #545c64;
    color: #fff;
  }
}
</style>