<template>
	<view>
		<scroll-view scroll-y="true" v-show="tabIndex == 1" style="background: #fff;margin-top: 75upx;height: 100vh;"
		 @scrolltoupper="pushrefresh2" @scrolltolower="loadmore">
			<view v-if="mototal == 0">
				<view style="padding: 20upx;color: #CCCCCC;">暂无交易信息!</view>
			</view>
			<view v-if="mototal != 0" style="padding:20upx;background: #FFFFFF">
				<view style="display: flex;box-sizing: border-box;justify-content: space-between;padding: 0 5upx;">
					<view>
						<view v-for="(item,index) in leftmglist" :key="index" style="border-radius: 20upx;width: 340upx;display: flex;flex-wrap: wrap;justify-content: center;
						padding-bottom: 10upx ;box-shadow: 0 0 10upx #999;margin-top: 10upx;"
						 @click="getactionId(item.transactionId)">
							<image style="width: 340upx;height: 250upx;border-radius:20upx;" :src="item.extInfo" mode="aspectFill"></image>
							<view style="font-size: 24upx;width: 300upx;padding: 5upx 0;">
								{{item.content}}
							</view>
							<view style="display: flex;font-size: 20upx;align-items: center;box-sizing: border-box;
							width: 300upx;justify-content: space-between;padding:5upx 10upx;">
								<view style="color: red;">
									￥{{item.price/100}}
								</view>
								<view>
									{{item.countyName}}
								</view>
							</view>
							<view style="display: flex;align-items: center;width: 300upx;">
								<image style="width: 30upx;height: 30upx;border-radius: 100%;" :src="item.memberImgurl" mode=""></image>
								<view style="font-size: 24upx;margin-left: 20upx;">
									{{item.memberName}}
								</view>
							</view>
						</view>
					</view>
					<view>
						<view v-for="(item,index) in rightmglist" :key="index" style="border-radius: 20upx;width: 340upx;display: flex;flex-wrap: wrap;justify-content: center;
						padding-bottom: 10upx ;box-shadow: 0 0 10upx #999;margin-top: 10upx;"
						 @click="getactionId(item.transactionId)">
							<image style="width: 340upx;height: 320upx;border-radius:20upx;" :src="item.extInfo" mode="aspectFill"></image>
							<view style="font-size: 24upx;width: 300upx;padding: 5upx 0;">
								{{item.content}}
							</view>
							<view style="display: flex;font-size: 20upx;align-items: center;box-sizing: border-box;
							width: 300upx;justify-content: space-between;padding:5upx 10upx;">
								<view style="color: red;">
									￥{{item.price/100}}
								</view>
								<view>
									{{item.countyName}}
								</view>
							</view>
							<view style="display: flex;align-items: center;width: 300upx;">
								<image style="width: 30upx;height: 30upx;border-radius: 100%;" :src="item.memberImgurl" mode=""></image>
								<view style="font-size: 24upx;margin-left: 20upx;">
									{{item.memberName}}
								</view>
							</view>
						</view>
					</view>

				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		name: 'Utrans',
		props: {
			mototal:{
				type:Number
			},
			tabIndex:{
				type:Number
			},
			leftmglist:{
				type:Array
			},
			rightmglist:{
				type:Array
			}
		},
		data() {
			return {
				
			}
		},
		methods:{
			pushrefresh2(){
				this.$emit('pushrefresh2')
			},
			loadmore(){
				this.$emit('loadmore')
			},
			getactionId(id){
				this.$emit('getactionId',id)
			}
		}
	}
</script>

<style>
</style>
