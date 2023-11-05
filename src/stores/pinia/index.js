// vue-router的创建时间比pinia早，无法再router中使用pinia，所以要单独引入pinia
import { createPinia } from "pinia";

const pinia =createPinia()
export default pinia