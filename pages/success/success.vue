<template>
	<view style="background: #eee;overflow: hidden;">
		 <view style="background: #fff;margin-top: 20upx;">
		 	<view style="display: flex;flex-direction: column;align-items: center;padding: 60upx 0;">
		 		<image style="width: 121upx;height: 121upx;" src="../../static/success.png" mode=""></image>
				<view style="font-size: 30upx;margin-top: 30upx;">
					订单支付成功
				</view>
		 	</view>
			<view style="padding:0 60upx;">
				<view style="padding: 20upx;border-bottom: 1px dashed #999;">
					<view style="font-size: 28upx;"   :key='index'>
						<view style="display: flex;">
							<view>
								订单编号：
							</view>
							<view>
								{{namelist.sn}}
							</view>
						</view>
						<view style="display: flex;">
							<view>
								实付金额：
							</view>
							<view>
								￥{{namelist.orderAmount/100}}
							</view>
						</view>
						<view style="display: flex;">
							<view>
								支付方式：
							</view>
							<view>
								微信支付
							</view>
						</view>
						<view style="display: flex;">
							<view>
								支付状态：
							</view>
							<view v-if="namelist.status == 1">
								已支付
							</view>
							<view v-if="namelist.status == 0">
								未支付
							</view>
						</view>
					</view>
				</view>
				<view style="padding:20upx;">
					<view style="font-size: 28upx;"  :key='index'>
						<view style="display: flex;">
							<view>
								联系人：
							</view>
							<view>
								{{namelist.shipName}}
							</view>
						</view>
						<view style="display: flex;">
							<view>
								联系电话：
							</view>
							<view>
								{{namelist.shipMobile}}
							</view>
						</view>
					</view>
				</view>
			</view>
			<view style="position: fixed;bottom: 100upx;display: flex;justify-content: center;align-items: center;width: 100%;"  @click="checkeddetial()">
			
					<view style="width: 660upx;height: 80upx;color: #fff;line-height: 80upx;text-align: center;
					background: linear-gradient(to right, #FF6951, #FF9655);border-radius: 100upx;" >
						查看订单详情
					</view>
				
			</view>
		 </view>
	</view>
</template>

<script>
	const http  = require('@/api/token.js')
	export default{
		data(){
			return{
				namelist:[],
				orderId:0
			}
		},
		onLoad(options) {
			var ids = options.id
			this.orderId = options.id
			http.post(`/app/order/findEsOrder.do?id=${ids}`, {}).then(res => {
				console.log(res)
				// this.stores = res.data
				this.namelist = res.data
			})
		},
		methods:{
			checkeddetial(){
				console.log(1)
				uni.navigateTo({
					url:`../orderdetail/orderdetail?id=${this.orderId}`
				})
			}
		}
	}
</script>

<style>
</style>
