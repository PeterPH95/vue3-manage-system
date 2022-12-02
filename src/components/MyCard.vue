<template>
  <div class="order-form">
    <el-card shadow="hover" v-for="item in countData" :key="item.name">
      <el-icon :style="{ backgroundColor: `${item.color}` }" :size="24" color="#fff">
        <component :is="tabs[item.component]"></component>
      </el-icon>
      <div class="detail">
        <p class="price">￥&nbsp;{{ item.value }}</p>
        <p class="name">{{ item.name }}</p>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import type { CountData } from "@/interface/dataType";
import { SuccessFilled, Star, Goods } from '@element-plus/icons-vue'

defineProps({
  countData: Array<CountData>
})

const tabs = {
  'SuccessFilled':SuccessFilled,
  'Star': Star,
  'Goods': Goods
}
</script>

<style lang="less" scoped>
.order-form {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  .el-card {
    width: 32%;
    margin-bottom:15px;

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