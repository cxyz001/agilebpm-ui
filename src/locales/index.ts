
import { useDefaultConfig } from "@/config/defaultConfig"
import { createI18n } from 'vue-i18n'
import el_zh_cn from 'element-plus/lib/locale/lang/zh-cn'
import el_en from 'element-plus/lib/locale/lang/en'
import zh_cn from './lang/zh-cn'
import en from './lang/en'
const config  =useDefaultConfig()
const messages = {
	'zh-cn': {
		el: el_zh_cn,
		...zh_cn
	},
	'en': {
		el: el_en,
		...en
	}
}

const i18n = createI18n({
	locale:  config.LANG,
	fallbackLocale: 'zh-cn',
	globalInjection: true,
	allowComposition:true,
	messages,
})
export default i18n;
