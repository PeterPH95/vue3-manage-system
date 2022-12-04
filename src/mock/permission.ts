import Mock from 'mockjs'
import type { Menu } from '@/interface/routeType'

interface MenuResponse {
  code: number
  data: { message: string, menu?: Menu[], token?: string }
}

export default {
  // 获取菜单导航
  getMenu: function (config: { url: string, methods: string, body: string }): MenuResponse {
    const { username, password } = JSON.parse(config.body)
    if (username.toLowerCase() === 'admin') {
      return {
        code: 200,
        data: {
          menu: [{
            path: '/home',
            name: 'home',
            label: '首页',
            component: 'HomeFilled',
            url: 'Home.vue'
          },
          {
            path: '/mall',
            name: 'mall',
            label: '商品管理',
            component: 'Avatar',
            url: 'Mall.vue'
          },
          {
            path: '/user',
            name: 'user',
            label: '用户管理',
            component: 'Menu',
            url: 'User.vue'
          },
          {
            label: '其他',
            name: 'more',
            component: 'Guide',
            children: [{
              path: '/page1',
              name: 'page1',
              label: '页面1',
              component: 'Apple',
              url: 'PageOne'
            },
            {
              path: '/page2',
              name: 'page2',
              label: '页面2',
              component: 'Orange',
              url: 'PageTwo'
            }
            ]
          }
          ],
          token: Mock.Random.guid(),
          message: '管理员路由信息获取成功'
        }
      }
    } else if (username !== '') {
      return {
        code: 200,
        data: {
          menu: [{
            path: '/home',
            name: 'home',
            label: '首页',
            component: 'HomeFilled',
            url: 'Home.vue'
          },
          {
            path: '/mall',
            name: 'mall',
            label: '商品管理',
            component: 'Avatar',
            url: 'Mall.vue'
          },
          {
            path: '/user',
            name: 'user',
            label: '用户管理',
            component: 'Menu',
            url: 'User.vue'
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