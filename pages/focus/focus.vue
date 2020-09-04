<template>
	<view class="content">
		<view style="background: #fff;">
			<view v-if="redpackId == true" style="position: fixed;top: 0;bottom: 0;z-index: 999;display: flex;
			         justify-content: center;align-items: center;width: 100%;">
				<view style="width: 100%;height: 100%;position: absolute;background: #000000;opacity: 0.6;"></view>
				<view style="position: relative;z-index: 999;">
					<view style="position: relative;">
						<image style="width: 542upx;height: 699upx;" :src="redPacketPicUrl" mode="">
						</image>
						<view style="position: absolute;bottom: 40upx;width: 100%;display: flex;justify-content: center;">
							<view style="color: #C93B30;font-size: 34upx;font-weight: bold;border-radius: 100upx;width: 230upx;
							text-align: center;background: linear-gradient(#FFE0B4, #FFBD84);padding: 10upx 0;"
							 @click="getmoney()">
								立即领取
							</view>
						</view>
					</view>
					<image style="width: 58upx;height: 59upx;position: absolute;top: 0upx;right: 0upx;" src="../../static/xx.png"
					 @click="deleRed()"></image>
				</view>
			</view>
			<!-- banner图 -->
			<view class="banner">
				<swiper class="img" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
					<swiper-item v-for="(item,index) in banner" :key='index'>
						<image class="img" :src="item.imgurl"  style="width: 750rpx;" 
						@click="getView(item.type,item.storeId,item.goodsId,item.minfoId,item.htmId)"></image>
					</swiper-item>
				</swiper>
				<view class="toptips" style="margin-top: 20rpx;">
					<view class="choose">
						<view>
							{{city}}
						</view>
					</view>
					<!-- 搜索 -->
					<navigator animation-type='slide-in-bottom' url="../partssearch/partssearch">
						<view class="serch" style="opacity: 0.4;">
							<image src="../../static/search.png" mode=""></image>
							<input type="text" value="" placeholder="搜索" />
						</view>
					</navigator>
					<!-- 相机跟消息 -->
					<view class="crema">
						<image src="../../static/saosao.png" mode="" @click="getcode()"></image>
						<navigator url="../message/message" animation-type="fade-out" open-type="navigate" animation-duration="5000"
						 style="margin-left: 30upx;width: 33upx;height: 33upx;display: flex;align-items: center;">
							<image style="width: 26upx;width: 33upx;" src="../../static/xiaoxi.png" mode=""></image>
						</navigator>
					</view>
				</view>
			</view>
			<!-- 1788头条话题 -->
			<view class="oneseven" style="padding:10upx 20upx ;color: #999; ">
				<image class="seven" src="../../static/1788.png" mode=""></image>
				<swiper :autoplay="true" :interval="3000" :duration="1000" :circular="true" :vertical="true" style="font-size: 22upx;flex: 1;height: 30upx;padding:0 20upx ;">
					<swiper-item v-for="(item,index) in infolist" :key="index" @click="gotoinfoById(item.id)">
						{{item.title}}
					</swiper-item>
				</swiper>
			</view>
			<!-- 三个图片跟五个小图片 -->
			<view class="three-img" style="width: 100%;">
				<view class="List">
					<image v-for="(item,index) in imglist" id="demo" :key='index' class="item-img" :src="item" @tap="goTonext(index)"></image>
				</view>
				<view class="List2">
					<view v-for="(item,index) in imglist2" :key='index' style="text-align: center;padding: 0 20upx;flex: 3;" @click="getToours(item.url,index)">
						<image :src="item.img" style="width: 78upx;height: 78upx;"></image>
						<view style="font-size: 20upx;text-align: center;">
							{{item.text}}
						</view>
					</view>
				</view>
			</view>
		</view>
		<delago :iosId="iosId" :phonemodel="phonemodel" :platform="platform" @quxiao="quxiao"></delago>
		<view style="background: #fff;margin-top: 10upx;">
			<!-- 第二个主图 -->
			<view class="sec-banner">
				<image style="width: 720upx;height: 143upx;" :src="secbanner.imageUrl" mode="" @click="goTonext(1)">
					
				</image>
			</view>
			<!-- 三个排列小图 -->
			<view class="List3">
				<view v-for="(item,index) in imglist3" :key='index'>
					<image style="width: 224upx;height: 280upx;" :src="item.cimgurl" @click="getToH5(item.cid)"></image>
				</view>
			</view>
		</view>
		<!-- 产品服务 -->
		<view style="background: #fff;margin-top: 10upx;">
			<view class="third-cp">
				<view class="chanpin">
					<image src="../../static/zuanshi.png" mode=""></image>
					<view style="font-size: 32upx;line-height: 30upx;margin-left: 10upx;">
						最新活动
					</view>
				</view>
			</view>
			<!-- 五张图 -->
			<view style="padding: 20upx;display: flex;justify-content: space-between;box-sizing: border-box;">
				<image style="width: 224upx;height: 300upx;border-radius: 20upx;" mode="aspectFill" :src="firstimg.cimgurl" @click="getToH5(firstimg.cid)">
				</image>
				<view style="display: flex;flex-wrap: wrap;flex: 1;margin-left: 10upx;justify-content: space-between;">
					<view v-for="(item,index) in otherimg" :key='index' style="padding: 2upx 6rpx;">
						<image style="width: 224upx;height: 145upx;border-radius: 20upx;" :src="item.cimgurl" @click="getToH5(item.cid)"
						 mode="aspectFill"></image>
					</view>
				</view>
			</view>
		</view>
		<view style="background: #fff;margin-top: 10upx;">
			<view class="third-cp">
				<view class="chanpin">
					<image src="../../static/sstore.png" mode=""></image>
					<view style="font-size: 32upx;line-height: 30upx;margin-left: 10upx;">
						门店推荐
					</view>
				</view>
				<view style="font-size: 24upx;align-items: center;text-align: center;" @tap="gostore()">
					更多
					<image class="more" src="../../static/more.png" mode=""></image>
				</view>
			</view>
			<view class="store" v-for="(item,index) in storelist" :key='index' @click="gotostroes(item.storeId)" style="border-bottom: 1px solid #eee;">
				<image style="width:200upx;height: 160upx;border-radius: 10upx;" :src="item.imgurl" mode="aspectFill"></image>
				<view class="storelist" style="flex: 1;">
					<view style="font-weight: 500;font-size: 28upx;">
						{{item.sname}}
					</view>
					<view style="display: flex;font-size: 22upx;padding: 8upx 0;">
						<view style="display: flex;">
							<view>
								总评分
							</view>
							<view style="margin-left: 10upx;color:red">
								{{item.comScore}}
							</view>
						</view>
						<view style="margin-left: 20upx;display: flex;">
							<view>
								总订单
							</view>
							<view style="margin-left: 10upx;color:red">
								{{item.sbuyCount}}
							</view>
						</view>
					</view>
					<view style="width: 100%;display: flex;justify-content: space-between;font-size: 24upx;padding: 8upx 0;">
						<view style="width: 350upx;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">
							{{item.saddress}}
						</view>
						<view style="color: #D60808;font-size: 26upx;">
							{{item.kilo}}km
						</view>
					</view>
					<view style="display: flex;">
						<view style="margin-top: 8upx;" v-for="(ite,inde) in item.Tags" :key="inde">
								<view style="padding: 2upx 8upx;color: #F66C2D;font-size: 18upx;
								border: 1px solid #F66C2D;border-radius: 40upx;margin-left: 10upx;">
									{{ite.name}}
								</view>
						</view>
					</view>
				</view>
			</view>

		</view>
		<!-- 热门资讯 -->
		<view style="background: #fff;margin-top: 10upx;">
			<view class="third-cp">
				<view class="chanpin">
					<image src="../../static/quanqiu.png" style="width: 30upx;height: 30upx;" mode=""></image>
					<view id="demo2" style="font-size: 32upx;line-height: 30upx;margin-left: 10upx;">
						热门资讯
					</view>
				</view>

				<view style="font-size: 24upx;align-items: center;text-align: center;" @tap="goinfo()">
					更多
					<image class="more" src="../../static/more.png" mode=""></image>
				</view>
			</view>
			<view>
				<view id="demo" style="padding:0 20upx;box-sizing: border-box;" v-for="(item,index) in infolist" :key='index'
				 @click="gotoinfoById(item.id)">
					<view style="border-bottom: 1px solid #eee;padding: 10upx 0;">
						<view>
							{{item.title}}
						</view>
						<view>
							<view v-if="item.resimg.length == 1" v-for="(ite,inde) in item.resimg" :key="inde">
								<image v-if="ite.type == 0" style="width: 700upx;height: 280upx;border-radius: 5upx;margin-top: 10upx;" :src="ite.imgurl"
								 mode="">

								</image>
								<video v-if="ite.type == 1" style="width: 700upx;height: 280upx;border-radius: 5upx;margin-top: 10upx;" :src="ite.videourl">

								</video>
							</view>
							<view v-if="item.resimg.length != 1" style="display: flex;justify-content: space-between;flex-wrap: wrap;box-sizing: border-box;">
								<view v-for="(ite,inde) in item.resimg" :key="inde">
									<image style="width: 235upx;height: 150upx;border-radius: 5upx;margin-top: 10upx;" :src="ite.imgurl" mode="">

									</image>
								</view>
							</view>
						</view>
						<view style="display: flex;align-items: center;font-size: 22upx;color: #999;margin-top: 10upx;padding: 0 20upx;">
							<view>
								{{item.commentnum}}评论 / {{item.from}}
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import '../focus/focus.css'
	import {getuserinfo,getbanner,getfocusInfo,getfocusgoods,getsearch,getFstore,getoursmodel} from '@/getFocus/getFocus'
	import {delago} from "../focus/delago.vue"
	// import {saltEncode} from '@/api/salt.js'
	const http = require('@/api/token.js')
	const QQMapWX = require('../../qqsdk/qqmap-wx-jssdk.js');
	export default {
		data() {
			return {
				city: '',
				imglist: [
					'http://qiniu.1788c.cn/wrosh.png',
					'http://qiniu.1788c.cn/baoyang.png',
					'http://qiniu.1788c.cn/zixun.png'
				],
				imglist2: [
					{
						url: '../roadrescue/roadrescue',
						img: '../../static/roads.png',
						text: '道路救援'
					},
					{
						url: '../oilprice/oilprice',
						img: '../../static/price.png',
						text: '今日油价'
					},
					{
						url: '../transour/transour',
						img: '../../static/friend.png',
						text: '个人交易'
					},
					{
						url: '../answers/answers',
						img: '../../static/answer.png',
						text: '专家解答'
					},
				],
				imglist3: [],
				imglist4: [],
				Kilometer: [],
				cityList: [],
				banner: [], //banner图
				storelist: [], //店铺
				infolist: [], //资讯
				firstimg: [],
				otherimg: [],
				redpackId: false,
				secbanner: [],
				vehicleId: 0,
				redPacketPicUrl: '',
				platform: '',
				iosId: 0,
				phonemodel: ''
			}
		},
		onShareAppMessage() {
			getbanner().then(res =>{
				// console.log(res)
				this.banner = res.data
			})
			this.getsecbanner()
			getuserinfo()
		},
		onPullDownRefresh() {
			setTimeout(function() {
				uni.stopPullDownRefresh();
				getbanner().then(res =>{
					// console.log(res)
					this.banner = res.data
				})
				getuserinfo()
			}, 1000);
			this.getsecbanner()
			this.gettuijian()
		},
		onLoad() {
			// console.log(saltEncode())
			getbanner().then(res =>{
				console.log(res)
				this.banner = res.data
			})//banner
			getfocusInfo().then(res =>{
				console.log(res)
				this.infolist = res
			})
			getfocusgoods().then(res =>{
				this.imglist3 = res.data.slice(0, 3)
				this.firstimg = res.data[3]
				this.otherimg = res.data.slice(4, 8)
			})
			this.getcheckred()
			this.getsecbanner()
			getuserinfo()
			this.gettuijian()
		},
		components:{
			delago
		},
		methods: {
			gettuijian(){
				getFstore().then(res =>{
					// console.log(res)
					this.storelist = res.storelist
					if(this.storelist.comScore == null){
						this.storelist.comScore = 0
					}
					if(this.storelist.sbuyCount == null){
						this.storelist.sbuyCount = 0
					}
					this.city = res.city
				})
			},
			deleRed() {
				this.redpackId = false
			},
			getsecbanner() {
				http.post('/app/hdseckill/findHdSeckill.do', {}).then(res => {
					this.secbanner = res.data
					console.log(this.secbanner)
				})
			},
			getmoney() {
				if (uni.getStorageSync('Userdetail').token == undefined) {
					uni.navigateTo({
						url: '../login/login'
					})
				} else {
					http.post('/app/my/getHdRedPacket.do', {}).then(res => {
						console.log(res) //红包
						if (res.code == 1) {
							uni.showToast({
								title: res.msg,
								duration: 2000,
								icon: "none"
							})

						} else {
							uni.showToast({
								title: res.msg,
								duration: 2000,
								icon: "none"
							})
						}
						this.redpackId = false
					})
				}
			},
			getcheckred() {
				if (uni.getStorageSync('Userdetail').token == undefined) {
					http.post('/app/HdRedPacket/queryWhetherHasRedPacketToCollect.do', {}).then(res => {
						console.log(res)
						this.redPacketPicUrl = res.data.redPacketPicUrl
						this.redpackId = res.data.hasRedPacket
					})
				} else {
					http.post('/app/my/checkRedPacket.do', {}).then(res => {
						console.log(res) //红包
						this.redPacketPicUrl = res.data.redPacketPicUrl
						this.redpackId = res.data.hasRedPacket
					})
				}
			},
			getToH5(id) {
				var hdId = id
				if (hdId === 1) {
					uni.navigateTo({
						url: `../flashSale_qs/flashSale_qs`
					})
				} else if (hdId === 2) {
					uni.navigateTo({
						url: `../bargain_qs/bargain_qs`
					})
				} else if (hdId === 3) {
					uni.navigateTo({
						url: `../joinGroup_qs/joinGroup_qs`
					})
				} else {
					uni.navigateTo({
						url: `../activeH5/activeH5?Hid=${hdId}`
					})
				}
				// uni.navigateTo({
				// 	url: `../activeH5/activeH5?Hid=${hdId}`
				// })
			},
			quxiao(){
				this.iosId = 0
			},
			getToours(url, i) {
				getoursmodel().then(res =>{
					console.log(res)
					this.phonemodel = res.brand
					this.platform = res.platform
				})
				var URL = url
				var index = i
				if (index == 0) {
					this.iosId = 1
				}
				if (index == 1) {
					this.iosId = 1
				}
				if (index == 2) {
					uni.navigateTo({
						url: URL
					})
				}
				if (index == 3) {
					if (uni.getStorageSync('Userdetail').token != undefined) {
						uni.navigateTo({
							url: URL
						})
					} else {
						uni.showToast({
							title: '请您先登录',
							duration: 2000,
							icon: 'none'
						})
					}
				}
			},
			gotostroes(id) {
				var ids = id
				uni.navigateTo({
					url: `../storedetails/storedetails?id=${ids}&&index=0`
				})
			},
			getView(t,i,n,d,e) {
				var index = t
				var sid = i
				var gid = n
				var info = d
				var Hid = e
				console.log(e)
				if (index == 0) {
					uni.navigateTo({
						url: `../storedetails/storedetails?id=${sid}&&index=0`
					})
				}//店铺
				if (index == 1) {
					uni.navigateTo({
						url: `../productdetails/productdetails?id=${gid}`
					 })
				}//商品
				if (index == 2) {
					uni.navigateTo({
						url: `../Informationdetails/Informationdetails?id=${info}`
					 })
				}//资讯
				if (index == 3) {
					uni.navigateTo({
						url: `../activeH5/activeH5?Hid=${Hid}`
					})
				}//H5
			},
			gostore() {
				uni.switchTab({
					url: '../store/store'
				})
			},
			goTonext(index) {
				if (index === 0) {
					uni.navigateTo({
						url: '../washlist/washlist'
					})
				}
				if (index === 1) {
					if (uni.getStorageSync('Userdetail').token !== undefined) {
						http.post(`/app/carmember/findDefaultCarMember.do`, {}).then(res => {
							if (res.data != null) {
								var ids = res.data.id
								uni.navigateTo({
									url: `../maintain/maintain?ids=${ids}`
								})
							} else {
								uni.navigateTo({
									url: '../carlist/carlist'
								})
							}
						})
					} else {
						uni.navigateTo({
							url: '../login/login'
						})
					}
				}
				if (index === 2) {
					uni.navigateTo({
						url: '../information/information'
					})
				}
			},
			goinfo() {
				uni.navigateTo({
					url: '../information/information?hotId=2'
				})
			},
			gotoinfoById(id) {
				var ids = id
				uni.navigateTo({
					url: `../Informationdetails/Informationdetails?id=${ids}`
				})
			},
			gotoRecom() {
				uni.navigateTo({
					url: '../recommend/recommend'
				})
			},
			getcode() {
				getsearch()
			}, //扫码
			focusTo(id) {
				var ids = id
				uni.navigateTo({
					url: `../productdetails/productdetails?id=${ids}`
				})
			},
			gotoprefe(i) {
				var ids = i
				uni.navigateTo({
					url: `../preferential/preferential?id=${ids}`
				})
			}
		}
	}
</script>