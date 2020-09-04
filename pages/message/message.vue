<template>
	<view style="width: 100vw;height: 100vh;background: #eee;overflow: hidden">
		<view class="" style="background: #fff;margin-top: 20upx;">
			<view style="padding: 20upx;display: flex;align-items: center;" v-for="(item,index) in messagelist" :key='index' @click="getmsg(item.mcid)">
					<view v-for="(ite,inde) in messageimg" :key="inde" v-if="inde == index">
						<image style="width: 72upx;height: 72upx;" :src="ite.img" mode=""></image>
					</view>
					<view class="" style="margin-left: 50upx;">
						<view class="" style="font-size: 26upx;">
							{{item.mcname}}
						</view>
						<view>
							<view class="" style="font-size: 20upx;color: #999999;" v-if="item.newsMsg == null">
								暂无消息
							</view>
							<view class="" style="font-size: 20upx;color: #999999;" v-if="item.newsMsg != null">
								{{item.newsMsg}}
							</view>
						</view>
						
					</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	var http = require('@/api/token.js')
	
	export default{
		data(){
			return{
				messagelist:[],
				messageimg:[
					{
						img:'../../static/return5.png',
					},
					{
						img:'../../static/return4.png',
					
					},
				]
			}
		},
		onLoad() {
			http.post('/app/my/getMsgCats.do',{}).then(res =>{
				console.log(res)
				this.messagelist = res.data
			})
			
		},
		methods:{
			getmsg(id){
				console.log(id)
				var ids = id
				uni.navigateTo({
					url:`../Interactive/Interactive?id=${ids}`
				})
			}
		}
	}
</script>

<style>
</style>
