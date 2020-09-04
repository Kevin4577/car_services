<template>
	<view style="width: 100vw;background: #eee;">
		<view style="width: 100%;height: 100%;position: fixed;top: 0;background: #666666;opacity: 0.3;z-index: 998;" v-if="codeId == 1"
		 @click="mock()">

		</view>
		<view style="position: absolute;top: 300upx;width: 100%;display: flex;justify-content: center;z-index: 999;" v-if="codeId == 1">
			<view style="width: 500upx;background: #fff;display: flex;flex-wrap: wrap;justify-content: center;padding: 20upx 0;">
				<view style="font-size: 36upx;font-weight: bold;padding: 10upx 0;">核销码</view>
				<canvas canvas-id="qrcode" style="width: 430upx;height: 430upx;" />
				<view style="font-size: 30upx;font-weight: bold;padding: 10upx 0;">
					请将此码展示给商家，完成核销
				</view>
			</view>
		</view>
		<demock :cancelId="cancelId" :refundId="refundId" @confirmdele="confirmdele" @waitthink="waitthink"></demock>
		<scroll-view scroll-x="true" style="position: fixed;top: 0;width: 100%;z-index: 999;
		background: #fff;overflow: hidden;white-space: nowrap;"
		 :scroll-left="move">
			<view style="width: 16.6%;display: inline-block;" v-for="(item,index) in namelist" :id="index" :key='index' :class="index == tabCurrentIndex ?'active':''"
			 @click="tabClick(index)">
				<view style="font-size: 28rpx;display: flex;flex-direction: column;align-items: center;justify-content: center;height: 60rpx; position: relative;">
					{{item.text}}
					<span v-if="item.number" style="position: absolute; right: 0; top: 0; width: 25rpx; height: 25rpx; border-radius: 50%; background-color: #FE712A; color: white; text-align: center; font-size: 18rpx;">{{item.number}}</span>
					<image style="width: 50upx;height: 4upx;margin-top: 8rpx;" src="../../static/tabchoose1.png" mode="" v-if="index == tabCurrentIndex">

					</image>
				</view>
			</view>
		</scroll-view>
		<swiper :duration="1" style="height: 100vh;padding-bottom:20rpx" @change="getnext" :current="tabCurrentIndex">
			<swiper-item v-for="items in 6" :key="items" :item-id="items">
				<scroll-view scroll-y="true" style="height: 100%;">
					<Orders :datalist="ordergoods" :showIndex="tabCurrentIndex" @loadmores="loadmores" @cancel="cancel" @goPay="goPay"
					 @goreturnPay="goreturnPay" @make="make" @makejump="makejump" @getordcoms="getordcoms">
					</Orders>
				</scroll-view>
			</swiper-item>
		</swiper>


	</view>
</template>

<script>
	var http = require('@/api/token.js')
	import uQRCode from '@/commom/uqrcode.js'
	import Orders from '@/pages/ordersZ/ordersZ'
	import demock from '@/pages/ordersZ/Demock'
	export default {
		data() {
			return {
				move: 0,
				tabCurrentIndex: 0,
				cancelId: 0,
				codeId: 0,
				oids: 0,
				ordergoods: [],
				namelist: [{
						state: 0,
						text: '待付款',
						number: 0
					},
					{
						state: 1,
						text: '待服务',
						number: 0
					},
					{
						state: 2,
						text: '已完成',
						number: 0
					},
					{
						state: 3,
						text: '待评价',
						number: 0
					},
					{
						state: 4,
						text: '已退款',
						number: 0
					},
					{
						state: 5,
						text: '退款中',
						number: 0
					},

				],
				payisLastPage: false,
				payPagenum: 0,
				waitisLastPage: false,
				waitPagenum: 0,
				reisLastPage: false,
				rePagenum: 0,
				comisLastPage: false,
				comPagenum: 0,
				Nocom: [],
				finishcom: [],
				waitcom: [],
				page: 0,
				lists: [],
				returnId: 0,
				refundId: 0,
				chooseId: -1
			}
		},
		components: {
			Orders,
			demock
		},
		onShow() {
			this.gettabchang(this.tabCurrentIndex)
			// this.tabCurrentIndex = options.id;
		},
		onPullDownRefresh() {},
		onLoad(options) {
			this.tabCurrentIndex = options.id;
			this.gettabchang(this.tabCurrentIndex)
			this.getNumber()
		},
		methods: {
			getNumber() {
				http.post('/app/my/findOrderSum.do', {}).then(res => {
					if (res.data.pay > 99) {
						this.namelist[0].number = 99
					} else {
						this.namelist[0].number = res.data.pay
						if (this.namelist[0].number == undefined) {
							this.namelist[0].number = 0
						}
					}
				
					if (res.data.service > 99) {
						this.namelist[1].number = 99
					} else {
						this.namelist[1].number = res.data.service
						if (this.namelist[1].number == undefined) {
							this.namelist[1].number = 0
						}
					}
				
					if (res.data.comment > 99) {
						this.namelist[3].number = 99
					} else {
						this.namelist[3].number = res.data.comment
						if (this.namelist[3].number == undefined) {
							this.namelist[3].number = 0
						}
					}
					this.namelist[2].number = 0
					this.namelist[4].number = 0
					this.namelist[5].number = 0
				})
			},
			tabClick(index) {
				this.tabCurrentIndex = index;

				this.gettabchang(this.tabCurrentIndex)
			},
			getnext: function(e) {
				console.log(e.detail.currentItemId)
				this.tabCurrentIndex = e.detail.currentItemId
				if (this.tabCurrentIndex >= 3) {
					this.move = 800
				} else {
					this.move = 0
				}
				this.gettabchang(this.tabCurrentIndex)
			},
			loadmores: function() {
				// if (this.payisLastPage != true) {
				// 	var page = this.payPagenum + 1
				// 	this.getwaitePay(page, 0)
				// } else {
				// 	console.log("没有更多")
				// }
				// if (this.waitisLastPage != true) {
				// 	var page = this.waitPagenum + 1
				// 	this.getwaitegoods(page)
				// } else {
				// 	console.log("没有更多")
				// }
				// if (this.reisLastPage != true) {
				// 	var page = this.rePagenum + 1
				// 	this.getreturngoods(page, -1)
				// } else {
				// 	console.log("没有更多")
				// }
			},

			gettabchang(Index) {
				if (Index == 0) {
					this.getwaitePay(1, 0) //待付款
				}
				if (Index == 1) {
					this.getwaitegoods(1) //待核销，退款申请
				}
				if (Index == 2) {
					this.getorderscoms(1, Index) //评价
				}
				if (Index == 3) {
					this.getorderscoms(1, Index) //评价
				}
				if (Index == 4) {
					this.getreturngoods(1, -1) //已经退款
				}
				if (Index == 5) {
					this.RefundingOrders(1)
				}
			},
			RefundingOrders(i){
				//退款中
				var page = i
				http.post(`/app/my/getMyRefundingOrders.do?page=${page}&rows=20`).then(res =>{
					console.log(res)
					if (page == 1) {
						this.ordergoods = res.data.list
					} else {
						this.ordergoods = this.ordergoods.concat(res.data.list)
					}
				})
			},
			getwaitePay(i, sta) {
				var page = i
				var status = sta
				//0
				//待付款
				http.post(`/app/my/getMyOrders.do?page=${page}&rows=20&status=${status}`, {}).then(res => {
					console.log("待付款")
					console.log(res)
					this.payisLastPage = res.data.isLastPage
					this.payPagenum = res.data.pageNum
					if (page == 1) {
						this.ordergoods = res.data.list
					} else {
						this.ordergoods = this.ordergoods.concat(res.data.list)
					}
				})
			},
			getwaitegoods(i) {
				//1
				//等待核销，申请退款
				var page = i
				http.post(`/app/my/getMyServiceOrders.do?page=${page}&rows=20`, {}).then(res => {
					console.log(res)
					this.waitisLastPage = res.data.isLastPage
					this.waitPagenum = res.data.pageNum
					if (page == 1) {
						this.ordergoods = res.data.list
						console.log("等待核销")
					} else {
						this.ordergoods = this.ordergoods.concat(res.data.list)
					}
				})
			},
			getreturngoods(i, sta) {
				//-1 
				//已退款
				var page = i
				var status = sta
				http.post(`/app/my/getMyOrders.do?page=${page}&rows=20&status=${status}`, {}).then(res => {
					console.log("已退款")
					this.reisLastPage = res.data.isLastPage
					this.rePagenum = res.data.pageNum
					if (page == 1) {
						this.ordergoods = res.data.list
					} else {
						this.ordergoods = this.ordergoods.concat(res.data.list)
					}
				})
			},
			getorderscoms(i, ind) {
				var page = i
				var index = ind
				http.post(`/app/my/getMyCommentOrders.do?status=-1&page=${page}&rows=20`, {}).then(res => {
					console.log(res)
					this.comisLastPage = res.data.isLastPage
					this.comPagenum = res.data.pageNum
					var ordergoods = []
					if (page == 1) {
						ordergoods = res.data.list
						this.getwaitAndfin(ordergoods, index)
					} else {
						ordergoods = ordergoods.concat(res.data.list)
						this.getwaitAndfin(ordergoods, index)
					}

				})
			},
			getwaitAndfin(list, i) {
				//2
				if (i == 3) {
					this.ordergoods = list.filter((r) => {
						return r.commentStatus == 0
					})
					uni.setStorageSync('waitcom', this.ordergoods)
				}
				//3
				if (i == 2) {
					this.ordergoods = list.filter((r) => {
						return r.commentStatus == 7
					})
				}
			},
			confirmdele() {
				if (this.chooseId == 0) {
					http.post(`/app/order/cancelEsOrder.do?oid=${this.oids}`, {}).then(res => {
						console.log(res)
						if (res.code == 1) {
							this.getwaitePay(1, 0)
							this.cancelId = 0
							uni.showToast({
								title:"您的申请已提交，请耐心等待！",
								duration:2000,
								icon:"none"
							})
						}
					})
				}
				if (this.chooseId == 1) {
					http.post(`/app/pay/refundOrder.do?oid=${this.returnId}`).then(res => {
						console.log(res)
						if (res.code == 1) {
							this.getwaitegoods(1)
							this.cancelId = 0
						}
						if (res.code == 1400102) {
							this.cancelId = 0
							uni.showToast({
								title: res.msg,
								duration: 2000,
								icon: "none"
							})
						}
					})
				}
			},
			waitthink() {
				this.cancelId = 0
			},
			cancel(id) {
				this.cancelId = 1
				this.refundId = 1
				this.oids = id
				this.chooseId = 0
			},
			getordcoms() {
				uni.navigateTo({
					url: '../assess/assess'
				})
			},
			// dele() {
			// 	this.cancelId = 0
			// },
			mock() {
				this.codeId = 0
				this.getwaitegoods(1)
			},
			make(T) {
				var text = T
				console.log(text)
				this.codeId = 1
				uQRCode.make({
					canvasId: 'qrcode',
					componentInstance: this,
					text: text,
					size: 215,
					margin: 10,
					backgroundColor: '#ffffff',
					foregroundColor: '#000000',
					fileType: 'jpg',
					correctLevel: uQRCode.defaults.correctLevel,
					success: res => {
						console.log(res)
					}
				})
			},
			makejump(catId,mgId,name,id){
				var catId = catId
				var mgId = mgId
				var name = name
				var oid = id
				console.log(catId,mgId)
				uni.navigateTo({
					url:`../msmaintain/msmaintain?catId=${catId}&mgId=${mgId}&name=${name}&oid=${oid}`
				})
			},
			goPay(index) {
				console.log(this.ordergoods[index])
				var Myordergoods = this.ordergoods[index]
				uni.setStorageSync('MyOrder', Myordergoods)
				uni.navigateTo({
					url: '../payment/payment?id=3'
				})
			},
			goreturnPay(id) {
				this.cancelId = 1
				this.refundId = 2
				this.returnId = id
				this.chooseId = 1
			}
		}
	}
</script>

<style>
	/* .statelist {
		padding: 20upx;
	} */

	.active {
		color: #FE712A;
	}
</style>
