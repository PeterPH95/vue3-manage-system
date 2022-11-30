<template>
  <!-- 整体使用栅格布局，分左右两列 -->
  <el-row>
    <!-- 左侧：用户区域 -->
    <el-col :span="8" class="left">
      <el-card shadow="hover" class="card1">
        <!-- 用户图 -->
        <template #header>
          <div class="user">
            <img :src="getImageUrl('user')" alt="" />
            <div class="userinfo">
              <h1>Admin</h1>
              <p>超级管理员</p>
            </div>
          </div>
        </template>
        <!-- 登录时间地点 -->
        <div class="login-info">
          <p>登录时间：<span>2022-11-28</span></p>
          <p>登陆地点：<span>中国 福建 福州</span></p>
        </div>
      </el-card>
      <el-card shadow="hover" class="card2">
        <el-table :data="tableData" :default-sort="{ prop: ['todayBuy', 'monthBuy', 'totalBuy'], order: 'descending' }"
          style="width: 100%" stripe>
          <el-table-column prop="name" label="品牌" />
          <el-table-column prop="todayBuy" label="日销量" sortable />
          <el-table-column prop="monthBuy" label="月销量" sortable />
          <el-table-column prop="totalBuy" label="总销量" sortable />
        </el-table>
      </el-card>
    </el-col>
    <!-- 右侧：图表展示 -->
    <el-col :span="16" class="right">
      <!-- 右上 -->
      <MyCard :countData="countData" />
      <!-- 右中 -->

      <!-- 右下 -->

    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import type { TableData, CountData } from "@/interface/index";
import MyCard from "@/components/MyCard.vue";
import { getData } from "@/api/index"
import { onMounted, ref } from "vue";

let tableData = ref([]),
  countData: Array<CountData>,
  orderData: object,
  userData: object[],
  pieData: object[]

// 静态图片资源打包
function getImageUrl(name: string):string {
  const imgUrl = new URL(`../../assets/images/${name}.png`, import.meta.url).href
  return imgUrl;
}

// 获取数据
let getMydata = () => {
  getData().then(({ data }) => {
    if (data.code === 20000) {
      let mydata = data.data
      tableData.value = mydata.tableData
    }
  }).catch(err => {
    console.log(err);
  })
}

onMounted(() => {
  console.log(123);
  getMydata()
})


</script>

<style lang="less" scoped>
.el-row {
  .left {

    // 用户登录信息
    .card1 {
      .user {
        display: flex;
        align-items: center;
        color: #999;

        img {
          height: 150px;
          width: 150px;
          margin: 0 45px;
          border-radius: 50%;
        }

        .userinfo {
          h1 {
            font-size: 38px;
            padding: 10px 0;
            font-weight: normal;
            color: #000;
          }
        }
      }

      // 表格
      .login-info {
        p {
          line-height: 28px;
          font-size: 15px;
          color: #999;
          margin-left: 75px;

          span {
            color: #666;
            margin-left: 100px;
          }
        }
      }
    }

    .card2 {
      margin-top: 20px;
      padding: 10px;

      .el-table :deep(.el-table__cell) {
        padding: 15px 0;
      }
    }
  }

  .right {
    padding: 0 10px;
    // 订单
  }

}
</style>