import { reqAddressInfo, reqOrderInfo } from "@/api";
import { defineStore } from "pinia";
import { reactive, ref } from "vue";

export const useTradeStore = defineStore('trade', () => {
	//获取用户地址信息
	const address = ref([])
	async function getUserAddress() {
		let result = await reqAddressInfo()
		if (result.code == 200) {
			address.value = result.data
		}
	}

	//获取商品清单数据
	const orderInfo = ref({})
	async function getOderInfo() {
		let result = await reqOrderInfo()
		if(result.code == 200) {
			orderInfo.value = result.data
		}
	}
	return {
		getUserAddress,
		address,
		getOderInfo,
		orderInfo,
	}
})