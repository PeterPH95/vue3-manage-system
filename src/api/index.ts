/**
 * 项目的api管理
 */
import request from './request'

export default {
  /* home页面数据获取 */ 
  getData(params?: object){
    return request({
      url: '/home/getData',
      method: 'get',
      data: params,
      mock: true
    })
  },

  /* 多次请求测试 */ 
  getTest(params?: object){
    return request({
      url: '/assembly/getTest',
      method: 'get',
      data: params,
      mock: true
    })
  }
}