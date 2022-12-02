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
      <el-card shadow="hover" style="height: 270px;">
        <div ref="echarts1" style="height: 270px"></div>
      </el-card>
      <!-- 右下 -->
      <div class="r-bottom">
        <el-card shadow="hover">
          <div ref="echarts2" style="height: 280px;"></div>
        </el-card>
        <el-card shadow="hover">
          <div ref="echarts3" style="height: 280px;"></div>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import type { TableData, CountData, UserData } from "@/interface/index";
import MyCard from "@/components/MyCard.vue";
import { getCurrentInstance, markRaw, onBeforeMount, onMounted, reactive, ref, toRaw } from "vue";
import * as echarts from "echarts";
import type { BarSeriesOption, LineSeriesOption, PieSeriesOption } from "echarts";

type ECOption = echarts.ComposeOption<
  | BarSeriesOption
  | LineSeriesOption
  | PieSeriesOption
>;

// 类似于 vue2 中的 this
const { proxy } = getCurrentInstance() as any

let tableData: TableData[] | any = reactive([])
let countData: CountData[] | any = reactive([])

// 静态图片资源打包
function getImageUrl(name: string): string {
  const imgUrl = new URL(`../../assets/images/${name}.png`, import.meta.url).href
  return imgUrl;
}

// 获取表格数据
const getTableData = async () => {
  const res = await proxy.$api.getTableData()
  // 下面的这个直接赋值有误，无法触发响应式
  // tableData = res
  tableData.push(...res)
  tableData = toRaw(tableData)
}
// 获取订单数据
const getCountData = async () => {
  const result = await proxy.$api.getCountData()
  countData.push(...result)
}

// echarts1 折线图配置
const getOrderData = async () => {
  let orderData = await proxy.$api.getOrderData()

  const keyArray: string[] = Object.keys(orderData.data[0])
  const serie: LineSeriesOption[] = []
  keyArray.forEach(key => {
    serie.push({
      name: key,
      data: orderData.data.map((item: { [x: string]: any; }) => item[key]),
      type: 'line'
    })
  })

  let orderOptions: ECOption = {
    legend: {},
    xAxis: {
      data: orderData.date
    },
    yAxis: {},
    series: serie
  }

  let OrderChart = echarts.init(proxy.$refs['echarts1'])
  OrderChart.setOption(orderOptions)
}

// echarts2 柱图配置
const getUserData = async () => {
  const userData: UserData[] | any = await proxy.$api.getUserData()

  const userOptions: ECOption = {
    legend: {
      textStyle: {
        color: "#333",
      },
    },
    grid: {},
    tooltip: {
      trigger: "axis",
    },
    xAxis: {
      type: "category",
      data: userData.map((item: { date: any; }) => item.date),
    },
    yAxis: {},
    color: ["#2ec7c9", "#b6a2de"],
    series: [
      {
        name: "新增用户",
        data: userData.map((item: { new: any; }) => item.new),
        type: "bar",
      },
      {
        name: "活跃用户",
        data: userData.map((item: { active: any; }) => item.active),
        type: "bar",
      },
    ],
  };

  let UserChart = echarts.init(proxy.$refs['echarts2'])
  UserChart.setOption(userOptions)
}

// echarts3 饼图配置
const getPieData = async () => {
  const pieData: object[] = await proxy.$api.getPieData()

  const pieOptions: ECOption = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: '2%',
    },
    series: [
      {
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '40',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: pieData
      }
    ]
  }

  let PieChart = echarts.init(proxy.$refs['echarts3'])
  PieChart.setOption(pieOptions)
}

onBeforeMount(() => {
  getTableData()
})

// 发送请求
onMounted(() => {
  getCountData()
  getOrderData()
  getUserData()
  getPieData()
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
    padding: 0 20px;
    // 订单

    .r-bottom {
      margin-top: 20px;
      display: flex;
      justify-content: space-between;

      .el-card {
        height: 310px;
        width: 49%;
      }
    }
  }

}
</style>