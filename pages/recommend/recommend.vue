<template>
	<view>
		<view v-for="(item,index) in imglist" :key="index" style="padding: 0 20upx;">
			<view style="display: flex;padding: 20upx;border-bottom: 1px solid #E6E6E6;">
				<image style="width: 200upx;height: 200upx;border-radius: 10upx;" :src="item.thumbnail" mode="aspectFill"></image>
				<view style="flex: 1;box-sizing: border-box;padding:0 20upx;">
					<view style="font-size: 28upx;">
						{{item.catName}}
					</view>
					<view style="font-size: 24upx;padding: 10upx 0;">
						{{item.intro}}
					</view>
					<view style="font-size: 22upx;padding: 10upx 0;">
						销量{{item.buyCount}}笔
					</view>
					<view style="display: flex; padding: 10upx 0;justify-content: space-between;">
						<view style="display: flex;">
							<view style="font-size: 26upx;font-weight: bold;color: red;">￥{{item.price/100}}</view>
							<view style="font-size: 20upx;text-decoration: line-through;color: #999;margin:10upx 0 0 8upx">￥{{item.mktprice/100}}</view>
						</view>
						<view style="padding: 5upx 20upx;background: #F66C2D;border-radius: 100upx;
						color: #fff;font-size: 24upx;" @click="recomBuy(item.goodsId)">
							购买
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	const http = require('@/api/token.js')
	export default{
		data(){
			return{
				imglist:[]
			}
		},
		onLoad() {
			http.post('/app/recommend/findEsRecommendList.do?page=1&rows=4', {}).then(res => {
				this.imglist = res.data.list
				console.log(res) //产品推荐
			})
		},
		methods:{
			recomBuy(id){
				if(uni.getStorageSync('Userdetail').token != undefined){
					var ids = id
					uni.navigateTo({
						url:`../productdetails/productdetails?id=${ids}`
					})
				}else{
					uni.navigateTo({
						url:'../login/login'
					})
				}
				
			}
		}
	}
</script>

<style>
</style>
