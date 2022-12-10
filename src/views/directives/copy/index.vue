<template>
  <div class="content-box">
    <div class="text"> 🍇 复制指令 🍓</div>
    <div class="box-content">
			<el-input placeholder="请输入内容" v-model="data" style="width: 500px">
				<template #append>
					<el-button v-copy="data">复制</el-button>
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
	__handleClick__: any;
}

const data = ref<string>("我是被复制的内容 🍒 🍉 🍊");

const vCopy = {
  mounted(el: ElType, binding: DirectiveBinding) {
    el.copyData = binding.value;
    el.addEventListener("click", handleClick);
  },
  updated(el: ElType, binding: DirectiveBinding) {
    el.copyData = binding.value;
  },
  beforeUnMount(el: ElType) {
    el.removeEventListener("click", el.__handleClick__);
  }
}

function handleClick(this:any) {
  const input = document.createElement("input");
	input.value = this.copyData.toLocaleString();
	document.body.appendChild(input);
	input.select();
	document.execCommand("Copy");
	document.body.removeChild(input);
	ElMessage({
		type: "success",
		message: "复制成功"
	});
}

</script>

<style lang="less" scoped>
.content-box {
  text-align: center;
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
  .box-content {
    position: absolute;
    left: 50%;
    top: 30%;
    transform: translateX(-50%);
  }
}
</style>