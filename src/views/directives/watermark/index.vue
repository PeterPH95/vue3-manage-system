<template>
  <div class="content-box" v-waterMarker="{ text: 'çæææ', textColor: 'rgba(84, 92, 100, 0.6)' }">
    <div class="text"> ð æ°´å°æä»¤ ð</div>
  </div>
</template>

<script lang="ts" setup>
import type { DirectiveBinding } from '@vue/runtime-core';
/**
 * éæ±ï¼æ·»å æ°´å°
 * 
 * æè·¯ï¼è®¾ç½®å½åèæ¯å¾ç
 * 
 * æ¹æ³ï¼canvas
 *  1ãä½¿ç¨ canvas ç¹æ§çæ base64 æ ¼å¼çå¾çæä»¶ï¼è®¾ç½®å¶å­ä½å¤§å°ï¼é¢è²ç­
 *  2ãå°å¶è®¾ç½®ä¸ºèæ¯å¾ç
 * 
 * ä½¿ç¨ç¤ºä¾ï¼
 * <div v-waterMarker="{text:'çæææ',textColor:'rgba(180, 180, 180, 0.4)'}"></div>
 */

/**
 * @param str æ°´å°æå­åå®¹
 * @param parentNode éè¦å æ°´å°çåç´ 
 * @param font å­ä½
 * @param textColor æå­é¢è²
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
@import '../common.less';
</style>