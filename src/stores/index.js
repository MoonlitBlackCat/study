import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

import { useHomeStore } from './home/index'
import { useSearchStore } from './search/index'
import { useDetailStore } from './detail/index'
import { useshopCartStore } from './shopCart/index'
import { useUserStore } from './user/index'
import { useTradeStore } from './trade/index'


export { useHomeStore, useSearchStore, useDetailStore, useTradeStore, useshopCartStore, useUserStore }
// export const useCounterStore = defineStore('counter', () => {
// 	const count = ref(0)
// 	const doubleCount = computed(() => count.value * 2)
// 	function increment() {
// 		count.value++
// 	}

// 	return { count, doubleCount, increment}
// })


// export const useCounterStore = defineStore('counter', {
// 	state: () => ({ count: 0 }),
// 	getters: {
// 		double: (state) => state.count * 2,
// 	},
// 	actions: {
// 		increment() {
// 			this.count++
// 		},
// 	},
// })
