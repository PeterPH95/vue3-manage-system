// 定义菜单的数据类型

export interface Menu {
  path: string;
  name: string;
  label: string;
  icon: 'HomeFilled' | 'Avatar' | 'Postcard' | 'Menu' | 'Briefcase' | 'Stamp' 
          | 'Apple' | 'Orange' | 'Grape' | 'Watermelon' | 'Cherry' ;
  component?: string;
  children?: Menu[];
}