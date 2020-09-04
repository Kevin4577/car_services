import Vue from 'vue'
import App from './App'
import Utils from './api/Axiosimg.js' //全局引用,这次没用到,修改太麻烦
Vue.prototype.ajax = Utils;

// import pageHead from './components/page-head.vue' 全局引用组件,现在是在某个页面中单独引用
// Vue.component('page-head',pageHead)
Vue.config.productionTip = false

App.mpType = 'app'
const app = new Vue({
	...App,
})
app.$mount()
