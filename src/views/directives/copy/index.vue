<template>
  <div class="content-box">
    <div class="text"> 🍇 复制指令 🍓</div>
    <div class="box-content">
			<el-input placeholder="请输入内容" v-model="data" style="width: 500px">
				<template #append>
					<el-button v-copy="data">点我复制</el-button>
				</template>
			</el-input>
		</div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import type { DirectiveBinding } from "vue";

import { ElMessage } from "element-plus";

interface ElType extends HTMLElement {
	copyData: string | number;
	__handleClick__: () => any;
}

const data = ref<string>("我是被复制的内容 🍒");

const vCopy = {
  /**
   * 
   * @param el 指令所绑定的元素，可以用来直接操作 DOM。
   * @param binding 一个v-directive绑定的对象，value：指令的绑定值
   */
  mounted(el: ElType, binding: DirectiveBinding) {
    el.copyData = binding.value;
    el.__handleClick__ = handleClick;
    el.addEventListener("click", el.__handleClick__);
  },
  updated(el: ElType, binding: DirectiveBinding) {
    el.copyData = binding.value;
  },
  beforeUnMount(el: ElType) {
    el.removeEventListener("click", el.__handleClick__);
  }
}

/**
 * 
 * @param this 绑定的DOM，这里是 button
 */
function handleClick(this:any) {
  try {
    // 判断是否安全域
    if (navigator.clipboard && window.isSecureContext) {
      // 代替 else 中的兼容方式，需要在安全域下才行
      // 貌似实现复制的底层原理与 else 相同
      navigator.clipboard.writeText(this.copyData.toLocaleString());
    } else {
      // 浏览器将不支持
      // 创建text area
      const input = document.createElement("input");
      input.value = this.copyData.toLocaleString();// 转为本地语言环境
      document.body.appendChild(input);
      // 选中文本框中的所有文本
      input.select();
      // 拷贝当前选中内容到剪贴板
      document.execCommand("Copy");
      document.body.removeChild(input);
    }
  } catch (error) {
    ElMessage.error("浏览器不支持，复制失败！")
    return;
  };
  
	ElMessage({
		type: "success",
		message: "复制成功！"
	});
}

</script>

<style lang="less" scoped>
@import '../common.less';

.content-box {
  position: relative;
  .box-content {
    position: absolute;
    left: 50%;
    top: 30%;
    transform: translateX(-50%);
  }
}
</style>