import { createRouter, createWebHashHistory } from 'vue-router' //引入路由
import Home from '@/pages/Home'
//路由懒加载引入方式
const home = () => {
	console.log(111);
	return import('@/pages/Home')
}
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Search from '@/pages/Search'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
// 引入二级路由
import MyOrder from '@/pages/Center/myOrder'
import GroupOrder from '@/pages/Center/groupOrder'
//引入pinia
import { useUserStore } from '@/stores'
import pinia from '@/stores/pinia'

let router = createRouter({
	history: createWebHashHistory(),
	//跳转路由时滚轮默认回到最上方
	scrollBehavior(to, from, savePosition) {
		return { top: 0 }
	},
	routes: [
		{
			path: '/home',
			//路由懒加载的常用写法
			component: () => import('@/pages/Home'),
			meta: { show: true }
		},
		{
			path: '/Login',
			component: Login,
			meta: { show: false }

		},
		{
			path: '/Register',
			component: Register,
			meta: { show: false }

		},
		{
			name: 'search',
			path: '/Search/:keyword?',//加上？表示可传可不传
			component: Search,
			meta: { show: true },
			// props:($route)=> {
			// 	return {keyword:$route.params.keyword,k:$route.query.k}
			// }
			// props:true
			// props:{a:1,b:2}
		},
		{
			path: "/detail/:skuid",
			component: Detail,
			meta: { show: true }
		},
		{
			name: 'addCartSuccess',
			path: "/addCartSuccess",
			component: AddCartSuccess,
			meta: { show: true }
		},
		{
			path: "/shopCart",
			component: ShopCart,
			meta: { show: true }
		},
		{
			path: "/trade",
			component: Trade,
			meta: { show: true },
			//路由独享守卫
			beforeEnter: (to,from) => {
				// 必须在shopCart路由中进入
				if(from.path === '/shopCart') {
					return true
				}else {
					return false
				}
			}
		},
		{
			path: "/pay",
			component: Pay,
			meta: { show: true },
			beforeEnter: (to,from) => {
				// 必须在shopCart路由中进入
				if(from.path === '/trade') {
					return true
				}else {
					return false
				}
			}
		},
		{
			path: "/paySuccess",
			component: PaySuccess,
			meta: { show: true },
			beforeEnter: (to,from) => {
				// 必须在shopCart路由中进入
				if(from.path === '/pay') {
					return true
				}else {
					return false
				}
			}
		},
		{
			path: "/center",
			component: Center,
			meta: { show: true },
			children: [
				{
					path: 'myOrder',
					component: MyOrder
				},
				{
					path: 'groupOrder',
					component: GroupOrder
				},
				{
					path: '/center',
					redirect: '/center/myOrder'
				}
			]
		},
		{
			path: '/',
			redirect: '/home'
		}
	]
})

const store = useUserStore(pinia)
//全局守卫：前置守卫
router.beforeEach((to, from) => {
	//用户登录了，
	if (localStorage.getItem('token')) {
		//设定不允许跳转到login
		if (to.path == '/login') {
			return false
		} else {//跳转到其他页面
			if (store.userInfo.name) {//如果有用户信息
				return true
			} else {//如果没有用户信息
				//异步获取请求信息
				store.getUserInfo().
					then(() => true)
					//token过期了,自动退出登录，跳转到登录页面
					.catch(err => {
						store.userLogout().then(() => '/login')
					})
			}
		}
	}
	// 用户未登录
	else {
		// to.path === '/trade'
		//indexOf若没有包含此字符串则返回-1
		if (to.path.indexOf('/trade') != -1 || to.path.indexOf('/pay') != -1 || to.path.indexOf('/center') != -1) {
			// 把未登录的时候点击的路由保存在query参数中
			return ('/login?redirect=' + to.path)
		}
	}

})

export default router
