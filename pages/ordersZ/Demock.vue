<template>
	<view v-if="cancelId == 1">
		<view style="width: 100%;height: 100%;position: fixed;top: 0;background: #666666;opacity: 0.3;z-index: 998;">
		
		</view>
		<view style="position: absolute;top: 400upx;width: 100%;display: flex;justify-content: center;z-index: 999;" >
			<view style="width: 480upx;height: 280upx;background: #fff;border-radius: 20upx;display: flex;
			flex-direction: column;justify-content: space-between;align-items: center;">
				<view style="font-size: 32upx;margin-top: 40upx;font-weight: bold;">
					温馨提示
				</view>
				<view style="font-size: 28upx;">
					是否确认操作
				</view>
				<view style="font-size: 26upx;width: 100%;display: flex;justify-content: space-between;border-top: 1px solid #eee;">
					<view style="flex: 2;text-align: center;border-right: 1px solid #eee;
					padding: 20upx 0;color: #999;" @click="confirmdele()" v-if="refundId == 1">
					确认删除
					</view>
					<view style="flex: 2;text-align: center;border-right: 1px solid #eee;
					padding: 20upx 0;color: #999;" @click="confirmdele()" v-if="refundId == 2">
					确认退款
					</view>
					<view style="flex: 2;text-align: center;padding: 20upx 0;color: #F56B2D;" @click="waitthink()">我再想想</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		name:"demock",
		props:{
			cancelId:{
				type:Number
			},
			refundId:{
				type:Number
			}
		},
		methods:{
			// dele(){
			// 	this.$emit('dele')
			// },
			confirmdele(){
				this.$emit('confirmdele')
			},
			waitthink() {
				this.$emit('waitthink')
			},
		}
	}
</script>

<style>
</style>
