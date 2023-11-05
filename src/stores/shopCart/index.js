import { reqCartList, reqDeleteCartById } from "@/api";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useshopCartStore = defineStore('shopCart', () => {
	//游客购物车总数据
	const cartList = ref([{}])
	async function getCartList() {
		const result = await reqCartList()
		if (result.code == 200) {
			cartList.value = result.data
		}
	}

	//购物车里面的东西
	const cartInfoList = computed(() => {
		//因为cartList.value[0] 至少是个空对象,.cartInfoList才不会报错，所以cartList是[{}]
		//当服务器返回的cartlist没有数据时，[{}]会被覆盖
		if (!cartList.value[0]) {
			cartList.value[0] = {}
		}
		return cartList.value[0].cartInfoList || []
		//cartList.value[0].cartInfoList
	})

	//调用删除购物车的接口函数
	async function deleteCartListById(skuId) {
		let result = await reqDeleteCartById(skuId)
		return result
	}

	//#region 
	// 修改购物车某一个产品的选中状态 似乎已经废弃掉了
	// async function updateCheckedById(skuId,isChecked) {
	// 	let result =  await reqUpdateCheckedById(skuId,isChecked)
	// 	console.log(result);
	// }
	//#endregion

	//删除全部勾选的产品
	function deleteAllCheckedCart() {
		let promiseAll = []
		cartInfoList.value.forEach(item => {
			let promise = item.isChecked == 1 ? deleteCartListById(item.skuId) : ''
			promiseAll.push(promise)
		});
		//Promise.all()接受一个数组，数组全是promise对象，当数组中的promise对象全成功是，返回的结果才算成功
		return Promise.all(promiseAll)

	}

	return {
		getCartList,
		cartList,
		cartInfoList,
		deleteCartListById,
		deleteAllCheckedCart
	}
})