import { createApp } from 'vue'
import App from './App.vue'
import i18n from '@/locales/index'
import 'element-plus/dist/index.css'
import '@/style/style.scss'
import router from '@/router/index'
import { setupAbCore } from 'agilebpm'
// @ts-ignore
import { setupFormDesign } from 'abFormDesigner'
import 'virtual:svg-icons-register'

import ElementPlus from 'element-plus'
import pinia from './store'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// 适配给 agilebpm组件 状态管理使用,为了组件与平台解耦，但是组件又需要这些方法
import { useAbStoreAdapter } from '@/store/modules/abStoreAdapter'
;(window as any).useAbStoreAdapter = useAbStoreAdapter

setupAbCore(app)
setupFormDesign(app)
app.use(i18n)
app.use(pinia)
app.use(ElementPlus)
app.use(router)
app.mount('#app')
