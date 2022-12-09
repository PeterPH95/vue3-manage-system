import { createRouter, createWebHashHistory } from "vue-router";
import { useGlobalStore } from "@/stores";
import { useAuthStore } from "@/stores/modules/auth";
import { initDynamicRouter } from "@/router/modules/dynamicRouter";


// routes 要写成数组形式，可不要写成对象
const routes = [
	{
		path: '/',
		component: () => import('../views/main/index.vue'),
		name: 'Main',
		redirect: '/home',
		children: [
			{ path: 'home', name: 'home', component: () => import('../views/home/index.vue') }
		]
	},
	{
		path: '/login',
		name: 'login',
		component: () => import('../views/login/index.vue')
	},
	{
		path: '/:pathMatch(.*)*',
		name: 'notFound',
		component: () => import('../views/notFound/404.vue')
	}
]

const router = createRouter({
	history: createWebHashHistory(),
	routes
})

/**
 * @description 路由拦截
 */
router.beforeEach(async (to, from, next) => {
	const globalStore = useGlobalStore();
	let token = globalStore.token;
	// 1. 判断权限
	if (!token && to.name !== 'login') {
		return next({ name: 'login' })
	}
	if (token && to.name === 'login') {
		return next({ name: 'home' });
	} else {
		// 2. 判断当前是否有路由列表，无则重新请求接口
		const authStore = useAuthStore();
		// 页面刷新会造成数据丢失，需重新获取路由信息
		if (token && !authStore.authMenuListGet.length) {
			await initDynamicRouter();
			// 下面的方式来控制刷新保持原页面
			return next(to.path);
		} else {
			// 一切正常
			return next();
		}
	}
})

/**
 * 重置路由
 */
export const resetRouter = () => {
	const authStore = useAuthStore();
	let dynamicRouter = JSON.parse(JSON.stringify(authStore.authMenuListGet));
	dynamicRouter.forEach((route: any) => {
		const { name } = route;
		if (name && router.hasRoute(name)) router.removeRoute(name);
	});
}


export default router