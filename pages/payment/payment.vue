<template>
	<view style="position: relative;background: #eee;height: 100vh;">
		<view>
			<image style="width: 750upx;height: 340upx;" src="../../static/orgbanner.png" mode=""></image>
		</view>
		<view style="width: 750upx;height: 340upx;position: absolute;top: 50upx;">
			<view style="margin-top: 50upx;padding:0 20upx;box-sizing: border-box;backg">
				<view style="">
					<view style="background: #fff;border-radius: 10upx;padding: 20upx;box-sizing: border-box;" 
					v-if="stores.sname != undefined">
						<view style="padding: 20upx;font-size: 26upx;" >
							<view style="display: flex;align-items: center;">
								<image style="height: 28upx;width: 28upx;" src="../../static/shopmen.png" mode=""></image>
								<view style="margin-left: 10upx;">
									所选门店
								</view>
							</view>
							<view style="padding:20upx ;display: flex;box-sizing: border-box;">
								<image style="width: 130upx;height: 96upx;margin-left: 10upx;" :src="stores.imgurl" mode=""></image>
								<view style="margin-left: 20upx;flex: 1;">
									<view style="font-size: 28upx;padding: 5upx 0;">
										{{stores.sname}}
									</view>
									<view style="font-size: 22upx;color: #999;display: flex;justify-content: space-between;padding: 5upx 0;">
										<view>
											{{stores.saddress}}
										</view>
									</view>
								</view>
							</view>
						</view>
						<view style="padding: 20upx;font-size: 26upx;" v-if="carid == 1">
							<view style="display: flex;align-items: center;">
								<image style="height: 22upx;width: 28upx;" src="../../static/shopcar.png" mode=""></image>
								<view style="margin-left: 10upx;">
									所选车型
								</view>
							</view>
							<view style="padding:20upx ;display: flex;box-sizing: border-box;">
								<image style="width: 100upx;height: 100upx;margin-left: 10upx;" :src="choosecar.brandImg" mode=""></image>
								<view style="margin-left: 20upx;flex: 1;">
									<view style="font-size: 28upx;padding: 5upx 0;">
										{{choosecar.modelCatName}}——{{choosecar.modelName}}
									</view>
									<view style="font-size: 22upx;color: #999;display: flex;justify-content: space-between;padding: 5upx 0;">
										{{choosecar.vehicleName}}
									</view>
								</view>
							</view>
						</view>
					</view>
					<view style="box-sizing: border-box;padding-bottom:125upx;margin-top: 20upx;">
						<view style="border-radius: 10upx;background: #fff">
							<view style="display: flex;justify-content: space-between;padding: 20upx;">
								<view style="font-size: 24upx;color: #999999;">
									姓名:
								</view>
								<view style="font-size: 24upx;color: #333333;">
									{{Userdetail.uname}}
								</view>
							</view>
							<view style="display: flex;justify-content: space-between;padding: 20upx;">
								<view style="font-size: 24upx;color: #999999;">
									联系电话:
								</view>
								<view style="font-size: 24upx;color: #333333;">
									{{Userdetail.umobile}}
								</view>
							</view>
							<view style="display: flex;justify-content: space-between;padding: 20upx;">
								<view style="font-size: 24upx;color: #999999;">
									订单编号:
								</view>
								<view style="font-size: 24upx;color: #333333;">
									{{ordernumber}}
								</view>
							</view>
							<view style="display: flex;justify-content: space-between;padding: 20upx;">
								<view style="font-size: 24upx;color: #999999;">
									订单时间:
								</view>
								<view style="font-size: 24upx;color: #333333;">
									{{orderTime}}
								</view>
							</view>
						</view>
						<view style="border-radius: 10upx;background: #fff;margin-top: 20upx;">
							<view style="display: flex;justify-content: space-between;padding: 20upx;">
								<view style="font-size: 24upx;color: #999999;">
									商品总价:
								</view>
								<view style="font-size: 24upx;color: #333333;">
									{{totalprice/100}}
								</view>
							</view>

							<view style="display: flex;justify-content: space-between;padding: 20upx;">
								<view style="font-size: 24upx;color: #999999;">
									实付款:
								</view>
								<view style="font-size: 24upx;color: #333333;">
									￥{{totalprice/100}}
								</view>
							</view>
						</view>
					</view>
				</view>

			</view>
		</view>

		<view style="position: fixed;bottom: 0upx;width: 100%;background: #fff;
		box-sizing: border-box;align-items: center;padding: 20upx;">
			<view style="display: flex;justify-content: space-between;align-items: center;float: right;">
				<view style="width: 160upx;height: 56upx;color: #999;line-height: 56upx;text-align: center;
					border-radius: 100upx;border: 1px solid #999;font-size: 30upx;margin-right: 10upx;"
				 @click="getcancel()">
					取消支付
				</view>
				<form report-submit="true" @submit="getsubmit">
					<button form-type="submit" style="width: 200upx;height: 66upx;color: white;line-height: 66upx;text-align: center;
					border-radius: 100upx;border: 1px solid #F56B2D;font-size: 30upx;margin-right: 10upx; background-color: #F56B2D;">
						立即支付
					</button>
				</form>
			</view>
		</view>
	</view>
</template>

<script>
	var http = require('@/api/token.js')
	export default {
		data() {
			return {
				time: 30,
				balance: 0,
				needPayMoney: 0,
				ordernumber: 0,
				orderTime: '',
				stores: {},
				ordergoods: {},
				choosecar: {},
				Userdetail: {},
				orders: {},
				getId: 0,
				Myorder: {},
				totalprice: 0,
				carid: 0,
				orderIds: 0
			}
		},
		onReady() {
			this.timekey()
		},
		onLoad(options) {
			this.getId = options.id
			this.carid = options.ids
			this.Userdetail = uni.getStorageSync('Userdetail')
			this.choosecar = uni.getStorageSync('maintainCar')
			console.log(uni.getStorageSync('maintainCar'))
			if (this.getId == 0) {
				this.stores = uni.getStorageSync('stores')
				console.log(this.stores)
				// if(uni.getStorageSync('stores') == {}){
				// 	console.log(1)
				// }else{
				// 	console.log(2)
				// }
				var ids = uni.getStorageSync('orderId').oid
				console.log(uni.getStorageSync('orderId'))
				this.orderIds = uni.getStorageSync('orderId').oid
				http.post(`/app/order/findEsOrder.do?id=${ids}`).then(res => {
					console.log(res)
					this.orders = res.data
					this.ordernumber = this.orders.sn
					this.orderTime = this.orders.createTime
					this.totalprice = this.orders.needPayMoney
				})
			} else {
				//mine里面order传过来的
				this.Myorder = uni.getStorageSync('MyOrder')
				console.log(this.Myorder)
				this.orderIds = this.Myorder.oid
				var sids = this.Myorder.storeId
				var ids = this.Myorder.oid
				var lat = uni.getStorageSync('location').lat
				var lon = uni.getStorageSync('location').lng
				http.post(`/app/EsStore/findEsStore.do?id=${sids}`).then(res => {
					console.log(res)
					this.stores = res.data
					console.log(this.stores)
				})
				http.post(`/app/order/findEsOrder.do?id=${ids}`).then(res => {
					console.log(res)
					this.orders = res.data

					this.ordernumber = this.orders.sn
					this.orderTime = this.orders.createTime
					this.totalprice = this.orders.needPayMoney
				})
			} //待付款页面过来



		},
		methods: {

			timekey() {
				var interval = setInterval(() => {
					if (this.time > 0) {
						this.time -= 1
					} else {
						clearInterval(interval)
						console.log('没了吗')
						return
					}
				}, 60000)

			},
			getcancel() {
				uni.redirectTo({
					url: `../cancel/cancel?id=${this.orderIds}`
				});
			},
			getsubmit: function(e) {
				var formId = e.detail.formId
				var openid = uni.getStorageSync('openid')
				http.post(`/app/pay/payOrder.do?orderId=${this.orderIds}&openid=${openid}&formId=${formId}&paytype=0`, {}).then(
					res => {
						console.log(res)
						if (res.code == 1) {
							uni.requestPayment({
								timeStamp: res.data.timeStamp,
								nonceStr: res.data.nonceStr,
								package: res.data.package,
								signType: res.data.signType,
								paySign: res.data.paySign,
								success: (res) => {
									console.log(res)
									uni.redirectTo({
										url: `../success/success?id=${this.orderIds}`
									});
								},
								fail: (res) => {

								}
							}) //formid   wxurl:''
						}else{
							uni.showToast({
								title:res.msg,
								duration:2000,
								icon:"none"
							})
						}
					})
			},
		}
	}
</script>

<style>
</style>
