<template>
	<view style="width: 100vw;height: 100vh;overflow: hidden;">
		<view style="display: flex;flex-direction: column;align-items: center;margin-top: 200upx;">
			<image style="width: 106upx;height: 106upx;" src="../../static/1788lo.png" mode=""></image>
			<view v-if="logId == 0" style="width: 100%;padding: 20upx 40upx;box-sizing: border-box;">
				<view style="font-size: 28upx;font-weight: bold;padding: 10upx 0;">
					欢迎加入1788
				</view>
				<view style="font-size: 24upx;padding: 10upx 0;">
					请确认以下授权信息
				</view>
				<view style="font-size: 20upx;padding: 10upx 0;">
					获取您的公开信息(昵称、头像等)
				</view>
				<button style="margin-top: 20upx;" type="primary" open-type="getUserInfo" @getuserinfo="getuserinfo"
				 withCredentials="true">微信授权</button>
			</view>
			<!-- -->
			<view v-if="logId == 1" style="padding: 20upx 0;background: #FFFFFF;width: 100%;background: #FFFFFF;z-index: 9999;">
				<view style="display: flex;flex-direction: column;align-items: center;padding: 100upx 20upx;">
					<view style="width: 100%;padding: 0 40upx;box-sizing: border-box;">
						<view style="display: flex;align-items: center;font-size: 26upx;width: 100%;
					       padding:15upx 0;box-sizing: border-box;border-bottom: 1px solid #E8E5E9;">
							<image style="width: 28upx;height: 31upx;" src="../../static/yonghu.png" mode=""></image>
							<view style="padding:0 20upx;display: flex;margin-left: 18upx;align-items: center;">
								<input type="text" :value="phonemobile" placeholder="请绑定手机号：" @blur="getInputphone" />
								<image style="width: 28upx;height: 28upx;margin-left: 10upx;" src="../../static/chongxin.png" @click="getdelp()"></image>
							</view>
							<view style="width:180upx;height: 66upx;line-height: 66upx;background: #E8E5E9;
						   						border-radius: 100upx;color: #999999;text-align: center;margin-left: 18upx;"
							 @click="getPhoneNumber" :class="showId == 1?'getcode':''">
								获取验证码
							</view>
						</view>
					</view>
					<view style="width: 100%;padding: 0 40upx;box-sizing: border-box;">
						<view style="display: flex;align-items: center;font-size: 26upx;width: 100%;padding: 25upx 0;
						box-sizing: border-box;border-bottom: 1px solid #E8E5E9;">
							<image style="width: 28upx;height: 32upx;" src="../../static/yanzhen.png" mode=""></image>
							<view style="padding:0 20upx;margin-left: 18upx;">
								<input type="text" value="" placeholder="请输入验证码：" @blur="getInputverCode" />
							</view>
						</view>
					</view>
					<view style="display:flex;margin-top: 50upx;">
						<view style="height: 88upx;line-height: 88upx;width: 650upx;text-align: center;
						border-radius: 100upx;background: #F66C2D;color: #fff;"
						 :class="getloginId == 0?'loginactive':''" @click="getverCode">
							同意并登录
						</view>

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
				showId: 0,
				phonemobile: '',
				getloginId: 0,
				logId: 0,
				stordetailId: 0
			}
		},
		onLoad() {},
		methods: {
			getuserinfo: function() {
				var that = this
				uni.login({
					success(res) {
						if (res.code) {
							console.log(res)
							var Code = res.code
							uni.getUserInfo({
								success: function(res) {
									console.log(res)
									var Headimg = res.userInfo.avatarUrl
									var Name = res.userInfo.nickName
									// uni.setStorageSync('Headimg', Headimg)
									// uni.setStorageSync('Name', Name)
									http.post(`/app/member/xcxWxlogin.do?code=${Code}&headimg=${Headimg}&name=${Name}`, {}).then(res => {
										uni.setStorageSync('openid', res.data.openid)
										if (res.data.token == null) {
											that.logId = 1
											console.log(res)
											// uni.setStorageSync("openid",res.data.openid)
										} else {
											uni.setStorageSync('Userdetail', res.data)
											http.post('/app/carmember/findDefaultCarMember.do', {}).then(res => {
												console.log(res)
												if (res.data != null) {
													uni.setStorageSync('defaultCar', res.data)
													console.log(uni.getStorageSync('defaultCar'))
													uni.switchTab({
														url: '../focus/focus'
													})

													console.log(1)
												} else {
													console.log('没有默认车型')
													uni.switchTab({
														url: '../focus/focus'
													})

												}
											})
										}
									})
								},
								fail: res => {
									// 获取失败的去引导用户授权 
								}
							})
						} else {
							//失败重新获取
						}
					}
				})
			},
			getInputphone: function(e) {
				console.log(e.detail.value)
				this.phonemobile = e.detail.value
				uni.setStorageSync('Mobile', e.detail.value) //获取用户绑定的手机号
				if (this.phonemobile != '') {
					this.showId = 1
				} else {
					this.showId = 0
				}
			},
			isPhone: function(val) {
				var bol = true;
				var telephone = /^(1[2345789]\d{9})$/
				if (!(telephone.test(val))) {
					bol = false
				}
				this.judge = bol
				return bol; //检测手机号是否正确
			},
			getPhoneNumber: function() {
				this.getInputphone
				var Mobile = uni.getStorageSync('Mobile')
				this.isPhone(Mobile)
				if (this.judge) {
					http.post(`/app/member/sendSms.do?mobile=${Mobile}`, {}).then(res => {
						console.log(res)
						if (res.code == 1) {
							this.showId = 0
						}
					})
				} else {
					uni.showToast({
						title: '手机号格式不正确',
						duration: 2000,
						icon: 'none'
					});
				}
			}, //获取验证码
			getInputverCode: function(e) {
				uni.setStorageSync('verCode', e.detail.value) //获取手机号返回的验证码
				if (uni.getStorageSync('verCode') != '') {
					this.getloginId = 1
				} else {
					this.getloginId = 0
				}
			},
			getdelp() {
				this.phonemobile = ''
			},
			getverCode: function() {
				this.getInputverCode
				var verCode = uni.getStorageSync('verCode')
				var Mobile = uni.getStorageSync('Mobile')
				var Openid = uni.getStorageSync('openid')
				http.post(`/app/member/bindMobile.do?openid=${Openid}&mobile=${Mobile}&code=${verCode}`, {}).then(res => {
					if (res === undefined) {
						uni.showToast({
							title: '网络连接失败',
							duration: 2000,
							icon: 'none'
						});
						return
					}
					if (res.data != -1) {
						console.log(res)
						if (res.code == 500106) {
							uni.showToast({
								title: '验证码错误',
								duration: 2000,
								icon: 'none'
							});
						} else {
							this.AfterId = 1
							// uni.setStorageSync('token', res.data.token)
							http.post('/app/carmember/findDefaultCarMember.do', {}).then(res => {
								console.log(res)
								if (res.data != null) {
									uni.setStorageSync('defaultCar', res.data)
									console.log(uni.getStorageSync('defaultCar'))
									uni.switchTab({
										url:'../focus/focus'
									})
								} else {
									console.log('没有默认车型')
									uni.switchTab({
										url:'../focus/focus'
									})
								}
							})
							uni.setStorageSync('Userdetail', res.data)
						}
					} else {
						console.log(res)
					}

				})
			} //验证成功后，通过手机号跟openid登录
		}
	}
</script>

<style>
	.getcode {
		background: #F36C2C !important;
		color: #FFFFFF !important;
	}

	.loginactive {
		background: #eee !important;
		color: #999 !important;
	}
</style>
