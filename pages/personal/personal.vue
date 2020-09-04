<template>
	<view style="width: 100vw;height: 100vh;background: #eee;">
		<view style="padding:0 30upx;background: #fff;font-size: 28upx;">
				<view style="display: flex;justify-content: space-between;padding: 20upx;
				box-sizing: border-box;align-items: center;border-bottom: 1px solid #eee;">
					<view  >
						头像
					</view>
					<image style="width: 60upx;height: 60upx;border-radius: 100%;" :src="namelist.uheadimg" mode=""></image>
				</view>
				<view style="display: flex;justify-content: space-between;padding: 20upx;
				box-sizing: border-box;align-items: center;border-bottom: 1px solid #eee;">
					<view  >
						昵称
					</view>
					<view style="font-size:26upx;color: #999;display: flex;align-items: center;">
						<view>
							{{namelist.uname}} 
						</view>
						<image style="width: 15upx;height: 20upx;margin-left: 8upx;" src="../../static/more.png" mode=""></image>
					</view>
				</view>
				<view style="display: flex;justify-content: space-between;padding: 20upx;
				box-sizing: border-box;align-items: center;border-bottom: 1px solid #eee;">
					<view  >
						手机号
					</view>
					<view style="font-size:26upx;color: #999;display: flex;align-items: center;">
						<view>
							{{namelist.umobile}} 
						</view>
						<image style="width: 15upx;height: 20upx;margin-left: 8upx;" src="../../static/more.png" mode=""></image>
					</view>
				</view>
				<view style="display: flex;justify-content: space-between;padding: 20upx;
				box-sizing: border-box;align-items: center;border-bottom: 1px solid #eee;">
					<view  >
					 	性别
					</view>
					<view style="font-size:26upx;color: #999;display: flex;align-items: center;">
						<view>
							{{namelist.usex}} 
						</view>
						<image style="width: 15upx;height: 20upx;margin-left: 8upx;" src="../../static/more.png" mode=""></image>
					</view>
				</view>
		</view>
	</view>
</template>

<script>
	var http = require('@/api/token.js')
	export default {
		data() {
			return {
				namelist: []
			}
		},
		onLoad() {
			this.getmineinfo()
		},
		methods: {
			getmineinfo() {
				http.post('/app/my/getUserInfo.do', {}).then(res => {
					console.log(res)
					this.namelist = res.data
				})
			}
		}
	}
</script>

<style>
</style>
