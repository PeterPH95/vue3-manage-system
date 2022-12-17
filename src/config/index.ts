/**
 * 环境配置文件
 * 开发环境
 * 测试环境
 * 生产环境
 */

// 解决字符串当 key 产生的错误
type Api = {
  baseApi: string,
  mockApi: string
}

type Mode = {
  development: Api,
  test: Api,
  prod: Api
}

// https://cn.vitejs.dev/guide/env-and-mode.html
// vite 暴露的获取环境变量的方法
const env: keyof Mode = (import.meta.env.MODE as keyof Mode) || 'prod'

const EnvConfig: Mode = {
  development: {
    baseApi: '/api',
    // 下面可以使用在线mock的方式：https://www.fastmock.site/#/
    // 账号：peterpapi，密码：654321
    mockApi: 'https://mock.mengxuegu.com/mock/6391da9d93a67b5f10669a02/api'
  },
  test: {
    baseApi: '/api',
    mockApi: 'https://mock.mengxuegu.com/mock/6391da9d93a67b5f10669a02/api'
  },
  prod: {
    baseApi: '/api',
    mockApi: 'https://mock.mengxuegu.com/mock/6391da9d93a67b5f10669a02/api'
  },
}

export default {
  env,
  // mock 的总开关，本地mock为false，远程mock为 true
  mock: true,
  // 报错
  ...EnvConfig[env]
}