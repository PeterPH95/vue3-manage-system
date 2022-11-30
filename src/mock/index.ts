import homeApi from './homeData'  
import Mock from 'mockjs'

Mock.mock('/api/home/getData', homeApi.getStaticHomeData)