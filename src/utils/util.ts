// 获取面包屑
/**
 * @description 获取所有路径匹配的菜单列表
 * @param menuList 传入的菜单列表
 * @returns 对象：{路径： Menu对象}
 */
export function getAllBreadcrumb(menuList: Menu[]) {
  let handleBreadcrumbList: { [key: string]: any } = {};
  const loop = (menuItem: Menu) => {
    if (menuItem?.children?.length) {
      menuItem.children.forEach(item => loop(item));
    }
    handleBreadcrumbList[menuItem.path] = getCurrentBreadcrumb(menuItem.path, menuList);
  };
  menuList.forEach(item => loop(item));
  return handleBreadcrumbList;
}

/**
 * @description 通过当前访问的地址，过滤当前路径匹配到的面包屑地址
 * @param path 当前访问的路径
 * @param menuList 菜单列表
 * @return array
 */
export function getCurrentBreadcrumb(path: string, menuList: Menu[]) {
  let tempPath: Menu[] = [];
  try {
    const getNodePath = (node: Menu) => {
      tempPath.push(node);
      if (node.path === path) {
        throw new Error("找到了！");
      }
      // 若匹配的是子菜单则，从下面的逻辑中退出
      if (node.children?.length) {
        node.children.forEach(item => getNodePath(item));
      }
      // 若没报错，则删除记录
      tempPath.pop();
    };
    // 1. 首先执行该行
    menuList.forEach(item => getNodePath(item));
  } catch (error) {
    return tempPath;
  }
}


/**
 * @description 扁平化数组
 * @param menuList 菜单列表
 * @return array
 */
export function getFlatArr(menuList: Menu[]) {
  let newMenuList: Menu[] = JSON.parse(JSON.stringify(menuList));
  return newMenuList.reduce((pre: Menu[], cur: Menu) => {
    let flatArr = [...pre, cur];
    if (cur.children) {
      flatArr = [...flatArr, ...getFlatArr(cur.children)];
    }
    return flatArr;
  }, []);
}