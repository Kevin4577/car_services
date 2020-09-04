<template>
	<view v-if="iosId == 1">
		<view style="position: fixed;bottom: 0;width: 100%;height: 100%;background: #000;opacity: 0.2;display: flex;justify-content: center;align-items: center;">

		</view>
		<view style="position: absolute;bottom: 0;width: 100%;height: 100%;display: flex;justify-content: center;align-items: center;">
			<view v-if="platform == 'android' || platform == 'devtools'" style="width: 520upx;height: 320upx;background: #FFFFFF;box-sizing: border-box;border-radius: 20upx;
			padding:40upx 0;display: flex;flex-direction: column;justify-content:space-between;align-items: center;">
				<view style="font-size: 32upx;">温馨提示</view>
				<view style="font-size: 28upx;width: 100%;text-align: center;padding: 0 20upx;box-sizing: border-box;">
					请前往{{phonemodel}}应用商店下载<p style="color:#F56B2D ;">1788车主服务app</p>
				</view>
				<view style="border-top: 1px solid #eee;width: 100%;text-align: center;
				padding-top: 20upx;font-size: 28upx"
				 @click="quxiao()">
					我知道了
				</view>
			</view>
			<!-- -->
			<view v-if="platform == 'ios'" style="width: 520upx;height: 320upx;background: #FFFFFF;box-sizing: border-box;border-radius: 20upx;
			padding:40upx 0;display: flex;flex-direction: column;justify-content:space-between;align-items: center;">
				<view style="font-size: 32upx;">温馨提示</view>
				<view style="font-size: 28upx;width: 100%;text-align: center;padding: 0 20upx;box-sizing: border-box;">
					请前往Appstore下载<p style="color:#F56B2D ;">1788车主服务app</p>
				</view>
				<view style="border-top: 1px solid #eee;width: 100%;text-align: center;
				padding-top: 20upx;font-size: 28upx"
				 @click="quxiao()">
					我知道了
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import getbanner from '@/getFocus/getFocus'
	export default {
		name: 'delago',
		props: {
			iosId: {
				type: Number
			},
			phonemodel: {
				type: String
			},
			platform: {
				type: String
			}
		},
		data() {
			return {
				ios: 0
			}
		},
		onLoad() {
			
		},
		methods: {
			quxiao() {
				this.$emit('quxiao')
			},
		}
	}
</script>

<style>
</style>
