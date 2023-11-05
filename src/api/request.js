//对axios进行二次封装
import axios from 'axios'
//引入进度条
import nProgress from 'nprogress';
//引入进度条样式
import 'nprogress/nprogress.css'
import { useDetailStore, useUserStore } from '@/stores'

// 1.利用axios对象的方法create	，去创建一个axios实例
const requests = axios.create({
	//基础路径
	baseURL: '/api',
	//超时时间5s
	// timeout:5000,
})

// 请求拦截器
requests.interceptors.request.use((config) => {
	//添加一个请求头实现游客登录
	const store = useDetailStore()
	if (store.uuid_token) {
		config.headers.userTempId = store.uuid_token
	}

	//携带token实现正式用户登录
	if (localStorage.getItem('token')) {
		config.headers.token = localStorage.getItem('token')
		// console.log(localStorage.getItem('token'));
	}
	//进度条开始
	nProgress.start()
	//config：配置对象，对象里面有一个属性重要：headers请求头
	return config
});
// 响应拦截器
requests.interceptors.response.use((res) => {
	//进度条结束
	nProgress.done()
	//成功的回调函数
	return res.data
}, err => {
	//失败的回调
	return Promise.reject(err)
})
export default requests