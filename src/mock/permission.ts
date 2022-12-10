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
            label: '首页',
            icon: 'HomeFilled',
            component: '/home/index'
          },
          {
            path: '/user',
            name: 'user',
            label: '用户管理',
            icon: 'Avatar',
            component: '/user/index'
          },
          {
            path: '/auth',
            name: 'auth',
            label: '权限管理',
            icon: 'Postcard',
            redirect: '/auth/menuList',
            children: [{
              path: '/auth/menuList',
              name: 'menuList',
              label: '菜单权限',
              icon: 'Menu',
              component: '/auth/menuList/index'
            },
            {
              path: '/auth/btnList',
              name: 'btnList',
              label: '按钮权限',
              icon: 'Menu',
              component: '/auth/btnList/index'
            }
            ]
          },
          {
            path: '/assembly',
            name: 'assembly',
            label: '自定义组件',
            icon: 'Briefcase',
            redirect: '/assembly/todoList',
            children: [{
              path: '/auth/todoList',
              name: 'todolist',
              label: 'Todo List',
              icon: 'Menu',
              component: '/assembly/todoList/index'
            },
            {
              path: '/auth/banner',
              name: 'banner',
              label: '轮播图',
              icon: 'Menu',
              component: '/assembly/banner/index'
            }
            ]
          },
          {
            path: '/directives',
            name: 'Directives',
            label: '小功能',
            icon: 'Stamp',
            redirect: '/directives/watermark',
            children: [{
              path: '/directives/watermark',
              name: 'watermark',
              label: '水印',
              icon: 'Apple',
              component: '/directives/watermark/index'
            },
            {
              path: '/directives/copy',
              name: 'copy',
              label: '复制',
              icon: 'Orange',
              component: '/directives/copy/index'
            },
            {
              path: '/directives/drag',
              name: 'drag',
              label: '拖拽',
              icon: 'Grape',
              component: '/directives/drag/index'
            },
            {
              path: '/directives/debounce',
              name: 'debounce',
              label: '防抖',
              icon: 'Watermelon',
              component: '/directives/debounce/index'
            },
            {
              path: '/directives/throttle',
              name: 'throttle',
              label: '节流',
              icon: 'Cherry',
              component: '/directives/throttle/index'
            }
            ]
          }
          ],
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
            label: '首页',
            icon: 'HomeFilled',
            component: '/home/index'
          },
          {
            path: '/user',
            name: 'user',
            label: '用户管理',
            icon: 'Avatar',
            component: '/user/index'
          },
          {
            path: '/auth',
            name: 'auth',
            label: '权限管理',
            icon: 'Postcard',
            redirect: '/auth/menuList',
            children: [{
                path: '/auth/menuList',
                name: 'menuList',
                label: '菜单权限',
                icon: 'Menu',
                component: '/auth/menuList/index'
              },
              {
                path: '/auth/btnList',
                name: 'btnList',
                label: '按钮权限',
                icon: 'Menu',
                component: '/auth/btnList/index'
              }
            ]
          }
          ],
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