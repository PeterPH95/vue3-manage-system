// 定义菜单的数据类型

export interface Menu {
  path?: string;
  name: string;
  label: string;
  component: 'HomeFilled' | 'Avatar' | 'Menu' | 'Guide' | 'Apple' | 'Orange' ;
  url?: string;
  children?: Menu[];
}