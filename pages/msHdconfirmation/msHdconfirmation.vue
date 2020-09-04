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
				</view>
				<view v-if="type == 0" style="padding: 10upx 20upx;box-sizing: border-box;align-items: center;background: #fff">
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
				<view style="margin-top: 20upx;background: #fff;padding: 20upx;">
					<view>
						所选项目
					</view>
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
					<view v-if="getId != 0">
						<view style="padding: 20upx;">
							<view style="display: flex;justify-content: space-between;box-sizing: border-box;padding: 10upx 0;">
								<image v-if="ordergoods.thumbnail != null" style="width: 142upx;height: 142upx;" :src="ordergoods.thumbnail"
								 mode="aspectFill">

								</image>
								<image v-if="ordergoods.thumbnail == null" style="width: 142upx;height: 142upx;" :src="ordergoods.mgimgUrl"
								 mode="aspectFill">

								</image>
								<view style="flex: 1;padding: 10upx 20upx;background: #fff;">
									<view v-if="ordergoods.name != null" style="font-size: 24upx;">
										{{ordergoods.name}}
									</view>
									<view v-if="ordergoods.name == null" style="font-size: 24upx;">
										{{ordergoods.mgmodel}}
									</view>
									<view style="display: flex;margin-top: 20upx;font-size: 26upx;justify-content: space-between;">
										<view>
											数量：1
										</view>
										<view style="color: red;">
											￥{{msprice/100}}
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
							￥0
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
					<view style="color: #F56B2D;">￥{{totalprice/100}}</view>

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
				ordergoods: {}, //洗车数据
				Userdetail: {},
				orderItems: [],
				datalist: {},
				shoplist: [],
				needPayMoney: 0,
				ifchecked: false,
				isdisable: true,
				msprice: 0,
				type: 0,
				storeId: 0,
				getId: -1,
				relatedOrderId:0,
				hdTimeId:''
			}
		},
		onShow() {

		},
		onLoad(options) {
			this.Userdetail = uni.getStorageSync('Userdetail')
			console.log(options.price)
			if (options.id == 0) {
				this.relatedOrderId = options.oid
				this.getId = options.id
				this.msprice = options.price
				this.totalprice = options.price
				this.shoplist = uni.getStorageSync('mainmsgoods')
				console.log(this.shoplist)
				this.datalist = uni.getStorageSync('Arrayitem')
				this.storeId = this.datalist.storeId
				if(this.datalist.comScore == null){
					this.datalist.comScore = 0
				}
				if(this.datalist.sbuyCount == null){
					this.datalist.sbuyCount = 0
				}
			} else {
				this.getId = 1
				this.msprice = options.price
				this.totalprice = options.price
				this.hdTimeId = options.hdTimeId
				if (options.type == 0) {
					this.type = 0
				} else if (options.type == 1) {
					this.type = 2
				} else {
					this.type = 1
				}
				this.getwaterto()
			}
		},
		methods: {
			getwaterto() {
				this.ordergoods = uni.getStorageSync('msgoods')
				console.log(this.ordergoods)
				if (this.type == 0) {
					this.datalist = this.ordergoods.store
					if(this.datalist.comScore == null){
						this.datalist.comScore = 0
					}
					if(this.datalist.sbuyCount == null){
						this.datalist.sbuyCount = 0
					}
					this.storeId = this.datalist.storeId
				} else {
					this.storeId = 0
				}
				console.log(this.datalist)
				
			},
			goNavget() {
				if(this.getId == 0){
					//这是限时抢购的商品被替换的时候走的
					this.shoplist.forEach((r)=>{
						r.items.forEach((e) =>{
							e.goods.forEach((s)=>{
								var ordershops = {
									"changedGoodsId":s.changedGoodsId,
									"isFmMs":s.isFmMs,
									"catId": s.mgcatId,
									"goodsId": s.mgid,
									"goodsType": 'normal',
									"image": s.mgimgUrl,
									"itemId": 0,
									"name": s.mgname,
									"num": s.count,
									"orderId": 0,
									"price": s.mgprice,
									"unit": '个'
								}
								console.log(ordershops)
								this.orderItems.push(ordershops)
								// var arr2 = this.orderItems.filter(function(element,index,self){
								//   return self.indexOf(element) === index;
								// });
								console.log(this.orderItems); 
							})
						})
					})
					var choosecar = uni.getStorageSync('maintainCar')
					var data = {
						"memberId": uni.getStorageSync('Userdetail').uid,
						"balance": 0,
						"carMemberId": choosecar.id,
						"cmid": 0,
						"goodsNum": 1,
						"needPayMoney": this.msprice,
						"orderAmount": this.msprice,
						"orderItems": this.orderItems,
						"otype": 1,
						"payType": 0,//订单0是普通 1是保养 2保养商品
						"shipMobile": this.Userdetail.umobile,
						"shipName": this.Userdetail.uname,
						"storeId": this.storeId,
						"relatedOrderId":this.relatedOrderId,
						"ovehicleNum": choosecar.vehicleNum,
					}
					http.post('/app/mshd/addEsChangOrder.do', data).then(res => {
						console.log(res)
						if (res.code == 1) {
							uni.setStorageSync('orderId', res.data)
							uni.setStorageSync('stores', this.datalist)
							uni.redirectTo({
								url: `../payment/payment?id=0&ids=0` //没有车型 且不是从order页面过去的
							})
						} else {
							uni.showToast({
								title: res.msg,
								duration: 2000,
								icon: 'none'
							});
					       this.orderItems = []
						}
					})
					
				}else{
					//秒杀页面直接下单
					var ptdata = {
						"memberId": uni.getStorageSync('Userdetail').uid,
						"balance": 0,
						"goodsNum": 1,
						"needPayMoney": this.msprice,
						"orderAmount": this.msprice,
						"orderItems": [{
							"catId": this.ordergoods.catId,
							"goodsId": this.ordergoods.goodsId,
							"goodsType": this.ordergoods.goodsType,
							"image": this.ordergoods.thumbnail,
							"name": this.ordergoods.name,
							"num": 1,
							"price": this.msprice,
							"unit": this.ordergoods.unit,
							"isChange": 0,
							"isFmMs": 1
						}],
						"otype": this.type, //订单0是普通 1是保养 2保养商品
						"shipMobile": this.Userdetail.umobile,
						"shipName": this.Userdetail.uname,
						"storeId": this.storeId,
						"relatedOrderId":null,
						"hdTimeId":this.hdTimeId
					}
					var bydata = {
						"memberId": uni.getStorageSync('Userdetail').uid,
						"balance": 0,
						"goodsNum": 1,
						"needPayMoney": this.msprice,
						"orderAmount": this.msprice,
						"orderItems": [{
							"catId": this.ordergoods.mgcatId,
							"goodsId": this.ordergoods.mgid,
							"goodsType": 'normal',
							"image": this.ordergoods.mgimgUrl,
							"name": this.ordergoods.mgname,
							"num": 1,
							"price": this.mgprice,
							"unit": '个',
							"isChange": 0,
							"isFmMs": 1
						}],
						"otype": this.type, //订单0是普通 1是保养 2保养商品
						"shipMobile": this.Userdetail.umobile,
						"shipName": this.Userdetail.uname,
						"storeId": this.storeId,
						"relatedOrderId":null,
						"hdTimeId":this.hdTimeId
					}
					var data
					if (this.type == 0) {
						data = ptdata
					} else {
						data = bydata
					}
					http.post('/app/mshd/addMsOrder.do', data).then(res => {
						console.log(res)
						if (res.code == 1) {
							uni.setStorageSync('orderId', res.data)
							uni.setStorageSync('stores', this.datalist)
							uni.redirectTo({
								url: `../payment/payment?id=0&ids=0` //没有车型 且不是从order页面过去的
							})
						} else {
							uni.showToast({
								title: res.msg,
								duration: 2000,
								icon: 'none'
							});
						}
					
					})
				}
			},
		},
	}
</script>

<style>
</style>
