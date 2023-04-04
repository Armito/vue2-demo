/*
 * @Author: your name
 * @Date: 2021-04-12 16:49:57
 * @LastEditTime: 2021-07-20 14:36:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-demo\src\main.js
 */
import Vue from 'vue'
import App from './App.vue'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import zh_ElementUI from 'element-ui/lib/locale/lang/zh-CN'
import en_ElementUI from 'element-ui/lib/locale/lang/en'

import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'
import zh_VXETable from 'vxe-table/lib/locale/lang/zh-CN'
import en_VXETable from 'vxe-table/lib/locale/lang/en-US'

import VueI18n from 'vue-i18n'

import './assets/css/main.css'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(VXETable)

const messages = {
    zh: {
        ...zh_ElementUI,
        ...zh_VXETable,
    },
    en: {
        ...en_ElementUI,
        ...en_VXETable,
    },
}
Vue.use(VueI18n, {
    i18n: (key, args) => i18n.t(key, args),
})
const i18n = new VueI18n({
    locale: 'en',
    messages,
})
new Vue({
    render: (h) => h(App),
}).$mount('#app')

export const qiankun = {
    // 应用加载之前
    async bootstrap(props) {
        console.log('app1 bootstrap', props)
    },
    // 应用 render 之前触发
    async mount(props) {
        console.log('app1 mount', props)
    },
    // 应用卸载之后触发
    async unmount(props) {
        console.log('app1 unmount', props)
    },
}
