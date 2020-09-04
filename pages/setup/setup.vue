<template>
	<view style="width: 100vw;height: 100vh;background: #eee;font-size: 28upx;">
		<view style="padding:0 30upx;background: #fff;">
			<view style="display: flex;justify-content: space-between;border-bottom: 1px solid #eee;align-items: center;" v-for="(item,index) in namelist"
			 :key='index' @click="getMessage(index)">
				<view class="" style="padding: 20upx 0;">
					{{item.text1}}
				</view>
				<image style="width: 15upx;height: 20upx;"  src="../../static/more.png" mode=""></image>
			</view>
		</view>
		<view style="padding:0 30upx;background: #fff;margin-top: 20upx;">
			<view style="" v-for="(item,index) in namelist1" :key='index'>
				<view style="display: flex;justify-content: space-between;border-bottom: 1px solid #eee;align-items: center;" @click="getxianqing(index)">
					<view class="" style="padding: 20upx 0;" >
						{{item.text1}}
					</view>
					<image style="width: 15upx;height: 20upx;"  src="../../static/more.png" mode=""></image>
				</view>
			</view>
		</view>
		<view style="display: flex;padding:0 20upx;margin-top: 30upx;">
			<view style="height: 80upx;background: #F56A2E;width: 100%;border-radius: 100upx;
								  color: #FFFFFF;text-align: center;line-height: 80upx;"
			@click="getOut()">
				退出当前账号
			</view>
		</view>
	</view>
</template>

<script>
	
	
	export default {
		data() {
			return {
				namelist: [{
						text1: '个人信息',
					},
				],
				namelist1: [{
						text1: '隐私政策',
						url: '../privacy/privacy'
					},
					{
						text1: '1788用户协议',
						url: '../customer/customer'
					},
					{
						text1: '关于1788',
						url: '../aboutus/aboutus'
					}
				],


			}
		},
		methods: {
			getMessage(index) {
				if (index === 0) {
					uni.navigateTo({
						url: '../personal/personal',
					})
				}
			},
			getxianqing(i){
				var URL = this.namelist1[i].url
				uni.navigateTo({
					url:URL
				})
			},
			getOut(){
				uni.clearStorageSync()
				uni.navigateBack({
					delta:1
				})
			}
			
		}
	}
</script>

<style>
</style>
