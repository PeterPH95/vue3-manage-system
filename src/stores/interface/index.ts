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
export interface Menu {
  path: string;
  name: string;
  label: string;
  icon: 'HomeFilled' | 'Avatar' | 'Postcard' | 'Menu' | 'Briefcase' | 'Stamp' 
          | 'Apple' | 'Orange' | 'Grape' | 'Watermelon' | 'Cherry' ;
  component?: string;
  children?: Menu[];
} 