// 定义菜单的数据类型

export interface Menu {
  path: string;
  name: string;
  label: string;
  icon: 'HomeFilled' | 'Avatar' | 'Menu' | 'Guide' | 'Apple' | 'Orange' ;
  component?: string;
  children?: Menu[];
}