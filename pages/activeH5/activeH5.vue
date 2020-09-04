<template>
	<view>
	    <web-view :webview-styles="webviewStyles" :src='url'></web-view>
	</view>
</template>
<script>
	
	export default {
	    data() {
	        return {
	            webviewStyles: {
	                progress: {
	                    color: '#FF3333'
	                }
	            },
				url:'',
	        }
	    },
		onShareAppMessage() {
			// console.log(options)
			// var Hid = options.Hid
			// var Token = uni.getStorageSync('Userdetail').token
			// this.url = `https://www.j1788.cn/h5?id=${Hid}&token=${Token}`
			// console.log(this.url)
		},
		onLoad(options) {
			console.log(options.Hid)
			var Hid = options.Hid
			var Token = uni.getStorageSync('Userdetail').token
			this.url = `https://www.j1788.cn/h5?id=${Hid}&token=${Token}&a=+Math.random()`
			console.log(this.url)
		},
	}
</script>

<style>
</style>
