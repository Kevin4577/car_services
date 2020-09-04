<template>
	<view></view>
</template>

<script>
	export default{
		data(){
			return{}
		},
		methods:{
		  goto:function(){
			  uni.navigateTo({
			  	url:'../registration/registration'
			  })
		  }
		}
	}
</script>

<style>
</style>
