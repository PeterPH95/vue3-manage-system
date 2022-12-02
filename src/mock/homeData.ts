import Mock from 'mockjs'

let List: object[] = []

export default {
  // 表格
  getTableData: () => {
    return {
      code: 200,
      data: [
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
      ]
    }
  },
  // 订单
  getCountData: () => {
    return {
      code: 200,
      data: [
        {
          name: "今日支付订单",
          value: 6666,
          component: 'SuccessFilled',
          color: "#2ec7c9",
        },
        {
          name: "今日收藏订单",
          value: 666,
          component: 'Star',
          color: "#ffb980",
        },
        {
          name: "今日未支付订单",
          value: 6666,
          component: 'Goods',
          color: "#5ab1ef",
        },
        {
          name: "本月支付订单",
          value: 6666,
          component: 'SuccessFilled',
          color: "#2ec7c9",
        },
        {
          name: "本月收藏订单",
          value: 666,
          component: 'Star',
          color: "#ffb980",
        },
        {
          name: "本月未支付订单",
          value: 6666,
          component: 'Goods',
          color: "#5ab1ef",
        },
      ]
    }
  },
  // 折线
  getOrderData: () => {
    for (let i = 0; i < 7; i++) {
      List.push(
        Mock.mock({
          苹果: Mock.Random.float(100, 8000, 0, 0),
          华为: Mock.Random.float(100, 8000, 0, 0),
          vivo: Mock.Random.float(100, 8000, 0, 0),
          oppo: Mock.Random.float(100, 8000, 0, 0),
          魅族: Mock.Random.float(100, 8000, 0, 0),
          三星: Mock.Random.float(100, 8000, 0, 0),
          小米: Mock.Random.float(100, 8000, 0, 0)
        })
      )
    }
    return {
      code: 200,
      data: {
        date: ['20221001', '20221002', '20221003', '20221004', '20221005', '20221006', '20221007'],
        data: List
      },
    }
  },
  // 柱图
  getUserData: () => {
    return {
      code: 200,
      data: [{
        date: '周一',
        new: 5,
        active: 200
      },
      {
        date: '周二',
        new: 10,
        active: 500
      },
      {
        date: '周三',
        new: 12,
        active: 550
      },
      {
        date: '周四',
        new: 60,
        active: 800
      },
      {
        date: '周五',
        new: 65,
        active: 550
      },
      {
        date: '周六',
        new: 53,
        active: 770
      },
      {
        date: '周日',
        new: 33,
        active: 170
      }],
    }
  },
  // 饼图
  getPieData: () => {
    return {
      code: 200,
      data: [{
        name: '小米',
        value: 2999
      },
      {
        name: '苹果',
        value: 5999
      },
      {
        name: '华为',
        value: 4800
      },
      {
        name: 'vivo',
        value: 1500
      },
      {
        name: 'oppo',
        value: 1999
      },
      {
        name: '魅族',
        value: 2200
      },
      {
        name: '三星',
        value: 4500
      }],
    }
  }
}