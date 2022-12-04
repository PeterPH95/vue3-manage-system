import homeApi from './homeData'  
import permissionApi from './permission'  
import Mock from 'mockjs'

// 获取首页表格可视化数据
Mock.mock('/home/getTableData', homeApi.getTableData)
Mock.mock('/home/getCountData', homeApi.getCountData)
Mock.mock('/home/getOrderData', homeApi.getOrderData)
Mock.mock('/home/getUserData', homeApi.getUserData)
Mock.mock('/home/getPieData', homeApi.getPieData)

// 获取登录菜单
Mock.mock('/permission/getMenu', permissionApi.getMenu)