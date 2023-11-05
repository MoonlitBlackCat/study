//插件是一个对象，但是对象中有indstall方法
let plugins = {
	//插件两个参数，一个是获取到app实例，一个是自己写的配置项
	install:(app,option) => {
		//这个是全局自定义指令
		//第一个参数是自定义指令的名字，用在模版中要添加v-
		//第二个参数是一个回调或对象，回调的第一个参数是当前的元素实例,第二个参数是一个binding对象
		app.directive(option.name,(element,binding) => {
			//自定义指令功能是将自定义指令收到的值变成大写展示
			//具体实现在APP.vue中
			element.innerText = binding.value.toUpperCase()
		})
	}
}

export default plugins