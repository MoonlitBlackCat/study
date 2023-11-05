import { v4 as uuidv4 } from 'uuid';

//要生成一个随机字符串，且每次执行不能发生变化，游客身份持久存储
export const getUUID = () => {
	const uuid_token = localStorage.getItem('uuidToken') || uuidv4()
	//如果本地存储中没有uuid
	if (!localStorage.getItem('uuidToken')) {
		localStorage.setItem('uuidToken', uuid_token)
	}
	return uuid_token
}