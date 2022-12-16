import type { AxiosRequestConfig, Canceler } from "axios";
import axios from "axios";
import qs from 'qs';

/**
 * 需求：取消重复的请求
 * 
 * 思路：
 * 1.将每个请求的参数做一个唯一表示，同时请求对应的cancel方法，存入map中
 * 2.在请求拦截器中判断 map 是否有该请求，有则取消先前的请求，保留当前的；
 * 3.在响应拦截器中通过config的标识，在map中清除当前已经成功响应的请求
 * 
 * 学习到的api:
 * axios.CancelToken()
 * 底层实际调用的是 xhr.abort() 方法，走的是响应错误的逻辑
 * 
 * [掘金参考]https://juejin.cn/post/6955610207036801031
 */


let pendingReqMap = new Map<string, Canceler>()

// 1. 为每个请求生成唯一的标识
export function generateReqKey(config: AxiosRequestConfig){
  // console.log('看看config的结构',config);
  const {method, url, data, params} = config;
  return [method, url, qs.stringify(data), qs.stringify(params)].join('&');
}

// 2. 将处理map的方法封装到类中
export class AxiosCanceler {
  /**
   * @description 向 pendingReqMap 中添加请求
   * @param config 
   * @return void
   */
  addPendingRequest(config: AxiosRequestConfig){
    // 在添加之前，检查之前的请求
    this.removePendingRequest(config);
    const key = generateReqKey(config);
    config.cancelToken = 
      config.cancelToken || 
      new axios.CancelToken(cancel => {
        if (!pendingReqMap.has(key)) {
          pendingReqMap.set(key, cancel);
        }
      })
  }

  /**
   * @description 移除重复请求
   * @param config 
   */
  removePendingRequest(config: AxiosRequestConfig){
    const key = generateReqKey(config);
    // 判断之前是否存在与当前重复的请求
    if (pendingReqMap.has(key)) {
      // 有则取消当前的请求
      const cancel = pendingReqMap.get(key);
      cancel && cancel(key);
      pendingReqMap.delete(key);
    }
  }

  /**
   * @description 重置
   */
  reset(): void {
    pendingReqMap = new Map<string, Canceler>();
  }
}
