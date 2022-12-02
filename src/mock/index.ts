import homeApi from './homeData'  
import Mock from 'mockjs'

Mock.mock('/home/getTableData', homeApi.getTableData)
Mock.mock('/home/getCountData', homeApi.getCountData)
Mock.mock('/home/getOrderData', homeApi.getOrderData)
Mock.mock('/home/getUserData', homeApi.getUserData)
Mock.mock('/home/getPieData', homeApi.getPieData)