<template>
	<view style="background: #eee;">
		<view>
			<image style="width: 750upx;height: 400upx;" :src="shopsdata.thumbnail"></image>
		</view>
		<view style="padding: 20upx;box-sizing: border-box;margin-top: 20upx;background: #fff;">
			<view>
				<view style="font-size: 30upx;">
					{{shopsdata.name}}
				</view>
				<view style="display: flex;justify-content: space-between;padding: 20upx 0;">
					<view style="display: flex;font-size: 20upx;color: #D4AF6D;">
						<view>未消费随时退</view>
						<view style="margin-left: 20upx;">过期退</view>
					</view>
					<view style="font-size: 22upx;color: #999999;">已售{{shopsdata.buyCount}}</view>
				</view>
				<view style="font-size: 24upx;color: #999999;">
					{{shopsdata.intro}}
				</view>
				<view style="display: flex;justify-content: space-between;box-sizing: border-box;align-items: center;">
					<view>
						<view style="font-size: 32upx;color: #333333;padding: 10upx 0;">
							{{stroes.sname}}
						</view>
						<view style="padding: 10upx 0;font-size: 22upx;display: flex;align-items: center;">
							<image style="width: 22upx;height: 28upx;" src="../../static/ding.png" mode=""></image>
							<view style="margin-left: 20upx;">
								{{stroes.saddress}}
							</view>
						</view>
					</view>
					<view style="flex: 1;padding:0 20upx;display: flex;justify-content: space-between;">
						<view style="flex: 1;height: 60upx;border-right: 1px dashed #999;">

						</view>
						<view style="display: flex;flex-direction: column;align-items: center;margin-left: 30upx;">
							<image style="width: 36upx;height: 36upx;" src="../../static/zhinan.png" mode="" @click="gotogoods(stroes.lat,stroes.lon)"></image>
							<view style="font-size: 22upx;color: #D60808;">
								{{stroes.kilo}}km
							</view>

						</view>
					</view>
				</view>
			</view>
		</view>
		<view style="padding: 20upx;box-sizing: border-box;margin-top: 20upx;background: #fff;">
			<view style="font-size: 30upx;font-weight: bold;">
				普通洗车
			</view>
			<view style="padding: 10upx 0;">
				<view style="font-size: 24upx;display: flex;justify-content: space-between;padding: 10upx 0;">
					<view>
						原价
					</view>
					<view>
						￥{{shopsdata.mktprice/100}}
					</view>
				</view>
				<view style="font-size: 24upx;display: flex;justify-content: space-between;padding: 10upx 0;">
					<view>
						现价
					</view>
					<view style="color: red;">
						￥{{shopsdata.price/100}}
					</view>
				</view>
			</view>
		</view>
		<view style="padding: 20upx;box-sizing: border-box;margin-top: 20upx;background: #fff; padding-bottom:150upx ;">
			<view style="display: flex;padding: 10upx 0;border-bottom: 1px solid #EEEEEE;">
				<view v-for="(item,index) in ['详情','评价']" :key="index" 
				style="flex: 2;text-align: center;display: flex;flex-direction: column;align-items: center;"
				 @click="changeimg(index)" :class="index == 1?'borderactive':''">
					{{item}}
					<image style="width: 48upx;height: 4upx;margin-top: 10upx;" src="../../static/tabchoose1.png" v-if="imageId === index"
					 mode=""></image>
				</view>
			</view>
			<view v-if="imageId === 0">
				<view style="">
					<rich-text :nodes="richText"></rich-text>
				</view>
			</view>
			<view v-if="imageId === 1">
				<view style="display: flex;width: 240upx;justify-content: space-between;box-sizing: border-box;margin-top: 20upx;" >
					<view style="padding: 5upx 20upx;background: #eee;border-radius: 100upx;
						font-size: 24upx;" @click="changecom(0)"
					 :class="comId == 0?'comactive':''">
						全部({{allcomtotal}})  <!-- #ifdef APP-PLUS -->
						
						<!-- #endif -->
					</view>
					<view style="padding: 5upx 20upx;background: #eee;border-radius: 100upx;
						font-size: 24upx;" @click="changecom(1)"
					 :class="comId == 1?'comactive':''">
						有图({{imgcomtotal}})
					</view>
				</view>
				<view v-if="comId == 0">
					<view style="padding: 20upx;">
						<view v-for="(item,index) in allcom.list" :key="index" style="border-bottom: 1px solid #EEEEEE;padding: 20upx 0;">
							<view style="display: flex;align-items: center;font-size: 26upx;justify-content: space-between;">
								<view style="display: flex;align-items: center;">
									<image :src="item.uheadimg" style="width: 60upx;height: 60upx;border-radius: 100upx;" mode=""></image>
									<view style="margin-left: 20upx;">
										{{item.commembername}}
									</view>
								</view>
								<view>
									{{item.createTime}}
								</view>
							</view>
							<view>
								<view style="padding: 20upx 0;font-size: 26upx;">
									{{item.comcontent}}
								</view>
								<view v-for="(ite,inde) in AllimgAndvideo" :key="inde" v-if="inde == index" style="width: 620upx;display: flex;justify-content: space-between;flex-wrap: wrap;">
									<view v-for="(it,ind) in ite.img" :key="ind" v-if="ite.img != null">
										<video v-if="it.type == 1" :src="it.videourl" style="width: 200upx;height: 200upx;" controls></video>
										<image v-if="it.type == 0" :src="it.imgurl" mode="" style="width: 200upx;height: 200upx;"></image>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view v-if="comId == 1">
					<view style="padding: 20upx;">
						<view v-for="(item,index) in imgcom.list" :key="index" style="border-bottom: 1px solid #EEEEEE;padding: 20upx 0;">
							<view style="display: flex;align-items: center;font-size: 26upx;justify-content: space-between;">
								<view style="display: flex;align-items: center;">
									<image :src="item.uheadimg" style="width: 60upx;height: 60upx;border-radius: 100upx;" mode=""></image>
									<view style="margin-left: 20upx;">
										{{item.commembername}}
									</view>
								</view>
								<view>
									{{item.createTime}}
								</view>
							</view>
							<view>
								<view style="padding: 20upx 0;font-size: 26upx;">
									{{item.comcontent}}
								</view>
								<view v-for="(ite,inde) in imgAndvideo" :key="inde" v-if="inde == index" style="width: 620upx;display: flex;justify-content: space-between;flex-wrap: wrap;">
									<view v-for="(it,ind) in ite.img" :key="ind">
										<video v-if="it.type == 1" :src="it.videourl" style="width: 200upx;height: 200upx;" controls></video>
										<image v-if="it.type == 0" :src="it.imgurl" mode="" style="width: 200upx;height: 200upx;"></image>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view style="position: fixed;bottom: 0;padding: 20upx;background: #FFFFFF;width: 100%;box-sizing: border-box;box-shadow: 0 5upx 6upx #000000;">
			<view v-if="shopsdata.stock_num >= 0" style="width: 100%;height: 88upx;border-radius: 100upx;
			background: #F56B2C;text-align: center;line-height: 88upx;color: #fff;font-size: 32upx;"
			 @click="gotoconfirm(shopsdata.buy)">
				购买
			</view>
			<view v-if="shopsdata.stock_num == 0 && shopsdata.isactivity != 0" style="width: 100%;height: 88upx;border-radius: 100upx;
			background: #EEEEEE;text-align: center;line-height: 88upx;color: #ccc;font-size: 30upx;">
				已售完
			</view>
		</view>
	</view>
	</view>
</template>

<script>
	const http = require('@/api/token.js')
	const QQMapWX = require('../../qqsdk/qqmap-wx-jssdk.js')
	export default {
		data() {
			return {
				activeId: 0,
				imageId: 0,
				shopsdata: [],
				stroes: [],
				richText: '',
				comId: 0,
				allcom: [],
				imgcom: [],
				AllimgAndvideo: [],
				imgAndvideo: [],
				detailId: 0,
				allcomtotal:0,
				imgcomtotal:0,
				dataList1: [{
						img: '../../static/driveicon.png',
						word: '适用车型',
						text: '五座轿车/SUV/MPV',
						active: '.active1'
					},
					{
						img: '../../static/timeicon.png',
						word: '有效期',
						text: '长期有效',
						active: '.active2'
					},
					{
						img: '../../static/wenjicon.png',
						word: '预约信息',
						text: '此服务需提前致电门店进行预约',
						active: '.active3'
					},
					{
						img: '../../static/smlieicon.png',
						word: '温馨提示',
						text: '如需发票，请您在消费时向商户咨询',
						active: '.active4'
					},
				],
				imgLastPage: false,
				allLastPage: false,
				imgPagenum: 0,
				allPagenum: 0,
				memberId:0
			}
		},
		onShareAppMessage() {
			this.produlocation()
		},
		onReachBottom() {
			if (this.allLastPage != true) {
				var page = this.allPagenum + 1
				this.getprodatacom(page)

			} else {
				console.log("没有更多")
			}
			
			if (this.imgLastPage != true) {
				var page = this.imgPagenum + 1
				this.getproimgcom(page)

			} else {
				console.log("没有更多")
			}

		},
		onPullDownRefresh() {
			this.produlocation()
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		onLoad(options) {
			this.detailId = options.id
			this.produlocation()
			if(uni.getStorageSync('Userdetail').uid != undefined){
				this.memberId = uni.getStorageSync('Userdetail').uid
			}else{
				this.memberId = 0
			}
		},
		methods: {
			produlocation(){
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
								// console.log(uni.getStorageSync('area'))
								// console.log(res.result.address_component.city)
								_this.city = res.result.address_component.city
								_this.getprodata()
							}
						})
					}
				})
			},
			getprodata() {
				var lat = uni.getStorageSync('location').lat
				var lng = uni.getStorageSync('location').lng
				http.post(`/app/goods/findEsGoodsByDistance.do?id=${this.detailId}&lat=${lat}&lon=${lng}&memberId=${this.memberId}`, {}).then(res => {
					console.log(res)
					this.shopsdata = res.data
					this.richText = this.shopsdata.detail.replace(/\<img/gi,
						'<img style="display:-webkit-box;width:90% !important;margin:10px auto !important;" ');
					this.stroes = this.shopsdata.store
					this.stroes.kilo = ((this.stroes.distance) / 1000).toFixed(2)
					this.getprodatacom(1)
					this.getproimgcom(1)
				})
			},
			getprodatacom(all) {
				var allpage = all
				http.post(
					`/app/comment/findCommentByStoreIdWithPage.do?page=${allpage}&rows=10&
				storeId=${this.stroes.storeId}&type=-1&goodsId=${this.shopsdata.goodsId}`
				).then(res => {
					this.allLastPage = res.data.isLastPage
					this.allPagenum = res.data.pageNum
					if(res.data.total != undefined){
						this.allcomtotal = res.data.total
					}else{
						this.allcomtotal = 0
					}

					if (allpage == 1) {
						this.allcom = res.data.list
						this.getchuli(this.allcom)
					} else {
						this.allcom = this.allcom.concat(res.data.list)
						this.getchuli(this.allcom)
					}
				})
			},
			getproimgcom(img) {
				var imgpage = img
				http.post(
					`/app/comment/findCommentByStoreIdWithPage.do?page=${imgpage}&rows=10&
				storeId=${this.stroes.storeId}&type=3&goodsId=${this.shopsdata.goodsId}`
				).then(res => {
					console.log(res)
					this.imgLastPage = res.data.isLastPage
					this.imgPagenum = res.data.pageNum
					if(res.data.total != undefined){
						this.imgcomtotal = res.data.total
					}else{
						this.imgcomtotal = 0
					}
					if (imgpage == 1) {
						this.imgcom = res.data.list
						this.getchulitu(this.imgcom)
					} else {
						this.imgcom = this.imgcom.concat(red.data.list)
						this.getchulitu(this.imgcom)
					}

				})
			},
			getchulitu(list) {
				list.forEach((r) => {
					var imgcomImg = {
						"img": JSON.parse(r.resources)
					}
					this.imgAndvideo.push(imgcomImg)
				})
			},
			getchuli(list) {
				list.forEach((r) => {
					var allcomImg = {}
					if (r.resources != null) {
						allcomImg = {
							"img": JSON.parse(r.resources)
						}
					} else {
						allcomImg = {
							"img": null
						}
					}
					this.AllimgAndvideo.push(allcomImg)
				})
			},
			changeimg(index) {
				this.imageId = index
			},
			changecom(i) {
				console.log(i)
				this.comId = i
			},
			gotochange(index) {
				this.activeId = index
			},
			gotogoods(la, lo) {
				var lat = la
				var lon = lo
				uni.openLocation({
					latitude: lat,
					longitude: lon,
					success: function(res) {
						console.log(res);
					}
				})
			},
			gotoconfirm(ib) {
				var isbuy = ib
				console.log(isbuy)
				if (uni.getStorageSync('Userdetail').token != undefined) {
					if(isbuy){
						uni.showToast({
							title:'同类活动您已参加过!',
							duration:2000,
							icon:"none"
						})
					}else{
						uni.navigateTo({
							url: `../confirmation/confirmation?id=${this.detailId}`
						})
					}
				} else {
					uni.navigateTo({
						url: `../login/login`
					})
				}
			}
		}
	}
</script>

<style>
	.active1 {
		width: 32upx;
		height: 25upx;
	}

	.active2 {
		width: 32upx;
		height: 32upx;
	}

	.active3 {
		width: 32upx;
		height: 30upx;
	}

	.active4 {
		width: 32upx;
		height: 32upx;
	}

	.wordactive {
		color: #F56B2D
	}
	.borderactive{
		border-left: 1px solid #eee !important;
	}

	.comactive {
		color: #F66C2D !important;
	}
</style>
