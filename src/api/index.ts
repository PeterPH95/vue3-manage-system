/**
 * 项目的api管理
 */
import request from './request'

export default {
  // 全部数据获取
  getData(params: object){
    return request({
      url: '/home/getData',
      method: 'get',
      data: params,
      mock: true
    })
  }
}