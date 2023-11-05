import { reqGetCode, reqLogout, reqUserInfo, reqUserLogin, reqUserRegister } from "@/api";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore('user', () => {
	//模拟验证码发送到手机上
	const code = ref('')
	async function getCode(phone) {
		let result = await reqGetCode(phone)
		if (result.code == 200) {
			code.value = result.data
		}
	}

	//用户注册 
	async function userRegister(user) {
		let result = await reqUserRegister(user)
		if (result.code == 200) {
			return 'ok'
		} else {
			return Promise.reject(new Error('错啦错啦'))
		}
	}

	//用户登录
	async function userLogin(data) {
		let result = await reqUserLogin(data)
		if (result.code == 200) {
			if (!localStorage.getItem('token')) {
				localStorage.setItem('token', result.data.token)
			}
		} else {
			return Promise.reject(new Error('登录失败'))
		}
	}

	//获取用户登录信息
	const userInfo = ref({})
	async function getUserInfo() {
		let result = await reqUserInfo()
		if (result.code == 200) {
			userInfo.value = result.data
			return 'ok'
		}else{
			return Promise.reject(new Error('获取用户信息失败'))
		}
	}

	//退出登录 清除服务器的token 和用户信息
	async function userLogout() {
		let result = await reqLogout()
		if(result.code == 200) {
			localStorage.removeItem('token')
			userInfo.value = {}
			return 'ok'
		}else {
			return Promise.reject(new Error('退出失败'))
		}
	}


	return {
		code,
		getCode,
		userRegister,
		userLogin,
		getUserInfo,
		userInfo,
		userLogout

	}
})