//这个模块：API进行统一管理
import requests from './request'
import mockRequests from './mockAxios'

// 三级联动接口
export const reqCategoryList = () => {
	//发请求
	return requests({
		method: 'get',
		url: '/product/getBaseCategoryList'
	})
}
//获取home首页轮播图接口
export const reqGetBannerList = () => {
	return mockRequests({
		method: 'get',
		url: '/banner'
	})
}
//获取floor数据
export const reqFloorList = () => mockRequests.get('/floor')

//获取search的数据 地址：/api/list 请求方式:post 需要带参数
export const reqGetSearchInfo = (params) => {
	return requests({
		url: '/list',
		method: 'post',
		data: params
	})
}

//获取商品详情信息的接口
export const reqGoodsInfo = (skuid) => {
	return requests({
		method: 'get',
		url: `/item/${skuid}`,
	})
}

// 将产品添加到购物车中
export const reqAddOrUpdateShopCart = (skuId, skuNum) => {
	return requests({
		url: `/cart/addToCart/${skuId}/${skuNum}`,
		method: 'post'
	})
}

//获取购物车列表数据的接口
export const reqCartList = () => {
	return requests({
		url: '/cart/cartList',
		method: 'get'
	})
}
//删除购物车数据接口
export const reqDeleteCartById = (skuId) => {
	return requests({
		url: `/cart/deleteCart/${skuId}`,
		method: 'delete'
	})
}

//#region 
//修改选中状态接口 似乎已经废弃了
// export const reqUpdateCheckedById = (skuId,isChecked) => {
// 	return requests({
// 		url:`/cart/checkCart/${skuId}/${isChecked}`,
// 		method:'get'
// 	})
// }
//#endregion

//获取验证码的接口
export const reqGetCode = (phone) => {
	return requests({
		url: `/user/passport/sendCode/${phone}`,
		method: 'get'
	})
}

//用户注册的接口
export const reqUserRegister = (data) => {
	return requests({
		url: '/user/passport/register',
		method: 'post',
		data
	})
}

//用户登录接口
export const reqUserLogin = (data) => {
	return requests({
		url: '/user/passport/login',
		method: 'post',
		data
	})
}

//获取用户的信息，token
export const reqUserInfo = () => {
	return requests({
		url: 'user/passport/auth/getUserInfo',
		method: 'get'
	})
}

//退出登录
export const reqLogout = () => {
	return requests({
		url: 'user/passport/logout',
		method: 'get'
	})
}

//获取用户地址信息
export const reqAddressInfo = () => {
	return requests({
		url: '/user/userAddress/auth/findUserAddressList',
		method: 'get'
	})
}

//获取商品清单
export const reqOrderInfo = () => {
	return requests({
		url: '/order/auth/trade',
		method: 'get'
	})
}

//提交订单的接口
export const reqSubmitOrder = (tradeNo, data) => {
	return requests({
		url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
		method: 'post',
		data
	})
}

//获取支付信息
export const reqPayInfo = (orderId) => {
	return requests({
		url: `/payment/weixin/createNative/${orderId}`,
		method: 'get'
	})
}

//获取支付订单状态
export const reqPayStatus = (orderId) => {
	return requests({
		url:`/payment/weixin/queryPayStatus/${orderId}`,
		method:'get'
	})
}

//获取个人中心数据
export const reqMyOrderList = (page,limit) => {
	return requests( {
		url:`/order/auth/${page}/${limit}`,
		method:'get'
	})
}