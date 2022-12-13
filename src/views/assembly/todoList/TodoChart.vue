<template>
  <div class="charts">
    <div ref="charts" class="charts-container"></div>
  </div>
</template>

<script lang="ts" setup>
import * as echarts from 'echarts';
import { ref } from '@vue/reactivity';
import { nextTick, onMounted, watch } from 'vue';
import { useTodoStore } from "@/stores/modules/todo";

const todoStore = useTodoStore();

const charts = ref();
let statCharts: echarts.ECharts;

// 完成的事件
const fulfill = ['已完成', 0, 0, 0, 0, 0, 0, 0];
const todos = ['未完成', 0, 0, 0, 0, 0, 0, 0];

// 获取周几
const list = ['day', '周日', '周一', '周二', '周三', '周四', '周五', '周六'];
const day = new Date().getDay() + 1;

// 完成和未完成数量
function getFulfill() {
  let obj: { fulfill: number, todos: number } = { fulfill: 0, todos: 0 };
  obj.fulfill = todoStore.todoFulfillList.length;
  obj.todos = todoStore.todoList.filter(item => !item.fulfill).length;
  return obj;
};

// 监视props的变化
watch(todoStore, () => {
  const data = getFulfill();
  // 判断周几
  fulfill[day] = data.fulfill;
  todos[day] = data.todos;
  // 更新图表
  updateChart();
});

// 更新图表数据
function updateChart() {
  statCharts.setOption({
    dataset: {
      source: [
        list,
        todos,
        fulfill
      ]
    }
  })
}


onMounted(() => {
  nextTick(() => {
    statCharts = echarts.init(charts.value);
    statCharts.on('updateAxisPointer', function (event: any) {
    const xAxisInfo = event.axesInfo[0];
    if (xAxisInfo) {
      const dimension = xAxisInfo.value + 1;
      statCharts.setOption({
        series: {
          id: 'pie',
          label: {
            show: false,
            position: 'center',
            formatter: '{b}: {@' + list[dimension] + '}'
          },
          encode: {
            value: dimension,
            tooltip: dimension
          }
        }
      });
    }
    });
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
          todos,
          fulfill
        ]
      },
      xAxis: { type: 'category' },
      yAxis: { gridIndex: 0 },
      grid: { top: '40%' },
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
            fontSize: '18',
            fontWeight: 'bold'
          }
          },
          label: {
            show: false,
            position: 'center',
            formatter: '{b}: {@' + list[day] + '}'
          },
          encode: {
            itemName: 'day',
            value: `${list[day]}`,
            tooltip: `${list[day]}`
          }
        }
      ]
    });
  })
});


</script>

<style lang="less" scoped>
.charts {
  height: 85%;

  .charts-container {
    height: 100%;
    width: 100%;
  }
}
</style>