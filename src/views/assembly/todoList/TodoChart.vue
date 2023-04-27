<template>
  <div class="charts">
    <div ref="charts" class="charts-container"></div>
  </div>
</template>

<script lang="ts" setup>
import * as echarts from 'echarts';
import { ref } from '@vue/reactivity';
import { computed, nextTick,onMounted, onUnmounted, watch } from 'vue';
import { useTodoStore } from "@/stores/modules/todo";

const todoStore = useTodoStore();

// 统计一周的任务
const allTodos = computed(()=>{ 
  let [todosList, fulfillList] = todoStore.countAlltodos;
  todosList.unshift('未完成');
  fulfillList.unshift('已完成');
  return [todosList, fulfillList]
 })


const charts = ref();
let statCharts: echarts.ECharts;

// 完成的事件
let fulfillList:any = [];
let todosList:any = [];

// 获取周几
const list = ['day', '周日', '周一', '周二', '周三', '周四', '周五', '周六'];
const day = computed(()=>{
  return todoStore.day + 1
});
// 更新初始化数据
updateTodos();

// 更新今日完成和未完成数量
function updateTodos() {
  fulfillList = allTodos.value[1];
  // 在修改完成状态的时候触发
  fulfillList[day.value] = todoStore.todoFulfillList.length;
  todosList = allTodos.value[0];
};

// 更新图表数据
function updateChart() {
  statCharts.setOption({
    dataset: {
      source: [
        list,
        fulfillList,
        todosList
      ]
    }
  })
};

// 监视props的变化
watch(todoStore, () => {
  // 更新数据
  updateTodos();
  // 更新图表
  updateChart();
});


// 渲染图表
function renderChart() {
  statCharts = echarts.init(charts.value);
  // 下列代码通过鼠标移动xAxis切换饼图的数据显示
  // statCharts.on('updateAxisPointer', function (event: any) {
  // const xAxisInfo = event.axesInfo[0];
  // if (xAxisInfo) {
  //   const dimension = xAxisInfo.value + 1;
  //   statCharts.setOption({
  //     series: {
  //       id: 'pie',
  //       label: {
  //         show: false,
  //         position: 'center',
  //         formatter: '{b}: {@' + list[dimension] + '}'
  //       },
  //       encode: {
  //         value: dimension,
  //         tooltip: dimension
  //       }
  //     }
  //   });
  // }
  // });
  statCharts.setOption({
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      left: "30%",
      top: "15%",
      textStyle: {
        fontSize: 18,
        fontWeight: 'bold'
      }
    },
    dataset: {
      source: [
        list,
        fulfillList,
        todosList
      ]
    },
    xAxis: { type: 'category' },
    yAxis: { gridIndex: 0 },
    grid: { top: '40%' },
    color: ['#91cd77', '#ef6567'],
    series: [
      {
        type: 'line',
        smooth: true,
        seriesLayoutBy: 'row',
        emphasis: { focus: 'series' }
      },
      {
        type: 'line',
        smooth: true,
        seriesLayoutBy: 'row',
        emphasis: { focus: 'series' }
      },
      {
        type: 'pie',
        id: 'pie',
        radius: ['20%', '30%'],
        center: ['70%', '20%'],
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '14',
            fontWeight: 'bold'
          }
        },
        label: {
          show: false,
          position: 'center',
          formatter: `${list[day.value]}{b}: {@` + list[day.value] + '}'
        },
        encode: {
          itemName: 'day',
          value: `${list[day.value]}`,
          tooltip: `${list[day.value]}`
        }
      }
    ]
  });
};

// 自适应窗口
function resizeChart() {
  statCharts.resize();
};

onMounted(() => {
  renderChart();
  // 当浏览器修改尺寸时重新渲染图表
  window.addEventListener("resize", resizeChart);
});

onUnmounted(() => {
  window.removeEventListener("resize", resizeChart)
});

</script>

<style lang="less" scoped>
.charts {
  height: 85%;
  width: 100%;
  border-top: 3px dotted #ccc;

  .charts-container {
    height: 100%;
    width: 100%;
  }
}
</style>