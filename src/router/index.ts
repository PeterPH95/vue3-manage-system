import { createRouter, createWebHashHistory } from "vue-router"

// routes 要写成数组形式，可不要写成对象
const routes = [
	{
		path: '/',
		component: () => import('../views/main/Main.vue'),
		redirect: '/home',
		children: [
			{ path: 'home', name: 'home', component: () => import('../views/home/Home.vue') }
		]
	},
	{
		path: '/login',
		name: 'login',
		component: () => import('../views/login/Login.vue')
	},
	{
		path: '/:pathMatch(.*)*',
		name: 'notFound',
		component: () => import('../views/notFound/NotFound.vue')
	}
]

const router = createRouter({
	history: createWebHashHistory(),
	routes
})

export default router