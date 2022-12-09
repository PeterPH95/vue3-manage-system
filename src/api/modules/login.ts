import request from '@/api/request'


/* 获取角色token */ 
export const loginApi = (params: any) => {
    return request({
      url: '/login',
      method: 'post',
      data: params,
      mock: true
    })
}

/* 获取菜单列表 */ 
export const menuListApi = (params?: object) => {
  return request({
    url: '/permission/getMenu',
    method: 'get',
    data: params,
    mock: true
  })
}
