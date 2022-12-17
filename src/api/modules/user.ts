import request from "../request";

export function getUserList(params?: any){
  return request({
    method: 'get',
    url: '/user/getUser',
    params: params
  })
}