<template>
  <div class="card content-box">
    <iframe src="https://cn.bing.com/" frameborder="0" class="full-iframe"></iframe>
  </div>
</template>

<script lang="ts" setup>

</script>

<style lang="less" scoped>
.full-iframe {
  width: 100%;
  height: 100%;
}

.content-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
}

.card {
  box-sizing: border-box;
  padding: 20px;
  overflow-x: hidden;
  background-color: var(--el-fill-color-blank);
  border: 1px solid var(--el-border-color-light);
  border-radius: 4px;
  box-shadow: 0 0 12px rgb(0 0 0 / 5%);
}
</style>