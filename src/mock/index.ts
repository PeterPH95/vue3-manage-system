import homeApi from './homeData'  
import Mock from 'mockjs'

Mock.mock('/home/getData', homeApi.getStaticHomeData)