import { useAuthStore } from "@/stores/modules/auth";
import { ElNotification } from "element-plus";
import router from "@/router/index";

// 引入 views 文件夹下所有 vue 文件
const modules = import.meta.glob("@/views/**/*.vue");

/**
 * 初始化动态路由
 */
export const initDynamicRouter =async () => {
  // 1. 获取菜单列表 + 按钮权限（接口请求）
  const authStore = useAuthStore();
  await authStore.getAuthMenuList();

  // 2. 如果无返回菜单列表
  if (!authStore.authMenuList.length) {
    ElNotification({
      title: "无权访问",
      message: "当前账号无任何菜单权限，请联系系统管理员！",
      type: "warning",
      duration: 3000
    });
    router.replace('/login');
    return Promise.reject("No permission");
  }

  // 3. 添加动态路由
  const menuList = JSON.parse(JSON.stringify(authStore.authMenuListGet));// proxy对象转为普通对象

  let myMenu: any = [];
  menuList.forEach((item: any) => {
    if (item.children) {
      item.children = item.children.map( (val: any) => {
        val.component = modules["/src/views" + val.component + ".vue"];
        return val;
      })
      // 展开 push 子路由,不然按子路由的路径无法跳转
      myMenu.push(...item.children);
    }else {
      item.component = modules["/src/views" + item.component + ".vue"];
      myMenu.push(item);
    }
  });
  console.log(myMenu);
  
  // 加入路由
  myMenu.forEach((item: any) => {
    router.addRoute('Main', item);
  })
}