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
      mock: false
    })
  }
}