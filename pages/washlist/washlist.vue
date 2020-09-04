<template>
	<view class="content">
		<screen @getchoose="getnum"></screen>
		<view style="padding: 0upx 20upx 20upx 20upx;margin-top: 10upx;background: #fff;margin-top: 75upx;">
			<view style="display: flex;box-sizing: border-box;justify-content: space-between;width: 100%;
			border-bottom: 1px solid #eee;padding-bottom: 10upx;padding-top: 30upx;"
			 v-for="(item,index) in washlist" :key="index">
				<image style="width: 180upx;height: 180upx;border-radius: 20upx;" :src="item.imgurl" mode="aspectFill"></image>
				<view style="flex: 1;padding: 0 15upx;">
					<view style="padding-bottom: 20upx;">
						<view style="font-size: 38upx;padding-bottom: 10upx;width: 500upx;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;" @click="gonext(item.storeId)">
							{{item.sname}}
						</view>
						<view style="display: flex;font-size: 26upx;color: #666;padding: 10upx 0;">
							<view style="display: flex;align-items: center;">
								<view>总评分：</view>
								<view style="color:#D60808;">{{item.comScore}}</view>
							</view>
							<view style="margin-left: 15upx;display: flex;align-items: center;">
								<view>总订单：</view>
								<view style="color:#D60808;">{{item.comNumber}}</view>
							</view>
						</view>
						<view style="width: 100%;padding: 10upx 0;display: flex;
						justify-content: space-between;font-size: 26upx;color: #666;">
							<view style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;width: 400upx;">
								{{item.saddress}}
							</view>
							<view>
								{{item.kilo}}km
							</view>
						</view>
						<view style="padding: 10upx 0;display: flex;">
							<view v-for="(it,ind) in item.Tags" :key="ind">
								<view style="color: #F56B2D;font-size: 22upx;border: 1px solid #F56B2D;
								width: 108upx;line-height: 30upx;text-align: center;border-radius: 30upx;" :class="ind != 0?'leftactive':''">
									{{it.name}}
								</view>
							</view>
						</view>
					</view>
					<view style="padding: 20upx 0;border-top: 1px solid #eee;" v-for="(ite,inde) in item.esGoods" :key="inde">
						<view style="display: flex;align-items: center;justify-content: space-between;">
							<view @click="washtodetail(ite.goodsId)">
								<view style="font-size: 30upx;color: #333;display: flex;align-items: center;">
									<p>{{ite.name}}</p>
									<p v-if="ite.isactivity != 0" style="width: 108rpx;height: 28rpx;background:#FFE6DA;text-align: center;color: #F56B2D;
									line-height: 28rpx;font-size: 24rpx;border-radius: 30rpx;margin-left: 20rpx;">
										超值抢购
									</p>
								</view>
								<view style="font-size: 24upx;color: #666;display: flex;">
									<p style="margin-right: 20rpx;">已售:{{ite.buyCount}}</p>
									<p style="color: #F56B2D;border-left: 1px solid #ccc;padding: 0 20rpx;" v-if="ite.isactivity != 0">剩余{{ite.stock_num}}</p>
								</view>
							</view>
							<view style="display: flex;align-items: center;">
								<view style="display: flex;margin-right: 20rpx;">
									<view style="color: #F56B2D;font-size: 26upx;display: flex;align-items: center;">
										<view style="margin-top: 6upx;">￥</view>
										<view style="font-size: 38upx;">{{ite.price/100}}</view>
									</view>
									<view v-if="ite.isactivity == 0" style="color: #F56B2D;font-size: 22upx;color: #999;margin: 10upx 0 0 10upx;
									display: flex;align-items: center;text-decoration: line-through;">
										<view >￥</view>
										<view >{{ite.mktprice/100}}</view>
									</view>
								</view>
								<view v-if="ite.stock_num >= 0" style=";font-size: 24upx;color: #fff;background: #F56B2D;
								width: 80upx;line-height: 36upx;border-radius: 50upx;text-align: center;" @click="Purchase1(ite.goodsId,ite.buy)">
									购买
								</view>
								<view v-if="ite.stock_num == 0 && ite.isactivity != 0" style="font-size: 20upx;color: #fff;background: #F56B2D;
								width: 80upx;line-height: 36upx;border-radius: 50upx;text-align: center;">
									已售完
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	const http = require('@/api/token.js')
	const QQMapWX = require('../../qqsdk/qqmap-wx-jssdk.js');
	import screen from '../../components/uni-screen/uni-screen.vue'
	export default {
		components: {
			screen
		},
		data() {
			return {
				datalist: [],
				isLastPage: false,
				Pagenum: 0,
				washlist: [],
				OptionId: 0,
				Index: 0,
				chooselist: [],
				areacode:'',
			    sortId:1,
				catid:0,
				memberId:0
			}
		},
		onPullDownRefresh() {
			this.Storeoaction()
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		onShareAppMessage() {
			this.Storeoaction()
			this.getDefault(1)
		},
		onReachBottom() {
			if (this.isLastPage != true) {
				var page = this.Pagenum + 1
				this.getDefault(page)
			} else {
				console.log("没有更多")
			}
		},
		onLoad() {
			this.Storeoaction()
			if(uni.getStorageSync('Userdetail').uid != undefined){
				this.memberId = uni.getStorageSync('Userdetail').uid
			}else{
				this.memberId = 0
			}		
		},
		methods: {
			getnum:function (e) {
				if(e.areacode != undefined){
					this.areacode = e.areacode
				}else{
					this.areacode = ''
				}//地区
				
				if(e.catid != undefined){
					this.catid = e.catid
				}else{
					this.catid = 0
				}//门店
				
				if(e.sortId != undefined){
					this.sortId = e.sortId
				}else{
					this.sortId = 1
				}//排序	
				this.getDefault(1)
			},
			Storeoaction() {
				let _this = this;
				uni.getLocation({
					type: 'gcj02',
					success: function(res) {
						const qqmapsdk = new QQMapWX({
							key: '22GBZ-RGZEX-RBQ4B-7HODA-ADFK2-XFBWR' //key腾讯地图api密钥  
						})
						qqmapsdk.reverseGeocoder({
							location: {
								latitude: res.latitude,
								longitude: res.longitude
							},
							success: res => {
								_this.pos = res.result.location
								uni.setStorageSync('location', _this.pos)
								uni.setStorageSync('area', res.result)
								_this.city = res.result.address_component.city
								_this.getDefault(1)
							}
						})
					}
				})
			},
			getDefault(pag) {
				var lat = uni.getStorageSync('location').lat
				var lon = uni.getStorageSync('location').lng
				var citycode = uni.getStorageSync('area').ad_info.adcode.slice(0, 4) + '00'
				var page = pag
				http.post(
					`/app/goods/findWashcarByCity.do?citycode=${citycode}&areacode=${this.areacode}&catid=${this.catid}&lat=${lat}&lon=${lon}
					&sort=${this.sortId}&page=${page}&rows=30&memberId=${this.memberId}`, {}
				).
				then(res => {
					console.log(res)
					this.washlist = res.data.list
					this.washlist.forEach((r => {
						if (r.tags != null) {
							r.Tags = JSON.parse(r.tags)
						} else {
							r.Tags = null
						}
						if(r.comScore == null){
							r.comScore = 0
						}
						if(r.comNumber == null){
							r.comNumber = 0
						}
						r.kilo = (r.distance / 1000).toFixed(2)
					}))
				})

			},
			Purchase1(id,ib) {
				var isbuy = ib
				if (uni.getStorageSync('Userdetail').token != undefined) {
					if(isbuy){
						uni.showToast({
							title:"同类活动您已参加过!",
							duration:2000,
							icon:"none"
						})
					}else{
						var ids = id
						uni.navigateTo({
							url: `../confirmation/confirmation?id=${ids}`
						})
					}
				} else {
					uni.navigateTo({
						url: '../login/login'
					})
				}
			
			},
			gonext(id) {
				uni.navigateTo({
					url: '../storedetails/storedetails?index=0' + '&&id=' + id
				})
			},//门店详情
			washtodetail(id){
				var ids = id
				uni.navigateTo({
					url: `../productdetails/productdetails?id=${ids}`
				})
			}//goods详情
		}
	}
</script>

<style>
	.borderactive {
		border-left: 1px solid #eee;
		border-right: 1px solid #eee;
	}

	.content {
		background: #eee;
		width: 100vw;
		height: 100vh;
	}

	.map {
		position: absolute;
		width: 38upx;
		height: 38upx;
		right: 20upx;
		top: 15upx;
	}

	.choosetop {
		display: flex;
		justify-content: space-between;
		padding: 20upx;
		box-sizing: border-box;
		background: #fff;
		margin-top: 15upx;
	}

	.store {
		display: flex;
		justify-content: space-between;
		padding: 20upx;
		box-sizing: border-box;
		background: #fff;
	}

	.storelist {
		flex: 1;
		display: flex;
		flex-direction: column;
		margin-left: 15upx;
		width: 100%;
	}
	.leftactive{
		margin-left: 10upx;
	}
</style>
