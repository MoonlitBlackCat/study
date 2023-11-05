import { reqCategoryList, reqGetBannerList, reqFloorList } from '@/api'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useHomeStore = defineStore('home', () => {
	//一个小测试
	const count = ref(1)
	function add() {
		count.value++;
	}

	//获取商品分类数据
	const categoryList = ref([])
	async function getCategoryList() {
		let result = await reqCategoryList();
		// console.log(this);
		// console.log(result);
		// console.log(categorylist);
		// console.log(this.categorylist);
		// console.log(this.categorylist===categorylist);
		if (result.code == 200) {
			// categorylist.value = result.data;
			categoryList.value = result.data;
			// console.log(categoryList);
			// console.log(this.categorylist);
			// console.log(this.categorylist === categorylist.value);
			// console.log(this.count);
			// console.log(count.value);
		}
	}

	//获取轮播图的数据
	const bannerList = ref([])
	async function getBannerList() {
		let result = await reqGetBannerList()
		if (result.code == 200) {
			bannerList.value = result.data
		}
	}
	
	//获取floor数据
	const floorList = ref([])
	async function getFloorList() {
		let result = await reqFloorList()
		if (result.code == 200) {
			floorList.value = result.data
		}
	}
	return {
		count,
		add,
		getCategoryList,
		categoryList,
		getBannerList,
		bannerList,
		getFloorList,
		floorList
	}

})