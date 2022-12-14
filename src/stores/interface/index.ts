import type { Menu } from '@/interface/routeType';


/* tabsMenuProps */
export interface TabsMenuProps {
	title: string;
	path: string;
	icon: 'HomeFilled' | 'Avatar' | 'Postcard' | 'Menu' | 'Briefcase' | 'Stamp' 
        | 'Apple' | 'Orange' | 'Grape' | 'Watermelon' | 'Cherry' ;
}

/* TabsState */
export interface TabsState {
	tabList: TabsMenuProps[];
}

// 权限数据的格式
export interface AuthState {
	authMenuList: Menu[];
}

// 菜单的数据类型格式

export enum Day {
  '周日', '周一', '周二', '周三', '周四', '周五', '周六'
}

// todo 的数据格式
export interface Todo {
  id: string;
  content: string;
  day: Day;
  fulfill: boolean;
}

export interface TodosState {
	todoList: Todo[];
  todoFulfillList: Todo[];
}