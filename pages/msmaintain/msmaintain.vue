<template>
	<view style=";padding-bottom:20upx ;">
		<view style="position: relative;background: #eee;height: 100vh;">
			<image style="width: 750upx;height: 280upx;" src="../../static/mainbanner.png" mode=""></image>
			<view style="position: absolute;top: 20upx;width: 100%;box-sizing: border-box;">
				<view style="padding: 0 20upx;">
					<view>
						<view style="display: flex;padding: 10upx 20upx;justify-content: center;box-sizing: border-box;
						align-items: center;color: #FFFFFF;"
						 v-if="carId == 1">
							<view style="font-size: 32upx;position: relative;">
								{{maintainCar.modelCatName}}—{{maintainCar.modelName}}
							</view>
							<view style="font-size: 28upx;color: #fff;position: absolute;right: 30upx;" @click="goGarage()">
								切换
							</view>
						</view>
						<view v-if="carId == 0">
							<view style="font-size: 28upx;padding: 5upx 0;text-align: center;color: #FFFFFF;" @click="goGarage()">请添加车型</view>
						</view>
					</view>

					<view style="padding: 0upx 20upx;box-sizing: border-box;border-radius: 10upx;background: #fff;margin-top: 20upx;">
						<view style="font-size: 26upx;padding: 20upx 0;">
							下单流程
						</view>
						<view style="display: flex;justify-content: space-between;font-size: 24upx;">
							<image style="width: 634upx;height: 63upx;" src="../../static/liuc.png" mode=""></image>
						</view>
						<view>
							<view v-if="ArrayId == 0" style="display: flex;justify-content: center;font-size: 30upx;padding: 30upx;">
								<view style="width: 320upx;line-height: 60upx;text-align: center;border-radius: 100upx;background: #F0714E;color: #fff;"
								 @click="goback()">
									请选择心仪的门店
								</view>
							</view>
							<view v-if="ArrayId != 0" style="display: flex;justify-content: space-between;align-items: center;">
								<view>
									<view style="font-size: 32upx;color: #333333;padding: 10upx 0;">
										{{Arrayitem.sname}}
									</view>
									<view style="display: flex;font-size: 22upx;align-items: center;padding: 10upx 0;">
										<view>
											<text style="color: #666666;">总评分</text>
											<text style="margin-left: 5upx;color: #D60808;">{{Arrayitem.comScore}}</text>
										</view>
										<view style="margin-left: 20upx;">
											<text style="color: #666666;">总订单</text>
											<text style="margin-left: 5upx;color: #D60808;">{{Arrayitem.comNumber}}</text>
										</view>
									</view>
									<view style="padding: 10upx 0;font-size: 22upx;display: flex;align-items: center;">
										<image style="width: 22upx;height: 28upx;" src="../../static/ding.png" mode=""></image>
										<!-- postion就是ding -->
										<view style="margin-left: 20upx;width: 420rpx;">
											{{Arrayitem.saddress}}
										</view>
									</view>
								</view>
								<view @click="changeNext()" style="font-size: 24upx;background: #F0714E;border-radius: 100upx;padding: 20upx;color: #FFFFFF;line-height: 5upx;">
									切换
								</view>
							</view>
						</view>
					</view>

				</view>
				<view style="margin-bottom: 150upx;margin-top: 10upx;background: #eee;padding: 0 20upx;padding-bottom: 10upx;">
					<checkbox-group @change="gotodetial">
						<view style="padding:10upx 0;" v-for="(item,index) in mainitem" :key='index'>
							<view style="border-radius: 10upx;background: #fff;padding: 20upx 0;box-sizing: border-box;">
								<view style="display: flex;padding: 20upx ;box-sizing: border-box;justify-content: space-between;align-items: center;">
									<view :id='index' @click="getmain(index)">
										<checkbox :value="item.mcname" :checked="item.checked" />
									</view>
									<view style="flex: 1">
										<view>
											<view style="display: flex;justify-content: space-between;align-items: center;">
												<view style="font-size: 28upx;">
													<view>{{item.mcname}}</view>
													<view style="margin-top: 10upx;color: #ccc;font-size: 26upx;">{{item.mcdes}}</view>
												</view>
												<view style="display: flex;font-size: 26upx;" v-if="item.checked == 1">
													<view v-if="item.state == 1" :id='index' style="margin-left: 30upx;font-size:30upx;" @click="gotoEdit(index,mainitem)">
														编辑
													</view>
													<view :id='index' v-if="item.state == 2" style="margin-left: 30upx;font-size:30upx;" @click="gotosave(index,mainitem)">
														保存
													</view>
												</view>
												<view v-if="item.checked == 0" style="font-size: 28upx;color: #666;">
													￥{{item.mcprice/100}}
												</view>
											</view>
										</view>
									</view>
								</view>
								<view style="margin-left: 50upx;padding:0 20upx;" :class="item.checked == 1?'showstyle':'hiddstyle'">
									<view v-for="(ite,inde) in item.items" :key='inde' style="padding: 10upx 0;align-items: center;">
										<view v-for="(it,ind) in ite.goods " :key='ind' style="margin-top: 20upx;display: flex;align-items: center;">
											<image style="width: 142upx;height: 142upx;" :src="it.mgimgUrl"></image>
											<view v-if="item.state == 1" style="flex: 1;padding:0 20upx;font-size: 30upx;">
												<view style="padding: 10upx 0;">{{it.mgname}}</view>
												<view style="display: flex;justify-content: space-between;">
													<view v-if="item.state == 1" style="font-size: 30upx;color: #666;">X {{it.count}}</view>
													<view v-if="item.state == 1" style="color:#D60808;font-size: 30upx;font-weight: bold;">￥{{it.mgprice/100}}</view>
												</view>
												<view v-if="H5mgId == it.mgid" style="color: #F56B2D;font-size:24rpx;display: flex;align-items: center;">
													<image style="width:36rpx;height: 36rpx;" src="../../static/msgantan.png" mode=""></image>
													<view style="line-height: 36rpx;margin-left: 8rpx;">活动商品</view>
												</view>
												<view v-if="H5catId == it.mgcatId && nameTip == it.mgtip && changestatus == 1" style="color: #F56B2D;font-size:24rpx;display: flex;align-items: center;">
													<image style="width:36rpx;height: 36rpx;" src="../../static/msgantan.png" mode=""></image>
													<view style="line-height: 36rpx;margin-left: 8rpx;width: 250rpx;overflow: hidden;
													white-space: nowrap;text-overflow: ellipsis;">已替换活动商品{{msname}}</view>
													<view style="width: 168rpx;height: 50rpx;background:#F56B2D;color: #fff;font-size: 22rpx;
													text-align: center;line-height: 50rpx;"
													 @click="getH5come(shopsitem,H5catId,H5mgId)">使用秒杀商品</view>
												</view>
												<view v-if="H5catId == it.mgcatId && nameTip == 0 && changestatus == 1" style="color: #F56B2D;font-size:24rpx;display: flex;align-items: center;">
													<image style="width:36rpx;height: 36rpx;" src="../../static/msgantan.png" mode=""></image>
													<view style="line-height: 36rpx;margin-left: 8rpx;">已替换活动商品{{msname}}</view>
												</view>
											</view>
											<view v-if="item.state == 2" style="flex: 1;display: flex;flex-direction: column;
											justify-content: center;height: 142upx;">
												<view style="display: flex;align-items: center;justify-content: center;width: 100%;
											      padding: 0 20upx;">
													<view style="display: flex;font-size: 28upx;">
														<view style="border: 1px solid #ccc;padding: 10upx 0;width: 50upx;text-align: center;" @click="gotoSub(index,inde,ind,mainitem)">
															-
														</view>
														<view style="padding: 10upx 0;width: 70upx;text-align: center;
														border-top: 1px solid #ccc;border-bottom: 1px solid #ccc;">
															{{it.count}}
														</view>
														<view style="border: 1px solid #ccc;padding: 10upx 0;width: 50upx;text-align: center;" @click="gotoAdd(index,inde,ind,mainitem)">
															+
														</view>
													</view>
													<view v-if="item.state == 2" style="margin-left:75upx;font-size: 26upx;" @click="getChange(it.mgcatId,it.mgstandardId,it.dataTip,it.count)">
														更换
													</view>
												</view>
												<view v-if="H5catId == it.mgcatId && nameindex == -1" style="color: #F56B2D;font-size:24rpx;display: flex;align-items: center;margin-top: 15rpx;">
													<image style="width:36rpx;height: 36rpx;" src="../../static/msgantan.png" mode=""></image>
													<view style="line-height: 36rpx;margin-left: 8rpx;">活动商品可补差价替换其他商品</view>
												</view>
												<view v-if="H5catId == it.mgcatId && nameindex == ind" style="color: #F56B2D;font-size:24rpx;display: flex;align-items: center;margin-top: 15rpx;">
													<image style="width:36rpx;height: 36rpx;" src="../../static/msgantan.png" mode=""></image>
													<view style="line-height: 36rpx;margin-left: 8rpx;">活动商品可补差价替换其他商品</view>
												</view>
											</view>
										</view>
									</view>
								</view>
							</view>
						</view>
						<view style="padding:10upx 0;" v-for="(item,index) in mainlist" :key='index'>
							<view style="border-radius: 10upx;background: #fff;padding: 20upx 0;box-sizing: border-box;">
								<view style="display: flex;padding: 20upx ;box-sizing: border-box;justify-content: space-between;align-items: center;">
									<view :id='index' @click="getShow(index)">
										<checkbox :value="item.mcname" :checked="item.checked" />
										<!-- {{item.checked}} -->
									</view>
									<view style="flex: 1">
										<view>
											<view style="display: flex;justify-content: space-between;align-items: center;">
												<view style="font-size: 30upx;">
													<view>{{item.mcname}}</view>
													<view style="margin-top: 10upx;color: #ccc;font-size: 26upx;">{{item.mcdes}}</view>
												</view>
												<view style="display: flex;font-size: 26upx;" v-if="item.checked == 1">
													<view v-if="item.state == 1" :id='index' style="margin-left: 30upx;font-size:30upx;" @click="gotoEdit(index,mainlist)">
														编辑
													</view>
													<view :id='index' v-if="item.state == 2" style="margin-left: 30upx;font-size:30upx;" @click="gotosave(index,mainlist)">
														保存
													</view>
												</view>
												<view v-if="item.checked == 0" style="font-size: 28upx;color: #666;">
													￥{{item.mcprice/100}}
												</view>
											</view>
										</view>
									</view>
								</view>
								<view style="margin-left: 50upx;padding:0 20upx;" :class="item.checked == 1?'showstyle':'hiddstyle'">
									<view v-for="(ite,inde) in item.items" :key='inde' style="padding: 10upx 0;align-items: center;">
										<view v-for="(it,ind) in ite.goods " :key='ind' style="margin-top: 20upx;display: flex;align-items: center;">
											<image style="width: 142upx;height: 142upx;" :src="it.mgimgUrl"></image>
											<view v-if="item.state == 1" style="flex: 1;padding:0 20upx;font-size: 30upx;">
												<view style="padding: 10upx 0;font-size: 30upx;">{{it.mgname}}</view>
												<view style="display: flex;justify-content: space-between;">
													<view v-if="item.state == 1" style="color: #666;">X {{it.count}}</view>
													<view v-if="item.state == 1" style="color:#D60808;font-weight: bold;">￥{{it.mgprice/100}}</view>
												</view>
											</view>
											<view v-if="item.state == 2" style="display: flex;align-items: center;justify-content: center;
											flex: 1;padding: 0 20upx;">
												<view style="display: flex;font-size: 28upx;">
													<view style="border: 1px solid #ccc;padding: 10upx 0;width: 50upx;text-align: center;" @click="gotoSub(index,inde,ind,mainlist)">
														-
													</view>
													<view style="padding: 10upx 0;width: 70upx;text-align: center;
													border-top: 1px solid #ccc;border-bottom: 1px solid #ccc;">
														{{it.count}}
													</view>
													<view style="border: 1px solid #ccc;padding: 10upx 0;width: 50upx;text-align: center;" @click="gotoAdd(index,inde,ind,mainlist)">
														+
													</view>
												</view>
												<view v-if="item.state == 2" style="margin-left:75upx;font-size: 26upx;" @click="getChange(it.mgcatId,it.mgstandardId,it.dataTip,it.count)">
													更换
												</view>
											</view>
										</view>
									</view>
								</view>
							</view>
						</view>
					</checkbox-group>
				</view>
			</view>
		</view>
		<view v-if="totalId === 1" style="width: 750upx;height: 125upx;background: #fff;
		position: fixed;bottom: 0upx;padding: 0 10upx;box-sizing: border-box;
		display: flex;justify-content: space-between;align-items: center;border-top: 1px solid #eee;">
			<view>
				<button open-type="contact" style="background: #fff;height: 100%;padding: 10upx 0 ;display: flex;flex-direction: column;
					justify-content: space-between;align-items: center;box-sizing: border-box;
					font-size: 24upx;text-align: center;margin-top: 10upx;margin-left: 20upx;">
					<image style="width: 48upx;height: 47upx;" src="../../static/12.png" mode=""></image>
					<view>联系客服</view>
				</button>
			</view>
			<view style="display: flex;align-items: center;">
				<view>
					<view v-if="mscprice == 0" style="color: #BEBEBE;font-size: 26rpx;">已优惠{{msprice/100}}</view>
					<view v-if="mscprice < msprice && mscprice != 0" style="color: #BEBEBE;font-size: 26rpx;">
						已优惠{{mscprice/100}}
					</view>
					<view v-if="mscprice >= msprice" style="color: #BEBEBE;font-size: 26rpx;">已优惠{{msprice/100}}</view>
				</view>
				<view style="display: flex;flex-direction: column;">
					<view style="display: flex;">
						<view style="font-size: 34upx;margin-left: 20upx;font-weight: 400;color:#666;" v-model="number">{{number}}项合计：</view>
						<view v-if="mscprice == 0" style="font-size: 34upx;color:#D20D04 ;font-weight: bold;">￥{{totalprice/100 - msprice/100}}</view>
						<view v-if="mscprice >= msprice" style="font-size: 34upx;color:#D20D04 ;font-weight: bold;">￥{{totalprice/100 - msprice/100}}</view>
						<view v-if="mscprice < msprice && mscprice != 0" style="font-size: 34upx;color:#D20D04 ;font-weight: bold;">￥{{totalprice/100 - mscprice/100}}</view>
					</view>
					<view style="color: #F0714E;font-size: 30upx;font-weight: bold;text-align: right;">免费安装</view>
				</view>
				<view :id="1" style="width: 160upx;height: 62upx;border-radius: 100upx;margin-left: 20upx;
						background: #eee;line-height: 62upx;text-align: center;color: #999;font-size: 34upx;"
				 @click="goCalc()" :class="calcId != null?'active':''">
					去结算
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniSteps from '@/components/uni-steps/uni-steps.vue'
	var http = require('@/api/token.js')
	export default {
		data() {
			return {
				totalId: 0,
				stepsId: 0,
				calcId: null,
				emprice: 0,
				count: 1,
				carId: undefined,
				itemprice: [],
				isShow: 0,
				totalprice: 0,
				number: 0,
				ArrayId: 0,
				chooseprice: [],
				mainitem: [],
				mainlist: [],
				shopsitem: [],
				Arrayitem: [],
				mgbrandId: 0,
				News: [],
				tomainId: 0,
				vehicleNum: null,
				maintainCar: {},
				namelist: [{
						img: '../../static/buzhou.png',
						name: '选择项目'
					},
					{
						img: '../../static/buzhou.png',
						name: '选择门店'
					},
					{
						img: '../../static/buzhou.png',
						name: '到店安装'
					},
					{
						img: '../../static/buzhou.png',
						name: '订单完成'
					}
				],
				edit: 0,
				dafaultId: 0,
				H5catId: 0,
				H5mgId: 0,
				mshdmgtip: 0,
				nameTip: 0,
				nameindex: 0,
				changestatus: -1,
				msname: '',
				msprice: 0,
				mscprice: 0,
				replaceId: 0,
				relatedOrderId:0
			}
		},
		onPullDownRefresh() {
			this.goFirst()
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		onShow() {
			this.getchangeback()
		},
		onLoad(options) {
			console.log(options)
			this.H5catId = options.catId
			this.H5mgId = options.mgId
			this.msname = options.name
			this.relatedOrderId = options.oid
			console.log(options.name.indexOf('4L') != -1)
			if (options.name.indexOf('4L') != -1) {
				this.nameTip = 4
				this.nameindex = 0
			} else if (options.name.indexOf('1L') != -1) {
				this.nameTip = 1
				this.nameindex = 1
			} else {
				this.nameTip = 0
				this.nameindex = -1
			}
			// if(){

			// }
			console.log(this.nameTip, this.nameindex)
			// if (options.catId != undefined && options.mgId != undefined) {
			// 	
			// }//H5过来的
			if (options.ids != undefined) {
				this.dafaultId = options.ids
			} else {
				this.getH5renturn()
			} //默认车型
			if (options.ids != undefined) {
				this.storeId = options.id
				this.getmendian(this.storeId)
			} //门店信息
			this.goFirst()
			// this.getreplace()
		},
		methods: {
			getH5renturn() {
				http.post(`/app/carmember/findDefaultCarMember.do`, {}).then(res => {
					// console.log(res.data)
					if (res.data == null) {
						uni.redirectTo({
							url: '../carlist/carlist'
						});
					} else {
						this.dafaultId = res.data.id
						this.getalldata(this.dafaultId, 0)
					} //h5跳过来
				})
			},
			getchangeback() {
				let pages = getCurrentPages();
				let currPage = pages[pages.length - 1]
				this.storeId = currPage.data.storeId
				this.getmendian(this.storeId)
				var replaceId = currPage.data.replaceId
				this.replaceId = currPage.data.replaceId
				if (currPage.data.replaceId == 1) {
					var goodsid = currPage.data.goodsid
					var dataTip = currPage.data.dataTip
					var count = currPage.data.count
					this.changestatus = currPage.data.changestatus
					// this.mscprice = currPage.data.changeprice
					this.getreplace(goodsid, dataTip, count)
					// console.log(goodsid)
				} else {
					console.log(2)
				}
			},
			getmendian(id) {
				var ids = id
				// console.log(ids)
				if (ids != undefined) {
					http.post(`/app/EsStore/findEsStore.do?id=${ids}`).then(res => {
						// console.log(res)
						this.Arrayitem = res.data
						if (this.Arrayitem.comNumber == null) {
							this.Arrayitem.comNumber = 0
						}
						if (this.Arrayitem.comScore == null) {
							this.Arrayitem.comScore = 0
						}
						uni.setStorageSync('Arrayitem', this.Arrayitem)
						this.ArrayId = this.Arrayitem.storeId
						this.calcId = this.Arrayitem.storeId
					})
				}
			},
			getalldata(id, chid) {
				var ids = id
				http.post(`/app/carmember/findCarMember.do?id=${ids}`, {}).then(res => {
					// console.log(res)
					if (res.data != null) {
						this.maintainCar = res.data
						uni.setStorageSync('maintainCar', this.maintainCar)
						this.tomainId = this.maintainCar.vehicleId
						this.vehicleNum = this.maintainCar.vehicleNum
						this.carId = 1
						var replaceId = chid
						// console.log(replaceId)
						if (replaceId != 1) {
							http.post(`/app/carMaintainCat/findMaintainItemsByVehicleId.do?vehicleId=${this.tomainId}`, {}).then(res => {
								// console.log(res)
								this.shopsitem = res.data
								this.getsmallprice(this.shopsitem, replaceId)
								this.getH5come(this.shopsitem, this.H5catId, this.H5mgId)
								this.calcTotal()
							})
						} else {
							this.calcTotal()
							// this.getchangeback()
						}
					} else {
						this.carId = 0
					}
				})
			},
			getsmallprice(list, chid) {
				list.forEach(r => {
					r.mcprice = null
					r.items.forEach(e => {
						e.price = null
						e.goods.forEach(s => {
							e.price += s.count * s.mgprice
							s.price = s.count * s.mgprice
						})
						r.mcprice += e.price
					})
				})
				var replaceId = chid
				if (replaceId != 1) {
					this.mainitem = list.slice(0, 2)
					console.log(this.mainitem)

					this.mainlist = list.slice(2, 9)
					this.mainitem[0].checked = 1
					this.mainitem[0].state = 1
				} else {
					this.mainitem = list.slice(0, 2)
					this.mainlist = list.slice(2, 9)
					this.mainitem.forEach((r) => {
						console.log(r)
					})
				}
			},
			goback() {
				uni.navigateTo({
					url: '../choosestore/choosestore'
				})
			},
			changeNext() {
				uni.navigateTo({
					url: '../choosestore/choosestore'
				})
			},
			goFirst() {
				this.totalId = 1
				this.number = 1

			}, //页面首次响应
			getmain(index) {
				let state = this.mainitem[index].state
				if (index == 0) {
					if (state == 0) {
						this.mainitem[index].state = 1
						this.mainitem[index].checked = 1
						if (this.mainitem[index].checked = 1) {
							this.mainitem[index + 1].state = 0
							this.mainitem[index + 1].checked = 0
						} else {
							this.mainitem[index + 1].state = 1
							this.mainitem[index + 1].checked = 1
						}
					} else {
						this.mainitem[index].state = 0
						this.mainitem[index].checked = 0
					}
				} else {
					if (state == 0) {
						this.mainitem[index].state = 1
						this.mainitem[index].checked = 1
						if (this.mainitem[index].checked = 1) {
							this.mainitem[index - 1].state = 0
							this.mainitem[index - 1].checked = 0
						} else {
							this.mainitem[index - 1].state = 1
							this.mainitem[index - 1].checked = 1
						}
					} else {
						this.mainitem[index].state = 0
						this.mainitem[index].checked = 0
					}
				}
				this.calcTotal()
			},
			getShow(index) {
				let state = this.mainlist[index].state
				if (state == 0) {
					this.mainlist[index].state = 1
					this.mainlist[index].checked = 1

				} else {
					this.mainlist[index].state = 0
					this.mainlist[index].checked = 0
				}
				this.calcTotal()
			},
			gotoEdit(index, list) {
				// console.log(list)
				var List = list
				let state = List[index].state
				if (state == 1) {
					List[index].state = 2
				}
			},
			gotosave(index, list) {
				var List = list
				List[index].state = 1
			},
			getChange(ci, id, ip, ic) {
				var ids = id
				var ips = ip
				var ics = ic
				var cis = ci
				uni.navigateTo({
					url: `../replace/replace?id=${ids}&ip=${ips}&ic=${ics}&ci=${cis}`
				})
			},
			gotodetial: function(e) {
				// console.log(e.detail.value)
				let shoplength = e.detail.value.length
				if (e.detail.value.indexOf('大保养') > -1 && e.detail.value.indexOf('小保养') > -1) {
					this.number = shoplength - 1
				} else {
					this.number = shoplength
				}

				if (shoplength != 0) {
					this.totalId = 1
				} else {
					this.totalId = 0
				}
			},
			goGarage() {
				uni.navigateTo({
					url: '../garage/garage?id=3'
				})
			},
			calcTotal() {
				this.totalprice = 0
				// var Totalgoods = []
				// console.log(this.shopsitem)
				this.shopsitem.forEach(r => {
					if (r.checked) {
						r.items.forEach(e => {
							
							e.goods.forEach(s => {
								if (s.price == undefined) {
									s.price = s.mgprice
									this.totalprice += s.price
								} else {
									this.totalprice += s.price
								}

							})
						})
					}
				})
				
			},
			gotoSub(i, j, k, list) {
				var shopsgoods = list
				// console.log(this.shopsitem)
				let count = shopsgoods[i].items[j].goods[k].count
				if (count > 0) {
					shopsgoods[i].items[j].goods[k].count--
					var totalprice = shopsgoods[i].items[j].goods[k].mgprice * shopsgoods[i].items[j].goods[k].count
					// console.log(totalprice)
					shopsgoods[i].items[j].goods[k].price = totalprice
					// console.log(shopsgoods[i].items[j].goods.mgprice)
				}
				this.calcTotal()
			}, //数量商品减，并做计算
			gotoAdd(i, j, k, list) {
				var shopsgoods = list
				let count = shopsgoods[i].items[j].goods[k].count
				if (count < 99) {
					shopsgoods[i].items[j].goods[k].count++
					var totalprice = shopsgoods[i].items[j].goods[k].mgprice * shopsgoods[i].items[j].goods[k].count
					shopsgoods[i].items[j].goods[k].price = totalprice
					// console.log(this.shopsitem[i].items[j].goods[k].price)
				}
				this.calcTotal()
			}, //数量商品加，并做计算
			goCalc() {
				// console.log(this.calcId)
				if (this.calcId != null) {
					if (this.vehicleNum == null) {
						// console.log('请填写车架号')
						// uni.setStorageSync('supInfo', this.maintainCar)
						uni.navigateTo({
							url: "../Fillnumber/Fillnumber"
						})
					} else {
						var nextprice = 0
						if( this.mscprice == 0 || this.mscprice >= this.msprice){
							 nextprice = this.totalprice - this.msprice
						}else{
							 nextprice = this.totalprice - this.mscprice
						}
						let Totalgoods = this.shopsitem.filter((r) =>{
								return r.checked == true
							})
							
							// console.log(Totalgoods)
							uni.setStorageSync('mainmsgoods', Totalgoods)
							console.log(uni.getStorageSync('mainmsgoods'))
						uni.navigateTo({
							url: `../msHdconfirmation/msHdconfirmation?price=${nextprice}&id=0&oid=${this.relatedOrderId}`
						})
					}
				} else {
					uni.showToast({
						title: '您还未选择门店',
						duration: 2000,
						icon: 'none'
					});
				}
			},
			getreplace(id, tip, con) {
				var goodsid = id
				var dataTip = tip
				var count = con
				this.changeprice(goodsid, dataTip, count)

			},
			getH5come(list, catid, mgid) {
				var goodsid = mgid
				var catId = catid
				var dataTip = 0
				var count = 0
				list.forEach(r => {
					r.items.forEach(e => {
						e.goods.forEach(s => {
							if (s.mgcatId == catId) {
								// console.log(s.dataTip, s.count)
								dataTip = s.dataTip
								count = s.count
								this.changestatus = -1
								// console.log(this.msprice)
							}
							// if(s.mgid == 44588){
							// 	console.log(s.mgtip)
							// }
						})
					})

				})
				this.changeprice(goodsid, dataTip, count)
			},
			changeprice(sid, Tip, count) {
				var goodsid = sid
				var dataTip = Tip
				var count = count
				http.post(`/app/carMaintainGoods/changeGoods.do?goodsId=${goodsid}&dataTip=${dataTip}&count=${count}`, {}).then(res => {
					// console.log(res)
					if (res.data != null) {
						var newlist = res.data
						newlist.forEach((r) => {
							this.mgbrandId = r.mgcatId
							// console.log(this.shopsitem)
							this.shopsitem.forEach((it) => {
								it.items.forEach((res) => {
									res.goods.forEach((e) => {
										if (this.mgbrandId == e.mgcatId) {
											res.goods = newlist
										}
									})
								})
							})
						})
						this.calcTotal()
						this.shopsitem.forEach(r => {
							r.mcprice = null
							r.items.forEach(e => {
								e.price = null
								e.goods.forEach(s => {
									s.changedGoodsId = null
									
									if (this.replaceId == 0) {
										if (this.nameTip != 0) {
											if (this.H5catId == s.mgcatId && this.nameTip == s.mgtip) {
												this.msprice = s.mgprice
												s.isFmMs = 1
												// console.log(this.msprice)
											}
										} else {
											if (this.H5catId == s.mgcatId) {
												// console.log(this.nameTip)
												this.msprice = s.mgprice
											}
										}
									} else {
										if (this.nameTip != 0) {
											if (this.H5catId == s.mgcatId && this.nameTip == s.mgtip) {
												this.mscprice = s.mgprice
												s.changedGoodsId = s.mgid
												s.isFmMs = null
												// console.log(this.mscprice)
											}
										} else {
											if (this.H5catId == s.mgcatId) {
												// console.log(this.nameTip)
												this.mscprice = s.mgprice
											}
										}
									}
									// console.log(this.msprice,this.mscprice)
									e.price += s.count * s.mgprice
									s.price = s.count * s.mgprice
									
								})
								r.mcprice += e.price
							})
						})
						
						// console.log(this.shopsitem)
					}
				})
			},
		}
	}
</script>

<style>
	.active {
		background: #F56B2D !important;
		color: #fff !important;
	}

	button::after {
		border: none;
	}

	.hiddstyle {
		height: 0;
		overflow: hidden;
	}
</style>
