/**
 * 项目的api管理
 */
import request from './request'

export default {
  /* 表格数据获取 */ 
  getTableData(params: object){
    return request({
      url: '/home/getTableData',
      method: 'get',
      data: params,
      mock: true
    })
  },
  // 订单数据
  getCountData(params: object){
    return request({
      url: '/home/getCountData',
      method: 'get',
      data: params,
      mock: true
    })
  },
  // 折线数据
  getOrderData(params: object){
    return request({
      url: '/home/getOrderData',
      method: 'get',
      data: params,
      mock: true
    })
  },
  // 柱图
  getUserData(params: object){
    return request({
      url: '/home/getUserData',
      method: 'get',
      data: params,
      mock: true
    })
  },
  // 饼图
  getPieData(params: object){
    return request({
      url: '/home/getPieData',
      method: 'get',
      data: params,
      mock: true
    })
  },

  /* 获取菜单 */ 
  getMenu(params: object){
    return request({
      url: '/permission/getMenu',
      method: 'post',
      data: params,
      mock: true
    })
  }
}