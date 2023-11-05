import { reqAddOrUpdateShopCart, reqGoodsInfo } from "@/api";
//封装游客身份模块uuid utils一般封装一些功能模块，例如正则什么的
import { getUUID } from "@/utils/uuid_token";
import { defineStore } from "pinia";
import { computed, ref } from "vue";


export const useDetailStore = defineStore('detail', () => {
	//获取产品详细信息
	const goodsInfo = ref({})
	async function getGoodsInfo(skuid) {
		let result = await reqGoodsInfo(skuid)
		if (result.code == 200) {
			goodsInfo.value = result.data
		}
	}

	// 无法及时获取数据，所以采用了计算属性
	const categoryView = computed(() => {
		return goodsInfo.value.categoryView || {}
	})
	const skuInfo = computed(() => {
		return goodsInfo.value.skuInfo || {}
	})
	const spuSaleAttrList = computed(() => {
		return goodsInfo.value.spuSaleAttrList || []
	})

	//因为服务器没有返回data所以不用存在pinia中 
	//async 的函数返回的一定是promise对象
	async function addOrUpdateShopCart(skuId, skuNum) {
		let result = await reqAddOrUpdateShopCart(skuId, skuNum)
		return result
		// if (result.code == 200) {
		// 	return ok
		// } else {
		// 	return Promise.reject(new Error('faile'))
		// }
	}

	// 游客临时身份
	const uuid_token = ref(getUUID())


	return {
		goodsInfo,
		getGoodsInfo,
		categoryView,
		skuInfo,
		spuSaleAttrList,
		addOrUpdateShopCart,
		uuid_token
	}
})