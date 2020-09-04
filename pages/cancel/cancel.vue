<template>
	<view style="background: #eee;overflow: hidden;">
		 <view style="background: #fff;margin-top: 20upx;">
		 	<view style="display: flex;flex-direction: column;align-items: center;padding: 60upx 0;">
		 		<image style="width: 121upx;height: 121upx;" src="../../static/false.png" mode=""></image>
				<view style="font-size: 30upx;margin-top: 30upx;">
					订单支付取消
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
								支付状态：
							</view>
							<view v-if="namelist.status == 1">
								已支付
							</view>
							<view v-if="namelist.status == 8">
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
		 </view>
	</view>
</template>

<script>
	var http = require('@/api/token.js')
	export default{
		data(){
			return{
				namelist:[]
			}
		},
		onLoad(options) {
			var ids = options.id
			this.orderId = options.id
			this.getorderinfo()
		},
		methods:{
			getorderinfo(){
				http.post(`/app/order/cancelEsOrder.do?oid=${this.orderId}`, {}).then(res => {
					console.log(res)
					// this.stores = res.data
					
				})
				http.post(`/app/order/findEsOrder.do?id=${this.orderId}`,{}).then(res =>{
					console.log(res)
					this.namelist = res.data
				})
			}
		}
	}
</script>

<style>
</style>
