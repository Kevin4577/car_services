<template>
	<view style="width: 100vw;height: 100vh;background: #eee;">
		<view style="background: #eee;margin-top: 20upx;padding: 20upx;">
			<view class="logolist">
				<image style="width: 72upx;height: 72upx;" :src="defaultCar.brandImg" mode=""></image>
				<view style="margin-left: 20upx;">
					<view style="font-size: 30upx;">
						{{defaultCar.modelCatName}}——{{defaultCar.modelName}}
					</view>
					<view style="font-size: 24upx;color:#999;">
						{{defaultCar.vehicleName}}
					</view>
				</view>
			</view>
		</view>
		<view style="padding: 10upx;">
			<view style="padding: 20upx;font-size: 28upx;">
				基本信息
			</view>
			<view style="background: #FFFFFF;border-radius: 10upx;padding: 10upx;">
				<view style="font-size: 24upx;padding: 10upx 0;border-bottom: 1px solid #eee;">
					<view>款型</view>
					<view style="padding: 10upx 0;">{{defaultCar.vehicleName}}</view>
				</view>
				<view style="display: flex;font-size: 24upx;padding: 10upx 0;border-bottom: 1px solid #eee;">
					<view style="flex: 1;border-right: 1px solid #eee;">
						<view>行驶里程(km)</view>
						<input style="margin-top: 10upx;" type="text" :placeholder="mileage" @blur="getmileage" />
					</view>
					<view style="flex: 1;margin-left: 15upx;">
						<view>上路时间</view>
						<picker v-if="defaultCar.startRunDate == null" mode="date" :value="startRunDate" :start="startDate" :end="endDate"
						 @change="bindDateChangestartRun">
							<view style="margin-top: 10upx;" class="uni-input">{{startRunDate}}(请选择)</view>
						</picker>
						<view style="margin-top: 10upx;" v-if="defaultCar.startRunDate != null">
							{{startRunDate}}
						</view>
					</view>
				</view>
				<view style="font-size: 24upx;padding: 10upx 0;">
					<view>注册时间</view>
					<picker v-if="defaultCar.registerDate == null" mode="date" :value="registerDate" :start="startDate" :end="endDate"
					 @change="bindDateChangeregister">
						<view style="margin-top: 10upx;" class="uni-input">{{registerDate}}(请选择)</view>
					</picker>
					<view style="margin-top: 10upx;" v-if="defaultCar.registerDate != null">
						{{registerDate}}
					</view>
				</view>
			</view>
		</view>
		<view style="padding: 10upx;font-size: 28upx;">
			<view style="padding: 20upx;">
				详细信息
			</view>
			<view style="background: #FFFFFF;border-radius: 10upx;padding: 20upx;">
				<view style="display: flex;font-size: 24upx;padding: 10upx 0;">
					<view style="flex: 1;border-bottom: 1px solid #eee;">
						<view>车牌号码</view>
						<input type="text" :placeholder="carNum" @blur="getcarNum" />
					</view>
				</view>
				<view style="font-size: 24upx;padding: 10upx 0;">
					<view>车辆识别号（VIN）</view>
					<input type="text" :placeholder="vehicleNum" style="border-bottom: 1px solid #eee;" @blur="getVIN" />
				</view>
				<view style="font-size: 24upx;padding: 10upx 0;">
					<view>发动机号码</view>
					<input type="text" :placeholder="EngineNum" style="border-bottom: 1px solid #eee;" @blur="getEngine" />
				</view>
			</view>
		</view>
		<view style="width: 100%;padding: 20upx;box-sizing: border-box;position: fixed;bottom: 0;background: #fff;">
			<view style="line-height: 80upx;font-size: 30upx;color: #FFFFFF;background: #F66A2E;width: 100%;
			border-radius: 100upx;text-align: center;"
			 @click="getUpdate()">
				完成
			</view>
		</view>
	</view>
</template>

<script>
	var http = require('@/api/token.js')
	export default {
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				defaultCar: {},
				registerDate: currentDate,
				startRunDate: currentDate,
				vehicleNum: '',
				EngineNum: '',
				mileage: 0.0,
				carId: 0,
				carNum: ''
			}
		},
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		onLoad(options) {
			this.carId = options.id
			this.getcardetial()
		},
		onShow() {

		},
		methods: {
			getcardetial() {
				http.post(`/app/carmember/findCarMember.do?id=${this.carId}`, {}).then(res => {
					this.defaultCar = res.data
					console.log(this.defaultCar)
					if(this.defaultCar.registerDate != null){
						this.registerDate = this.defaultCar.registerDate.slice(0,10)
					}
					if(this.defaultCar.startRunDate != null){
						this.startRunDate = this.defaultCar.startRunDate.slice(0,10)
					}
					if (this.defaultCar.mileage == null) {
						this.mileage = 0.0
					} else {
						this.mileage = this.defaultCar.mileage
					}

					if (this.defaultCar.vehicleNum == null) {
						this.vehicleNum = ''
					} else {
						this.vehicleNum = this.defaultCar.vehicleNum
					}

					if (this.defaultCar.engineNumber == null) {
						this.EngineNum = ''
					} else {
						this.EngineNum = this.defaultCar.engineNumber
					}

					if (this.defaultCar.licenseNumber == null) {
						this.carNum = ''
					} else {
						this.carNum = this.defaultCar.licenseNumber
					}
				})
			},
			// gotogarge() {
			// 	uni.navigateTo({
			// 		url: '../garage/garage'
			// 	})
			// },
			bindDateChangestartRun: function(e) {
				if(this.defaultCar.startRunDate == null){
					this.startRunDate = e.target.value
				}else{
					this.startRunDate = this.defaultCar.startRunDate.slice(0,10)
				}
			},
			bindDateChangeregister: function(e) {
				if(this.defaultCar.registerDate == null){
					this.registerDate = e.target.value
				}else{
					this.registerDate = this.defaultCar.registerDate.slice(0,10)
				}
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			getmileage: function(e) {
				if (e.detail.value == '') {
					if (this.defaultCar.mileage == null) {
						this.mileage = 0.0
					} else {
						this.mileage = this.defaultCar.mileage
					}
				} else {
					this.mileage = e.detail.value
				}
			},
			getVIN: function(e) {
				if (e.detail.value == '') {
					if (this.defaultCar.vehicleNum == null) {
						this.vehicleNum = ''
					} else {
						this.vehicleNum = this.defaultCar.vehicleNum
					}
				} else {
					this.vehicleNum = e.detail.value
				}
			},
			getEngine: function(e) {
				if (e.detail.value == '') {
					if (this.defaultCar.engineNumber == null) {
						this.EngineNum = ''
					} else {
						this.EngineNum = this.defaultCar.engineNumber
					}
				} else {
					this.EngineNum = e.detail.value
				}
			},
			getcarNum: function(e) {
				if (e.detail.value == '') {
					if (this.defaultCar.licenseNumber == null) {
						this.carNum = ''
					} else {
						this.carNum = this.defaultCar.licenseNumber
					}
				} else {
					this.carNum = e.detail.value
				}
			},
			getUpdate() {
				var data = {
					"id": this.defaultCar.id,
					"licenseNumber": this.carNum, //车牌号
					"engineNumber": this.EngineNum, //发动机
					"mileage": this.mileage, //历程
					"registerDate": this.registerDate, //注册时间
					"startRunDate": this.startRunDate, //上路
					"vehicleNum": this.vehicleNum //车架号
				}
				http.post('/app/carmember/updateCarMember.do', data, 'application/x-www-form-urlencoded').then(res => {
					console.log(res)
					if (res.code == 1) {
						this.getcardetial()
						uni.navigateBack({
							delta: 1
						})
					} else {
						uni.navigateBack({
							delta: 1
						})
					}
				})
			}

		}
	}
</script>

<style>
	.logolist {
		background: #fff;
		border-radius: 10upx;
		display: flex;
		padding: 30upx;
		box-sizing: border-box;
		align-items: center;
	}
</style>
