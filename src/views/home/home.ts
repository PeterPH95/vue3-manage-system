// import { onMounted } from 'vue'
import { getData } from "@/api/index"

interface HomeData {
  tableData: object[],
  countData: object[],
  orderData: object,
  userData: object[],
  pieData: object[]
}

export default function useData():HomeData{
  let mydata: HomeData
  // 获取home数据
  getData().then(({data}) => {
      mydata = data
      return mydata
    }).catch(err => {
      console.log('数据请求失败',err);
      mydata = {
        tableData: [{a: 1}],
        countData: [{a: 1}],
        orderData: {a: 1},
        userData: [{a: 1}],
        pieData: [{a: 1}]
      }
      
    });
  return mydata
}