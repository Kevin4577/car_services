<template>
	<view style="background: #eee;height: 100vh;">
		<view style="padding-bottom:140upx;background: #eee;">
			<view style="overflow: hidden;">
				<view style="width: 750upx;background: #fff;margin-top: 10upx;padding: 20upx;box-sizing: border-box;">
					<view style="display: flex;padding: 0 20upx;box-sizing: border-box;border-bottom: 1px solid #ccc;">
						<view style="flex: 2;border-right:1px solid #ccc ;padding: 10rpx 0;">
							<view style="font-size: 28upx;color: #999;">
								姓名
							</view>
							<view style="font-size: 32upx;">
								<input type="text" :value="Userdetail.uname" placeholder="请输入您的真实姓名" />
							</view>
						</view>
						<view style="flex: 2;padding: 10rpx 20upx;">
							<view style="font-size: 28upx;color: #999;">
								手机号
							</view>
							<view style="font-size: 32upx;">
								{{Userdetail.umobile}}
							</view>
						</view>
					</view>
					<view style="padding: 10upx 20upx;box-sizing: border-box;align-items: center;background: #fff">
						<view>
							<view style="font-size: 22upx;color: #999999;padding: 10upx 0;">
								所选门店
							</view>
							<view>
								<view style="font-size: 32upx;color: #333333;padding: 10upx 0;">
									{{datalist.sname}}
								</view>
								<view style="display: flex;font-size: 22upx;align-items: center;padding: 10upx 0;">
									<view>
										<text style="color: #666666;">总评分</text>
										<text style="margin-left: 5upx;color: #D60808;">{{datalist.comScore}}</text>
									</view>
									<view style="margin-left: 20upx;">
										<text style="color: #666666;">总订单</text>
										<text style="margin-left: 5upx;color: #D60808;">{{datalist.sbuyCount}}</text>
									</view>
								</view>
								<view style="padding: 10upx 0;font-size: 22upx;display: flex;align-items: center;">
									<image style="width: 22upx;height: 28upx;" src="../../static/ding.png" mode=""></image>
									<!-- postion就是ding -->
									<view style="margin-left: 20upx;">
										{{datalist.saddress}} 
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view style="margin-top: 20upx;background: #fff;padding: 20upx;">
					<view>
						所选项目
					</view>
					<view>
						<scroll-view scroll-y="true" style="height: 400upx;" v-if="getId == 0">
							<view style="padding: 20upx;">
								<view v-for="(item,index) in shoplist" :key='index'>
									<view v-for="(ite,inde) in item.items" :key="inde">
										<view v-for="(it,ind) in ite.goods " :key="ind" style="display: flex;justify-content: space-between;box-sizing: border-box;padding: 10upx 0;">
											<image style="width: 142upx;height: 142upx;" :src="it.mgimgUrl" mode="aspectFill"></image>
											<view style="flex: 1;padding: 10upx 20upx;background: #fff;">
												<view style="font-size: 24upx;">
													{{it.mgname}}
												</view>
												<view style="display: flex;margin-top: 20upx;font-size: 26upx;justify-content: space-between;">
													<view>
														X{{it.count}}
													</view>
													<view style="color: red;">
														￥{{it.mgprice/100}}
													</view>
												</view>
											</view>
										</view>
									</view>
								</view>
							</view>
						</scroll-view>
						<view style="padding: 20upx;" v-if="getId != 0">
							<view style="display: flex;justify-content: space-between;box-sizing: border-box;padding: 10upx 0;">
								<image style="width: 142upx;height: 142upx;" :src="ordergoods.thumbnail" mode="aspectFill"></image>
								<view style="flex: 1;padding: 10upx 20upx;background: #fff;">
									<view style="font-size: 24upx;">
										{{ordergoods.name}}
									</view>
									<view style="display: flex;margin-top: 20upx;font-size: 26upx;justify-content: space-between;">
										<view>
											数量：1
										</view>
										<view style="color: red;">
											￥{{ordergoods.price/100}}
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>

				</view>
				<view style="margin-top: 20upx;background: #fff;padding:0 20upx">
					<view style="display: flex;padding: 20upx;justify-content: space-between;box-sizing: border-box;align-items: center;">
						<view style="font-size: 26upx;">
							可用余额
						</view>
						<view style="margin-right: -20upx;">
							<switch style="transform:scale(0.7)" @change="getcheckstate" :checked="ifchecked" :disabled="isdisable" />
						</view>
					</view>
				</view>
				<view style="margin-top: 20upx;background: #fff;padding:0 20upx;">
					<view style="display: flex;padding: 20upx;justify-content: space-between;box-sizing: border-box;">
						<view style="font-size: 26upx;">
							抵扣
						</view>
						<view style="">
							￥{{balance/100}}
						</view>
					</view>

				</view>
			</view>
		</view>
		<view style="position: fixed;bottom: 0;padding: 20upx;background: #fff;height: 120upx;width: 100%;display: flex;justify-content: center;box-sizing: border-box;">
			<view style="display: flex;justify-content: space-between;width: 100%;padding: 0 30upx;">
				<view style="display: flex;align-items: center;font-size: 28upx;">
					<view style="margin-left: 20upx;">合计</view>
				</view>
				<view style="display: flex;align-items: center;font-size: 30upx;">
					<view style="color: #F56B2D;">￥{{needPayMoney/100}}</view>

					<view style="margin-left: 20upx;width: 160upx;height: 56upx;line-height: 56upx;
						  text-align: center;background:#F56B2D;border-radius: 100upx;color: #fff;"
					 @tap="goNavget">
						提交订单
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	const http = require('@/api/token.js')
	export default {
		data() {
			return {
				number: '0',
				totalprice: 0,
				datalist: [],
				shoplist: [], //保养数据
				ordergoods: {}, //洗车数据
				Userdetail: {},
				orderItems: [],
				orderprice: 0,
				getId: 0,
				balance: 0,
				needPayMoney: 0,
				ifchecked: true,
				isdisable: false,
				mccountlock: 0,
				fromHd: 0,
				otype: 0,
			}
		},
		onShow(options) {
			if (this.getId == 0) {
				console.log(uni.getStorageSync('Totalgoods'))
				this.shoplist = uni.getStorageSync('Totalgoods')
				console.log(this.shoplist) //保养
			}
		},
		onLoad(options) {
			console.log(options)
			console.log(options.id)
			if (options.id != undefined) {
				this.getId = options.id
			} else {
				this.getId = options.goodsId
			}
			if (options.index != undefined) {
				this.orderprice = Number(options.index)
			}
			if (options.orderFrom != undefined) {
				this.fromHd = 1
				if(options.orderFrom === 'kj') {
					this.otype = 5
				} else if(options.orderFrom === 'ms') {
					this.otype = 3
				}
			}
			this.getmyinfo()
		},
		methods: {
			getmyinfo() {
				http.post(`/app/my/getUserInfo.do`, {}).then(res => {
					console.log(res)
					console.log(res.data.mccountlock)
					this.mccountlock = res.data.mccountlock  
					console.log(this.mccountlock)
					if (res.code == 1) {
						this.Userdetail = uni.getStorageSync('Userdetail')
						if (this.getId == 0) {
							this.datalist = uni.getStorageSync('Arrayitem') //所选门店
							if(this.datalist.comScore == null){
								this.datalist.comScore = 0
							}
							if(this.datalist.sbuyCount == null){
								this.datalist.sbuyCount = 0
							}
							console.log(uni.getStorageSync('Arrayitem'))
							uni.setStorageSync('stores', this.datalist)

						} //从保养过来
						else {
							this.getwaterto()
							//从洗车过来
						}
					}
					this.getzCode()
				})
			},
			getcheckstate: function(e) {
				this.ifchecked = e.detail.value
				this.getzCode()
			},
			getzCode() {
				if (this.ifchecked == true) {
					console.log(this.orderprice)
					// console.log(this.balance)
					if (this.mccountlock >= this.orderprice) {
						this.balance = this.orderprice
						this.needPayMoney =  0
					} else {
						this.balance = this.mccountlock
						this.needPayMoney = this.orderprice - this.mccountlock
					}
				} else {
					this.needPayMoney = this.orderprice
					this.balance = 0
					console.log(this.needPayMoney)
				}
			},
			getwaterto() {
				var lat = uni.getStorageSync('location').lat
				var lng = uni.getStorageSync('location').lng
				http.post(`/app/goods/findEsGoodsByDistance.do?id=${this.getId}&lat=${lat}&lon=${lng}`, {}).then(res => {
					console.log(res)
					this.datalist = res.data.store
					if(this.datalist.comScore == null){
						this.datalist.comScore = 0
					}
					if(this.datalist.sbuyCount == null){
						this.datalist.sbuyCount = 0
					}
					uni.setStorageSync('stores', this.datalist)
					this.ordergoods = res.data
					if(this.ordergoods.isnobalance == 0){
						this.isdisable = false //不禁用
						this.ifchecked = true
					}else{
						this.isdisable = true //禁用
						this.ifchecked = false
					}
					this.orderprice = this.ordergoods.price
					console.log(this.orderprice)
					this.getzCode()
				})
			},
			goNavget() {
				if (this.getId != 0) {
					console.log(this.ordergoods.price, this.needPayMoney, this.balance)
					var data = {
						"balance": this.balance,
						"memberId":uni.getStorageSync('Userdetail').uid,
						"carMemberId": 0,
						"cmid": 0,
						"goodsNum": 1,
						"needPayMoney": this.needPayMoney,
						"omileage": 0,
						"orderAmount": this.ordergoods.price,
						"orderGoodsType": 0,
						"orderItems": [{
							"catId": this.ordergoods.catId,
							"goodsId": this.ordergoods.goodsId,
							"goodsType": this.ordergoods.goodsType,
							"image": this.ordergoods.thumbnail,
							"itemId": 0,
							"name": this.ordergoods.name,
							"num": 1,
							"orderId": 0,
							"price": this.ordergoods.price,
							"unit": this.ordergoods.unit,
							"isFromHd": 0
						}],
						"otype": 0,
						"payType": 0,
						"shipMobile": this.Userdetail.umobile,
						"shipName": this.Userdetail.uname,
						"storeId": this.datalist.storeId,
						"relatedOrderId":null
					}
				} else {
					//保养过来
					this.shoplist.forEach((r)=>{
						r.items.forEach((e) =>{
							e.goods.forEach((s)=>{
							  var orderItems = {
									"changedGoodsId":s.changedGoodsId,
									"catId": s.mgcatId,
									"goodsId": s.mgid,
									"goodsType": 'normal',
									"image": s.mgimgUrl,
									"itemId": 0,
									"isFromHd": 0,
									"name": s.mgname,
									"num": s.count,
									"orderId": 0,
									"price": s.mgprice,
									"unit": '个'
								}
								this.orderItems.push(orderItems)
								console.log(this.orderItems)
							})
						})
					})
					var choosecar = uni.getStorageSync('maintainCar')
					console.log(choosecar)
					console.log(this.needPayMoney, this.balance)
					// var memberId = uni.getStorageSync('Userdetail').uid
					var data = {
						"memberId":uni.getStorageSync('Userdetail').uid,
						"balance": this.balance,
						"carMemberId": choosecar.id,
						"cmid": 0,
						"goodsNum": 1,
						"needPayMoney": this.needPayMoney,
						"omileage": 0,
						"orderAmount": this.orderprice,
						"orderGoodsType": 1,
						"orderItems": this.orderItems,
						"otype": 1,
						"payType": 0,
						"ovehicleNum": choosecar.vehicleNum,
						"shipMobile": this.Userdetail.umobile,
						"shipName": this.Userdetail.uname,
						"storeId": this.datalist.storeId,
						"relatedOrderId":null
					}
				}
				http.post('/app/mshd/addEsChangOrder.do', data).then(res => {
					console.log(res)
					// console.log(res.data.oid)
					uni.setStorageSync('orderId', res.data)
					if (this.needPayMoney <= 0) {
						if(uni.getStorageSync('orderId') != null){
							var orderIds = uni.getStorageSync('orderId').oid
							uni.redirectTo({
								url: `../success/success?id=${orderIds}`
							})
						}else{
							uni.showToast({
								title: res.msg,
								duration: 2000,
								icon: 'none'
							});
							
						}
					} else {
						if (res.code === 1) {
							uni.setStorageSync('orders', res.data)
							if (this.getId == 0) {
								uni.redirectTo({
									url: '../payment/payment?id=0&ids=1',
								})
							} else {
								uni.redirectTo({
									url: '../payment/payment?id=0&ids=0',
								})
							}	
						} else {
							console.log(res.msg)
							uni.showToast({
								title: res.msg,
								duration: 2000,
								icon: 'none'
							});
							this.orderItems = []
						}
					}
				})
			},
		},
	}
</script>

<style>
</style>
