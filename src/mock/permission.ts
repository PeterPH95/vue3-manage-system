import Mock from 'mockjs'

export default {
  // 获取菜单导航
  getMenu: function (config: { url: string, methods: string, body: string }) {
    const { username, password } = JSON.parse(config.body)
    if (username.toLowerCase() === 'admin' && password == 123456) {
      return {
        code: 200,
        data: {
          menu: [{
            path: '/home',
            name: 'home',
            icon: 'HomeFilled',
            component: '/home/index',
            meta: {
              title: '首页'
            }
          },
          {
            path: '/user',
            name: 'user',
            icon: 'Avatar',
            component: '/user/index',
            meta: {
              title: '用户管理'
            }
          },
          {
            path: '/auth',
            name: 'auth',
            icon: 'Postcard',
            redirect: '/auth/menuList',
            meta: {
              title: '权限管理'
            },
            children: [{
                path: '/auth/menuList',
                name: 'menuList',
                label: '菜单权限',
                icon: 'Menu',
                component: '/auth/menuList/index',
                meta: {
                  title: '菜单权限'
                }
              },
              {
                path: '/auth/btnList',
                name: 'btnList',
                icon: 'Menu',
                component: '/auth/btnList/index',
                meta: {
                  title: '按钮权限'
                }
              }
            ]
          },
          {
            path: '/assembly',
            name: 'assembly',
            icon: 'Briefcase',
            redirect: '/assembly/todoList',
            meta: {
              title: '自定义组件'
            },
            children: [{
                path: '/assembly/todoList',
                name: 'todolist',
                icon: 'Menu',
                component: '/assembly/todoList/index',
                meta: {
                  title: 'Todo List'
                }
              },
              {
                path: '/assembly/banner',
                name: 'banner',
                icon: 'Menu',
                component: '/assembly/banner/index',
                meta: {
                  title: '轮播图'
                }
              }
            ]
          },
          {
            path: '/directives',
            name: 'Directives',
            icon: 'Stamp',
            redirect: '/directives/watermark',
            meta: {
              title: '小功能'
            },
            children: [{
                path: '/directives/watermark',
                name: 'watermark',
                icon: 'Apple',
                component: '/directives/watermark/index',
                meta: {
                  title: '水印'
                }
              },
              {
                path: '/directives/drag',
                name: 'drag',
                icon: 'Grape',
                component: '/directives/drag/index',
                meta: {
                  title: '拖拽'
                }
              },
              {
                path: '/directives/copy',
                name: 'copy',
                icon: 'Orange',
                component: '/directives/copy/index',
                meta: {
                  title: '复制'
                }
              },
              {
                path: '/directives/debounce',
                name: 'debounce',
                icon: 'Watermelon',
                component: '/directives/debounce/index',
                meta: {
                  title: '防抖'
                }
              },
              {
                path: '/directives/throttle',
                name: 'throttle',
                icon: 'Cherry',
                component: '/directives/throttle/index',
                meta: {
                  title: '节流'
                }
              }
            ]
          }],
          token: Mock.Random.guid(),
          message: '管理员路由信息获取成功'
        }
      }
    } else if (username.toLowerCase() === 'user' && password == 123456) {
      return {
        code: 200,
        data: {
          menu: [{
            path: '/home',
            name: 'home',
            icon: 'HomeFilled',
            component: '/home/index',
            meta: {
              title: '首页'
            }
          },
          {
            path: '/user',
            name: 'user',
            icon: 'Avatar',
            component: '/user/index',
            meta: {
              title: '用户管理'
            }
          },
          {
            path: '/auth',
            name: 'auth',
            icon: 'Postcard',
            redirect: '/auth/menuList',
            meta: {
              title: '权限管理'
            },
            children: [{
                path: '/auth/menuList',
                name: 'menuList',
                label: '菜单权限',
                icon: 'Menu',
                component: '/auth/menuList/index',
                meta: {
                  title: '菜单权限'
                }
              },
              {
                path: '/auth/btnList',
                name: 'btnList',
                icon: 'Menu',
                component: '/auth/btnList/index',
                meta: {
                  title: '按钮权限'
                }
              }
            ]
          }],
          token: Mock.Random.guid(),
          message: '普通用户路由信息获取成功'
        }
      }
    } else {
      return {
        code: -999,
        data: {
          message: '密码错误'
        }
      }
    }

  },
  // 获取按钮权限
} 