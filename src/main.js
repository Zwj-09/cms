import { createApp } from 'vue'
import App from './App.vue'
import pinia from './store'
import router from './router'
import request from './api/request.js'

import ElementPlus from 'element-plus'
import locale from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/dist/index.css'

const app = createApp(App)

// // 挂载 axios 实例
app.config.globalProperties.$http = request

app.use(ElementPlus, { locale })
app.use(pinia)
app.use(router)
app.mount('#app')
