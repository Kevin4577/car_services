<template>
	<view style="position: relative;background: #eee;height: 100vh;">
		<view>
			<image style="width: 750upx;height: 340upx;" src="../../static/orgbanner.png" mode=""></image>
		</view>
		<view style="width: 750upx;height: 340upx;position: absolute;top: 50upx;">
			<view style="margin-top: 100upx;padding:0 20upx;box-sizing: border-box;">
				<view style="border-radius: 10upx;padding: 20upx;box-sizing: border-box;">
					<view style="padding: 20upx;font-size: 26upx;background: #fff;border-radius: 20upx;" v-if="stores.sname != undefined">
						<view style="display: flex;align-items: center;">
							<image style="height: 28upx;width: 28upx;" src="../../static/shopmen.png" mode=""></image>
							<view style="margin-left: 10upx;font-size: 30upx;">
								所选门店
							</view>
						</view>
						<view style="padding:20upx ;display: flex;box-sizing: border-box;">
							<image style="width: 130upx;height: 96upx;margin-left: 10upx;" :src="stores.imgurl" mode=""></image>
							<view style="margin-left: 20upx;flex: 1;">
								<view style="font-size: 30upx;padding: 5upx 0;">
									{{stores.sname}}
								</view>
								<view style="font-size: 24upx;color: #999;display: flex;justify-content: space-between;padding: 5upx 0;">
									<view>
										{{stores.saddress}}
									</view>
								</view>
							</view>
						</view>
					</view>
					<view style="margin-top: 20upx;background: #fff;padding: 20upx;border-radius: 20upx;">
						<view style="font-size: 30upx;">
							所选项目
						</view>
						<view>
							<scroll-view scroll-y="true" style="height: 400upx;" v-if="length != 1">
								<view>
									<view v-for="(item,index) in ordergodds" :key='index'>
										<view style="display: flex;justify-content: space-between;box-sizing: border-box;padding: 10upx 0;">
											<image style="width: 142upx;height: 142upx;" :src="item.image" mode=""></image>
											<view style="flex: 1;padding: 10upx 20upx;background: #fff;">
												<view style="font-size: 28upx;">
													{{item.name}}
												</view>
												<view style="display: flex;margin-top: 20upx;font-size: 28upx;justify-content: space-between;">
													<view>
														数量：1
													</view>
													<view style="color: red;">
														￥{{item.price/100}}
													</view>
												</view>
											</view>
										</view>
									</view>
								</view>
							</scroll-view>
							<view v-if="length == 1">
								<view style="display: flex;justify-content: space-between;box-sizing: border-box;padding: 10upx 0;" v-for="(item,index) in ordergodds"
								 :key="index">
									<image style="width: 142upx;height: 142upx;" :src="item.image" mode=""></image>
									<view style="flex: 1;padding: 10upx 20upx;background: #fff;">
										<view style="font-size: 28upx;">
											{{item.name}}
										</view>
										<view style="display: flex;margin-top: 20upx;font-size: 28upx;justify-content: space-between;">
											<view>
												数量：1
											</view>
											<view style="color: red;">
												￥{{item.price/100}}
											</view>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
					<view style="box-sizing: border-box;padding-bottom:125upx ;margin-top: 20upx;">
						<view style="border-radius: 10upx;background: #fff;padding: 0 20upx;font-size: 28upx;">
							<view style="display: flex;justify-content: space-between;padding-top: 10upx;">
								<view style="color: #999999;">
									订单编号:
								</view>
								<view style="color: #999999;">
									{{orderlist.sn}}
								</view>
							</view>
							<view style="display: flex;justify-content: space-between;padding-top: 10upx;">
								<view style="color: #999999;">
									订单时间:
								</view>
								<view style="color: #999999;">
									{{orderlist.createTime}}
								</view>
							</view>
							<view style="display: flex;justify-content: space-between;padding: 10upx 0;">
								<view style="color: #999999;">
									支付状态:
								</view>
								<view style="color: #999999">
									<view v-if="orderlist.payStatus == 0">待付款</view>
									<view v-if="orderlist.payStatus == 1 && orderlist.payStatus == 2">已付款</view>
									<view v-if="orderlist.payStatus == 3">已退款</view>
									<view v-if="orderlist.payStatus == 4">已退款</view>
									<view v-if="orderlist.payStatus == 5">已退款</view>
								</view>
							</view>
						</view>
						<view style="border-radius: 10upx;background: #fff;margin-top: 20upx;padding: 0 20upx;font-size: 28upx;">
							<view style="display: flex;justify-content: space-between;padding-top: 10upx;">
								<view style="color: #999999;">
									商品总价:
								</view>
								<view style="color: #999999;">
									￥{{orderlist.orderAmount/100}}
								</view>
							</view>
							<view style="display: flex;justify-content: space-between;padding: 10upx 0;">
								<view style="color: #999999;">
									实付款:
								</view>
								<view style="color: #999999;">
									￥{{orderlist.needPayMoney/100}}
								</view>
							</view>
						</view>

					</view>

				</view>
			</view>
		</view>
		<view style="position: fixed;bottom: 0;width: 100%;height: 120upx;background: #fff;
		display: flex;align-items: center;padding: 0 30upx;box-sizing: border-box;">
			<view style="font-size: 28upx;color: #fff;background: #F66C2D;height: 68upx;line-height: 68upx;width: 100%;
			border-radius: 100upx;text-align: center;"
			 @click="lianxi()">
				联系客服
			</view>
		</view>

	</view>
</template>

<script>
	var http = require('@/api/token.js')
	export default {
		data() {
			return {
				stores: [],
				orderlist: [],
				length: 0,
				ordergodds: [],
				storeId: 0
			}
		},
		onLoad(options) {
			var ids = options.id
			http.post(`/app/order/findEsOrder.do?id=${ids}`, {}).then(res => {
				console.log(res)
				this.orderlist = res.data
				this.ordergodds = res.data.orderItems
				this.ordergodds.forEach((r) => {
					console.log(r.name)
				})
				console.log(this.ordergodds)
				this.length = this.ordergodds.length
				this.storeId = this.orderlist.storeId
				var lat1 = uni.getStorageSync('location').lat
				var lng1 = uni.getStorageSync('location').lng
				http.post(`/app/EsStore/findStoreByIdWithDistance.do?lat=${lat1}&lon=${lng1}&storeId=${this.storeId}`, {}).then(
					res => {
						console.log(res)
						this.stores = res.data
					})
			})
		},
		methods: {
			lianxi() {
				uni.makePhoneCall({
					phoneNumber: '400-039-1788'
				})
			}
		}
	}
</script>

<style>
</style>
