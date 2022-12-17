import axios from 'axios';
import { AxiosCanceler } from "./helper/axiosCancel";
import qs from 'qs';
import config from '../config';
import { ElMessage } from "element-plus";
import { useGlobalStore } from "@/stores";


const NETWORK_ERROR = '网络请求异常，请稍后重试...';

// 生成请求拦截器
const canceler = new AxiosCanceler();

// 定义请求参数的数据类型
type Options = {
  url: string,
  method: string,
  data?: any,
  mock?: boolean,
  params?: object
}


// 创建实例
const service = axios.create({
  baseURL: config.baseApi,
  timeout: 3000,
  // 跨域时候允许携带凭证
	withCredentials: true
})


// 拦截器配置
// 添加请求拦截器
service.interceptors.request.use(function (config:any) {
  // config 配置
  const globalStore = useGlobalStore();
  const token: string = globalStore.token;
  
  // 开启token认证，将请求头携带token
  config = {...config, headers:{...config.headers, "x-access-token": token}};

  // 先判断是否存在重复请求
  canceler.removePendingRequest(config);
  canceler.addPendingRequest(config);

  return config;

  config.headers["x-access-token"] = token;
  // 判断请求类型，不同的类型采用不同的 content-type
  if (!config.headers["content-type"]) {// 未设置时
    if (config.method.toLowerCase === 'post') {
      config.headers["content-type"] = "application/x-www-form-urlencoded"; // post 请求
      config.data = qs.stringify(config.data); // 序列化,比如表单数据
    }else {
      config.headers["content-type"] = "application/json";// 默认
    }
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
service.interceptors.response.use(
  function (res) {
    // 清除成功的请求
    canceler.removePendingRequest(res.config);

    // 获取响应的数据
    const {data} = res.data;
    
    if (data.code == 500) {
      ElMessage.error(data.msg);
      return Promise.reject(data.msg);
    }
    if (data.code && data.code!== 200){
      
      ElMessage.error(data.msg);
      return Promise.reject(data.msg);
    }
    // 请求成功
    return res.data
  }, 
  function (error) {
    // console.log(error);
    
    // 响应错误时，判断取消重复请求
    canceler.removePendingRequest(error.config || {});
    if (axios.isCancel(error)) {
      ElMessage.success("成功取消重复请求！");
      // 若为重复的请求，逻辑能走到这里其实是成功的状态
      return Promise.resolve("取消请求成功！");
    }
    // 这里是处理器返回的错误响应
    return Promise.reject(error);
  }
);


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