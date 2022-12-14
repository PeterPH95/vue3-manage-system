// * Menu
declare interface Menu {
  path: string;
  name: string;
  component?: string;
  children?: Menu[];
  redirect?: string;
  meta: {
    title: string;
    icon: 'HomeFilled' | 'Avatar' | 'Postcard' | 'Menu' | 'Briefcase' | 'Stamp' 
          | 'Apple' | 'Orange' | 'Grape' | 'Watermelon' | 'Cherry' ;
  }
}