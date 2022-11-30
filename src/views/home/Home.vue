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
        <el-table
          :data="tableData"
          :default-sort="{ prop: ['todayBuy','monthBuy','totalBuy'], order: 'descending' }"
          style="width: 100%"
					stripe
        >
          <el-table-column prop="name" label="品牌" />
          <el-table-column prop="todayBuy" label="日销量" sortable />
          <el-table-column  prop="monthBuy" label="月销量" sortable />
          <el-table-column  prop="totalBuy" label="总销量" sortable />
        </el-table>
      </el-card>
    </el-col>
    <!-- 右侧：图表展示 -->
    <el-col :span="16" class="right">
      <!-- 右上 -->
      <div class="order-form">
        <el-card shadow="hover" v-for="(item, key) in countData" :key="key">
          <el-icon :style="{ backgroundColor: `${item.color}` }" :size="24" color="#fff" >
            <!-- 动态组件 -->
            <component :is="item.component"></component>
          </el-icon>
          <div class="detail">
            <p class="price">￥&nbsp;{{ item.value }}</p>
            <p class="name">{{ item.name }}</p>
          </div>
        </el-card>
      </div>
      <!-- 右中 -->
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
  import {SuccessFilled, Star, Goods } from '@element-plus/icons-vue'

	interface TableData {
		name: string;
		todayBuy: number;
		monthBuy: number;
		totalBuy: number;
	}

  // 表格数据
	const tableData: TableData[] = [
		{
			name: "苹果",
			todayBuy: 800,
			monthBuy: 4500,
			totalBuy: 65000,
		},
		{
			name: "华为",
			todayBuy: 600,
			monthBuy: 4000,
			totalBuy: 50000,
		},
		{
			name: "oppo",
			todayBuy: 500,
			monthBuy: 3500,
			totalBuy: 22000,
		},
		{
			name: "vivo",
			todayBuy: 320,
			monthBuy: 2200,
			totalBuy: 24000,
		},
		{
			name: "小米",
			todayBuy: 330,
			monthBuy: 6500,
			totalBuy: 45000,
		},
		{
			name: "三星",
			todayBuy: 300,
			monthBuy: 2000,
			totalBuy: 34000,
		},
		{
			name: "魅族",
			todayBuy: 350,
			monthBuy: 3000,
			totalBuy: 22000,
		},
	];

  // 订单
  const countData =  [
    {
      name: "今日支付订单",
      value: 6666,
      component: SuccessFilled,
      color: "#2ec7c9",
    },
    {
      name: "今日收藏订单",
      value: 666,
      component: Star,
      color: "#ffb980",
    },
    {
      name: "今日未支付订单",
      value: 6666,
      component: Goods,
      color: "#5ab1ef",
    },
    {
      name: "本月支付订单",
      value: 6666,
      component: SuccessFilled,
      color: "#2ec7c9",
    },
    {
      name: "本月收藏订单",
      value: 666,
      component: Star,
      color: "#ffb980",
    },
    {
      name: "本月未支付订单",
      value: 6666,
      component: Goods,
      color: "#5ab1ef",
    },
  ]

  // 折线数据



  // 静态图片资源打包
  function getImageUrl(name:string) {
    const imgUrl = new URL(`../../assets/images/${name}.png`, import.meta.url).href
    return imgUrl;
  }
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
  }
  
}
</style>