<template>
  <div class="order-form">
    <el-card shadow="hover" v-for="item in countData" :key="item.name">
      <el-icon :style="{ backgroundColor: `${item.color}` }" :size="24" color="#fff">
        <!-- 动态组件:报错未解决 -->
        <!-- <component :is="item.component"></component> -->
        <SuccessFilled />
      </el-icon>
      <div class="detail">
        <p class="price">￥&nbsp;{{ item.value }}</p>
        <p class="name">{{ item.name }}</p>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import type { CountData } from "@/interface/index";
import { SuccessFilled } from '@element-plus/icons-vue'

const props = defineProps({
  countData: Array<CountData>
})
</script>

<style lang="less" scoped>
.order-form {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  .el-card {
    width: 32%;
    margin-bottom: 10px;

    :deep(.el-card__body) {
      display: flex;
      align-items: center;
      padding: 0;
      border: none;
    }

    .el-icon {
      width: 80px;
      height: 80px;
    }

    .detail {
      margin-left: 30px;
      text-align: center;

      .price {
        font-size: 28px;
      }

      .name {
        font-size: 14px;
        color: #999;
      }
    }
  }
}
</style>