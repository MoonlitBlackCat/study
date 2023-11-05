import { reqGetSearchInfo } from '@/api'
import { defineStore } from 'pinia'
import {  ref } from 'vue'

export const  useSearchStore = defineStore('search',() => {
	//获取search模块的数据
	let searchList = ref({})
	async function getSearchList(params = {}) {
		let result = await reqGetSearchInfo(params)
		if(result.code == 200) {
			searchList.value = result.data
		}
	}
	
	return {
		searchList,
		getSearchList
	}
})