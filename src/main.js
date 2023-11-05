import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
const app = createApp(App)
import pinia from './stores/pinia'

// 三级联动组件--注册为全局组件，因为多个页面要使用
import TypeNav from '@/components/TypeNav'
import Carousel from '@/components/Carousel'
import Pagenation from '@/components/Pagenation'

//第一个参数：全局组件的名字，第二个参数：组件自身
app.component(TypeNav.name, TypeNav)
app.component(Carousel.name, Carousel)
app.component(Pagenation.name, Pagenation)

//将API接口打包
import * as API from '@/api'
app.provide('API',API)

//引入自定义插件
import plugins from '@/plugins/example'
app.use(plugins, {
	name:'obj'
})

//引入mock数据
import '@/mock/mockServe'




app.use(router).use(API).use(pinia).mount('#app')
