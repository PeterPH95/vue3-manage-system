// 数据类型定义文件

export interface TableData {
  name: string;
  todayBuy: number;
  monthBuy: number;
  totalBuy: number;
}

export interface CountData {
  name: string;
  value: number;
  component: 'SuccessFilled' | 'Goods' | 'Star';
  color: string;
}

export interface UserData {
  date: string;
  new: number;
  active: number;
}