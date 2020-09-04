<template>
	<view class="main">
		<view class="mainimg">
			<view style="width: 100%;position: relative;height: 400upx;background:#f56b2d ;">
			</view>
			<view class="bgm">
				<view style="padding: 20upx;overflow: hidden;">
					<view class="" style="display: flex;float: right;">
						<image style="width: 26upx;height: 33upx;" src="../../static/xiaoxi.png" @click="getTomsg()"></image>
						<image style="width: 35upx;height: 33upx;margin-left: 40upx;" src="../../static/shezhi.png" @click="getToset()"></image>
					</view>
				</view>
				<view v-if="AfterId == 0" style="padding:25upx 10upx;display: flex;align-items: center;margin-top: -30upx;">
					<view style="border-radius: 50%;background: #fff;display: flex;align-items: center;justify-content: center;">
						<image style="width:120upx;height: 120upx;" src="../../static/mrtx.png"></image>
					</view>
					<view style="margin-left: 20upx;position: relative;">
						<view @click="getuserinfo" style="color: #714706;background: #FFC776;font-size: 24upx;
						border-radius: 100upx;padding:5upx 20upx;text-align: center;">
							去登录
						</view>
					</view>
				</view>
				<view v-if="AfterId == 1 " style="padding:25upx 10upx;display: flex;align-items: center;margin-top: -30upx;">
					<view style="display: flex;align-items: center;justify-content: center;" @click="getMyself()">
						<image style="width:120upx;height: 120upx;border-radius: 100upx;" :src="Userdetail.Headimg"></image>
					</view>
					<view style="margin-left: 20upx">
						<view style="color: #fff;">
							{{Userdetail.nickName}}
						</view>
						<view style="margin-top: 10upx;">
							<view v-if="signId == 0" style="color: #714706;background: #FFC776;font-size: 24upx;border-radius: 100upx;
							padding:5upx 20upx;text-align: center;z-index: 9999"
							 @click="getsign()">
								签到
							</view>
							<view v-if="signId == 1"  style="color: #714706;background: #FFC776;font-size: 24upx;border-radius: 100upx;
							padding:5upx 20upx;text-align: center;z-index: 9999">
								已签到
							</view>
						</view>
					</view>
				</view>
				<view class="bottom">
					<view style="display: flex;align-items: center;flex: 1;">
						<image v-if="valueId == 0" style="width: 40upx;height: 40upx;" src="../../static/tianjia.png" @click="AddTo()"></image>
						<image v-if="valueId == 1" style="width: 100upx;height: 100upx;" :src="defaultCar.brandImg"></image>
						<view style="padding: 0 20upx;display: flex;align-items: center;">
							<view style="margin-top: 5upx;" v-if="valueId == 1">
								<view style="font-size: 28upx;">{{defaultCar.modelCatName}}—{{defaultCar.modelName}}</view>
								<view style="font-size: 26upx;">{{defaultCar.vehicleName}}</view>
							</view>
							<view v-if="valueId == 0" style="font-size: 28upx;padding: 5upx 0;">{{value}}</view>
						</view>
					</view>
					<view v-if="valueId == 1" style="width: 150upx; height: 50upx;line-height: 50upx;font-size: 24upx;
						color: #fff;background: #F56B2D;text-align: center;border-radius: 100upx;"
					 @click="getPerfect()">
						管理车型
					</view>
				</view>
			</view>
		</view>
		<view class="looplist">
			<view class="listchoose">
				<view style="font-size: 28upx;text-align: center;" v-for="(item,index) in listchoose" :key='index'>
					<navigator :url="item.url">
						<view class="" style="color:#F56B2D;font-weight: 500;font-size: 30upx;">
							{{item.num}}
						</view>
						<view class="" style="margin-top: 20upx;">
							{{item.text}}
						</view>
					</navigator>
				</view>
			</view>
			<view class="listchoose1">
				<view style="padding: 10upx 0;font-size: 32upx;font-weight: 500;">
					我的订单
				</view>
				<view class="dingdan">
					<view style="text-align: center;" v-for="(item,index) in imglist" :key='index' @tap="goToorder(index)">
						<view style="position: relative;">
							<image :class="item.active" :src="item.img">

							</image>
							<view style="padding: 0 10upx;height: 25upx;color: #FFFFFF;text-align: center;top: -5upx;right: -10upx;
							font-size: 18upx;line-height: 25upx;border-radius: 100upx;background: #F17050;position: absolute;"
							 v-if="item.number !=0">
								{{item.number}}
							</view>
						</view>
						<view style="margin-top: 10upx;font-size: 26upx;">
							{{item.text}}
						</view>
					</view>
				</view>
			</view>
			<view class="iconlist">
				<view style="font-size: 26upx;text-align: center;padding: 20upx 0;" v-for="(item,index) in imglist2" :key='index'>
					<view  @click="gopage(index)"  v-if="index != 6">
						<button style="background: #fff;">
							<image :class="item.active" :src="item.img"></image>
							<view style="height: 34upx;line-height: 34upx;font-size: 26upx;">
								{{item.text}}
							</view>
						</button>
					</view>
					<view  @click="gopage(index)"  v-if="index == 6">
						<button open-type="contact" style="background: #fff;">
							<image :class="item.active" :src="item.img"></image>
							<view style="height: 34upx;line-height: 34upx;font-size: 26upx;">
								{{item.text}}
							</view>
						</button>
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
				signId: 0,
				value: '请选择您的车型',
				valueId: 0,
				Userdetail: {},
				AfterId: 0,
				defaultCar: {},
				MaskId: 0,
				vercodeId: 0,
				judge: false,
				selectData: [],
				datamsg: [],
				namedata: [],
				listchoose: [{
						num: '0',
						text: '余额',
						url: ''
					},
					{
						num: '0',
						text: '积分',
						url: '../shopmall/shopmall'
					},
					// {
					// 	num: '147',
					// 	text: '购物车',
					// 	url: '../shopcar/shopcar'
					// },s
					// {
					// 	num: '147',
					// 	text: '优惠券',
					// 	url: '../coupon/coupon'
					// },
					{
						num: '0',
						text: '收藏夹',
						url: '../favorites/favorites'
					}
				],
				imglist: [{
						text: '待付款',
						img: '../../static/1.png',
						active: 'active1',
						number: 0
					},
					{
						text: '待服务',
						img: '../../static/2.png',
						active: 'active2',
						number: 0
					},
					{
						text: '已完成',
						img: '../../static/3.png',
						active: 'active2',
						number: 0
					},
					{
						text: '待评价',
						img: '../../static/4.png',
						active: 'active3',
						number: 0
					},
					{
						text: '已退款',
						img: '../../static/5.png',
						active: 'active2',
						number: 0
					},
				],
				imglist2: [
					{
						text: '保养记录',
						img: '../../static/10.png',
						url: '../record/record',
						active: 'sty5'
					},
					{
						text: '评价中心',
						img: '../../static/7.png',
						url: '../center/center',
						active: 'sty2'
					},
					{
						text: '积分商城',
						img: '../../static/6.png',
						url: '../shopmall/shopmall',
						active: 'sty1'
					},
					{
						text: '推荐好友',
						img: '../../static/9.png',
						url: '../recommended/recommended',
						active: 'sty4'
					},
					{
						text: '保障服务',
						img: '../../static/8.png',
						url: '../service/service',
						active: 'sty3'
					},
					{
						text: '保养手册',
						img: '../../static/11.png',
						url: '../maintenance/maintenance',
						active: 'sty6'
					},
					{
						text: '联系客服',
						img: '../../static/12-2.png',
						url: '',
						active: 'sty7'
					},
					{
						text: '意见反馈',
						img: '../../static/13.png',
						url: '../feedback/feedback',
						active: 'sty8'
					}
				],

			}
		},
		onPullDownRefresh() {
			console.log('refresh');
			this.getfootsign()
			this.getnowshow()
			this.getmineinfo()
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		onShow() {
			this.getnowshow()
			this.getfootsign()
			this.checksign()
			this.getmineinfo()
		},
		onLoad() {
			this.getfootsign()
			this.checksign()
			// this.getnowshow()
			this.getmineinfo()
		},
		methods: {
			getmineinfo() {
				http.post(`/app/my/getUserInfo.do`, {}).then(res => {
					console.log(res)
					if (res.code == 1) {
						var myinfo = res.data
						var mybalance = myinfo.mccountlock
						this.listchoose[0].num = mybalance / 100
					} else {
						this.listchoose[0].num = 0
					}
				})
			},
			getsign() {
				http.post('/app/my/signIn.do', {}).then(res => {
					console.log(res)
					this.checksign()
					if(res.code == 1){
						uni.showToast({
							title:'+10积分',
							duration:1500,
							icon:'none'
						})
					}
				})
			},
			checksign() {
				http.post('/app/my/checkSign.do', {}).then(res => {
					console.log(res)
					this.signId = res.data
				})
				http.post('/app/my/getUserInfo.do', {}).then(res => {
					console.log(res)
					
					if (res.data.integral != null) {
						this.listchoose[1].num = res.data.integral
					} else {
						this.listchoose[1].num = 0
					}
				})
			},
			getMyself() {
				uni.navigateTo({
					url: '../personal/personal'
				})
			},
			getnowshow() {
				console.log(uni.getStorageSync("Userdetail"))
				if (uni.getStorageSync('Userdetail') != '') {
					this.Userdetail.nickName = uni.getStorageSync('Userdetail').uname
					this.Userdetail.Headimg = uni.getStorageSync('Userdetail').uheadimg
					this.AfterId = 1
				} else {
					this.AfterId = 0
				} //头像跟昵称
				if (uni.getStorageSync('defaultCar').code == 500105) {
					this.valueId = 0
				} else {
					if (uni.getStorageSync('defaultCar') != "") {
						this.defaultCar = uni.getStorageSync('defaultCar')
						this.valueId = 1
					} else {
						this.valueId = 0
					}
				}
			},
			getfootsign() {
				http.post('/app/my/findOrderSum.do', {}).then(res => {
					console.log(res)
					if (res.data.pay > 99) {
						this.imglist[0].number = 99
					} else {
						this.imglist[0].number = res.data.pay
						if (this.imglist[0].number == undefined) {
							this.imglist[0].number = 0
						}
					}

					if (res.data.service > 99) {
						this.imglist[1].number = 99
					} else {
						this.imglist[1].number = res.data.service
						if (this.imglist[1].number == undefined) {
							this.imglist[1].number = 0
						}
					}

					if (res.data.comment > 99) {
						this.imglist[3].number = 99
					} else {
						this.imglist[3].number = res.data.comment
						if (this.imglist[3].number == undefined) {
							this.imglist[3].number = 0
						}
					}
					this.imglist[2].number = 0
					this.imglist[4].number = 0
				})
				http.post('/app/my/getMyNumbers.do', {}).then(res => {
					console.log(res)
					this.listchoose[2].num = res.data.collectionNumbers
					console.log(res.data.collectionNumbers)
					if (this.listchoose[2].num == undefined) {
						this.listchoose[2].num = 0
					}

				})
			},
			gopage(i) {
				console.log(i)
				var Url = this.imglist2[i].url
				console.log(Url)
				if (i == 6) {

				} else {
					uni.navigateTo({
						url: Url
					})
				}
			},
			goToorder(index) {
				uni.navigateTo({
					url: '../order/order?id=' + index
				})
			},
			getPerfect() {
				uni.navigateTo({
					url: "../garage/garage?id=2"
				})
			},
			AddTo() {
				if (uni.getStorageSync('Userdetail').token !== undefined) {
					uni.navigateTo({
						url: '../carlist/carlist'
					})
				} else {
					uni.navigateTo({
						url: '../login/login'
					})
				}


			},
			getuserinfo: function() {
				uni.navigateTo({
					url: '../login/login'
				})
			}, //跳转登录页面
			getTomsg() {
				if (uni.getStorageSync('Userdetail').token !== undefined) {
					uni.navigateTo({
						url: '../message/message'
					})
				} else {
					uni.navigateTo({
						url: '../login/login'
					})
				}
			},
			getToset() {
				if (uni.getStorageSync('Userdetail').token !== undefined) {
					uni.navigateTo({
						url: '../setup/setup'
					})
				} else {
					uni.navigateTo({
						url: '../login/login'
					})
				}
			},
			getdefaultCar() {
				http.post('/app/carmember/findDefaultCarMember.do', {}).then(res => {
					// console.log(res)
					if (res.data != null) {
						uni.setStorageSync('defaultCar', res.data)
					} else {
						console.log('没有默认车型')
					}
				})
			}
		},

	}
</script>

<style>
	.main {
		width: 100vw;
		height: 120vh;
		background: #eee;
	}
	.bgm {
		position: absolute;
		top: 0;
		width: 100%;
		height: 400upx;
		padding: 0 20upx;
		box-sizing: border-box;
	}

	.bottom {
		margin-top: 100upx;
		width: 100%;
		height: 150upx;
		border-radius: 20upx;
		background: #fff;
		display: flex;
		justify-content: space-between;
		padding: 0 40upx;
		box-sizing: border-box;
		align-items: center;
	}

	.looplist {
		margin-top: 80upx;
		padding: 0 20upx;
	}

	.listchoose {
		height: 150upx;
		background: #FFFFFF;
		border-radius: 20upx;
		padding: 0 120upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		box-sizing: border-box;
	}

	.listchoose1 {
		margin-top: 20upx;
		background: #fff;
		border-radius: 20upx;
		padding: 0 20upx;
	}

	.dingdan {
		padding: 20upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		box-sizing: border-box;
	}

	.iconlist {
		margin-top: 20upx;
		border-radius: 20upx;
		background: #fff;
		padding: 20upx;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: center;
		box-sizing: border-box;
	}

	.active1 {
		width: 48upx;
		height: 44upx;
	}

	.active2 {
		width: 44upx;
		height: 44upx;
	}

	.active3 {
		width: 38upx;
		height: 44upx;
	}

	.sty1 {
		width: 43upx;
		height: 44upx;
	}

	.sty2 {
		width: 44upx;
		height: 40upx;
	}

	.sty3 {
		width: 43upx;
		height: 52upx;
	}

	.sty4 {
		width: 53upx;
		height: 52upx;
	}

	.sty5 {
		width: 40upx;
		height: 47upx;
	}

	.sty6 {
		width: 44upx;
		height: 47upx;
	}

	.sty7 {
		width: 45upx;
		height: 47upx;
	}

	.sty8 {
		width: 46upx;
		height: 47upx;
	}

	button::after {
		border: none;
	}
</style>
