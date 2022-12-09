import axios from 'axios';
import config from '../config';
import { ElMessage } from "element-plus";
import { useGlobalStore } from "@/stores";


const NETWORK_ERROR = '网络请求异常，请稍后重试...'

// 定义请求参数的数据类型
type Options = {
  url: string,
  method: string,
  data: any,
  mock?: boolean,
  params?: object
}


// 创建实例
const service = axios.create({
  baseURL: config.baseApi,
  timeout: 3000
})


// 拦截器配置
// 添加请求拦截器
service.interceptors.request.use(function (config:any) {
  // 在发送请求之前做些什么
  const globalStore = useGlobalStore();
  const token: string = globalStore.token;
  // 将请求头携带token
  return {...config, headers:{...config.headers, "x-access-token": token}};
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
service.interceptors.response.use(
  function (res) {
  // 获取响应的数据
  const {data} = res;
  // console.log(data.msg);
  
  if (data.code == 500) {
    ElMessage.error(data.msg)
    return Promise.reject(data.msg)
  }
  if (data.code && data.code!== 200){
    ElMessage.error(NETWORK_ERROR)
    return Promise.reject(NETWORK_ERROR)
  }

  // 请求成功
  return data
}, 
function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});


// 封装的核心函数
function request(options:Options) {
  options.method = options.method || 'get'
  if (options.method.toLowerCase() == 'get') {
    options.params = options.data
  }
  // 处理mock
  let isMock = config.mock
  // 判断某个接口是否用 mock
  if (options.mock !== undefined) {
    isMock = options.mock
  }
  // 线上环境默认设置
  if (config.env === 'prod') {
    service.defaults.baseURL = config.baseApi
  }else {
    service.defaults.baseURL = isMock ? config.mockApi : config.baseApi
  }

  return service(options)
}


export default request;