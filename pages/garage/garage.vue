<template>
	<view style="width: 100vw;background: #eee;height: 100vh;">
		<view style="width: 100%;height: 100%;position: fixed;top: 0;background: #666666;opacity: 0.3;z-index: 998;" v-if="cancelId == 1"
		 @click="dele()">

		</view>
		<view style="position: absolute;top: 400upx;width: 100%;display: flex;justify-content: center;z-index: 999;" v-if="cancelId == 1">
			<view style="width: 480upx;height: 280upx;background: #fff;border-radius: 20upx;display: flex;
			flex-direction: column;justify-content: space-between;align-items: center;">
				<view style="font-size: 32upx;margin-top: 40upx;font-weight: bold;">
					温馨提示
				</view>
				<view style="font-size: 28upx;">
					是否确认操作
				</view>
				<view style="font-size: 26upx;width: 100%;display: flex;justify-content: space-between;border-top: 1px solid #eee;">
					<view style="flex: 2;text-align: center;border-right: 1px solid #eee;
					padding: 20upx 0;color: #999;" @click="confirmdele()">确认删除</view>
					<view style="flex: 2;text-align: center;padding: 20upx 0;color: #F56B2D;" @click="waitthink()">我在想想</view>
				</view>
			</view>
		</view>
		<view style="padding: 20upx 0;" :class="addpaddId == 1?'addpadd':''">
			<view style="background: #eee;padding:0 20upx;" v-for="(item,index) in carlist" :key='index' :class="index == 0?'':'smargin'">
				<view class="logolist" @click="getlogo(index,item.id)">
					<image style="width: 100upx;height: 100upx;" :src="item.brandImg" mode=""></image>
					<view style="margin-left:30upx ;">
						<view style="font-size: 30upx;">
							{{item.modelCatName}}-{{item.modelName}}
						</view>
						<view style="font-size: 24upx;padding: 10upx 0;">
							{{item.vehicleName}}
						</view>
					</view>
				</view>
				<view style="margin-top: -10upx;font-size: 24upx;display: flex;background: #fff;border-radius: 10upx;padding: 20upx;">
					<view style="margin-left: 450upx;width: 88upx;height: 38upx;line-height: 38upx;
					border: 1px solid #F4F4F4;text-align: center;border-radius: 100upx;"
					 @click="goDelet(index)" :id="index">
						删除
					</view>
					<view @tap="goSet(index)" :id="index">
						<view v-if="item.isdefault == 0" style="margin-left: 20upx;width: 128upx;height: 38upx;
						line-height: 38upx;border: 1px solid #F4F4F4;text-align: center;border-radius: 100upx;">
							设为默认
						</view>
						<view v-if="item.isdefault == 1" style="margin-left: 20upx;width: 128upx;height: 38upx;line-height: 38upx;
						border: 1px solid #F4F4F4;text-align: center;border-radius: 100upx;"
						 :class="item.isdefault == 1?'active':''">
							已为默认
						</view>
					</view>
				</view>
			</view>
		</view>
		<view style="width: 100%;padding: 20upx;box-sizing: border-box;margin-top: 50upx;position: fixed;bottom: 0upx;background: #FFFFFF;">
			<view style="line-height:100upx;text-align: center;background: #F56B2D;border-radius: 100upx;color: #fff;" @click="goAdd()">
				+添加爱车
			</view>
		</view>
	</view>
</template>

<script>
	var http = require('@/api/token.js')
	export default {
		data() {
			return {
				shoplist: [],
				carlist: [],
				defaultId: 0,
				addToId: 0,
				addpaddId: 0,
				jumpId: 0,
				changeid: 0,
				cancelId: 0,
				deleteid: 0
			}
		},
		onShow() {
			
		},
		onLoad(options) {
			this.getData()
			this.jumpId = options.id
		},
		methods: {
			getData() {
				http.post('/app/carmember/findCarMemberList.do', {}).then(res => {
					console.log(res.data)
					// var tomainId = id
					this.carlist = res.data
					if (this.carlist.length > 4) {
						this.addpaddId = 1
					} else {
						this.addpaddId = 0
					}
					this.carlist.forEach((value) => {
						if (value.isdefault) {
							this.shoplist = value
						}
					})
					uni.setStorageSync('defaultCar', this.shoplist)
					uni.setStorageSync('maintainCar', this.shoplist)
					if (this.changeid == 1) {
						uni.navigateBack({
							delta: 1
						})
					}
				})
			},
			waitthink() {
				this.cancelId = 0
			},
			dele() {
				this.cancelId = 0
			},
			confirmdele() {
				http.post(`/app/carmember/deleteCarMember.do?id=${this.deleteid}`, {}).then(res => {
					console.log(res)
					if (res.code == 1) {
						this.cancelId = 0
						this.getData()
					}
					if (res.code == 1000101) {
						this.cancelId = 0
						uni.showToast({
							title: res.msg,
							duration: 2000,
							icon: "none"
						})
					}
				})
			},
			goDelet(index) {
				this.deleteid = this.carlist[index].id
				this.cancelId = 1
			},
			goSet(index) {
				var carId = this.carlist[index].id
				http.post(`/app/carmember/changeDefault.do?carMemberId=${carId}`, {}).then(res => {
					console.log(res)
					this.changeid = 1
					this.getData()
				})
			},
			goAdd() {
				uni.navigateTo({
					url: '../carlist/carlist'
				})
			},
			getlogo(i,id) {
				var ids = this.carlist[i].id
				var vechid = id
				if (this.jumpId == 2) {
					uni.navigateTo({
						url: `../mycar/mycar?id=${ids}`
					})
				}
				if(this.jumpId == 3){
					console.log(this.carlist[i])
					var pages = getCurrentPages();
					console.log(pages)
					var currPage = pages[pages.length - 1]; //当前页面
					var prevPage = pages[pages.length - 2]; //上一个页面
					prevPage.setData({
					        vid:vechid
					})
					uni.navigateBack({
						delta: 1
					})
				}
				if(this.jumpId == 4){
					uni.redirectTo({
						url: `../maintain/maintain?ids=${vechid}`
					});
				}
			}
		}
	}
</script>

<style>
	.logolist {
		background: #fff;
		border-radius: 10upx;
		display: flex;
		padding: 20upx;
		align-items: center;
	}

	.active {
		background: #F56B2D !important;
		color: #FFFFFF !important;
	}

	.addpadd {
		padding-bottom: 160upx !important;
	}

	.smargin {
		margin-top: 20upx;
	}
</style>