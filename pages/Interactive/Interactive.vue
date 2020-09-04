<template>
<view class="">
	
</view>
</template>

<script>
	var http = require('@/api/token.js')

	export default {
		data() {
			return {

			}
			},
			onLoad(options){
				var ids = options.id
					http.post(`/app/my/getMsgByCatId.do?catid=${ids}&page=0&rows=10`, {}).then(res => {
						console.log(res)
						// this.messagelist = res.data
					})

				},
				methods: {
					
				}
		}
	
</script>

<style>
</style>
