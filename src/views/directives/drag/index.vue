<template>
  <div class="content-box">
		<div class="text"> 🍇 拖拽指令 🍓</div>
		<div v-draggable class="drag-box"></div>
	</div>
</template>

<script lang="ts" setup>
interface ElType extends HTMLElement {
  parentNode: any;
}

/**
 * 需求：实现拖拽
 * 
 * 思路：
 *  1、需设置子绝父相的定位
 *  2、鼠标按下：记录当前的位置
 *  3、鼠标移动，记录鼠标横向和纵向的距离变化
 *  4、鼠标松开，完成一次拖拽
 */
const vDraggable = {
  beforeMount(el: ElType) {
    el.style.cursor = "move";
    el.onmousedown = function(e) {
      // 记录按下鼠标时的坐标位置
      let disX = e.pageX - el.offsetLeft;
      let disY = e.pageY - el.offsetTop;
      el.onmousemove = function (e) {
        // 计算鼠标的位移量 + 盒子原来的坐标 == 盒子的新位置
        let x = e.pageX - disX;
        let y = e.pageY - disY;
        // 计算最大坐标位置
        // 最大坐标位置 == 父盒子的宽高 - 子盒子本身的宽高
        let maxX = el.parentNode.offsetWidth - el.offsetWidth;
        let maxY = el.parentNode.offsetHeight - el.offsetHeight;
        // 判断是否超出父元素边界，修正位移
        x = x < 0 ? 0 : (x > maxX ? maxX : x)
        y = y < 0 ? 0 : (y > maxY ? maxY : y)
        
        // 跟随移动
        el.style.left = x + "px";
        el.style.top = y + "px";
      };
      // 解除事件回调函数
      el.onmouseup = function () {
        el.onmousemove = el.onmouseup = null;
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import '../common.less';

.content-box {
	position: relative;
  
	.drag-box {
		position: absolute;
		top: 100px;
    left: 100px;
		width: 300px;
		height: 300px;
		font-size: 23px;
    line-height: 300px;
		font-weight: bold;
		color: #fff;
		background: skyblue;
		border-radius: 50%;
	}
}

</style>