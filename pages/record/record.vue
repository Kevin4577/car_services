<template>
	<view style="width: 100vw;height: 100vh;background: #eee;overflow: hidden;padding: 20upx;box-sizing: border-box;">
		<view style="padding: 20upx;background: #fff;overflow: hidden;margin-top: 20upx;border-radius: 10upx;">
			<view style="display: flex;align-items: center;">
				<image style="width: 130upx;height: 130upx;" :src="recordCar.brandImg" mode=""></image>
				<view style="padding:0 20upx;">
					<view style="font-size: 30upx;">
						{{recordCar.brandName}}-{{recordCar.modelName}}
					</view>
					<view style="font-size: 24upx;margin-top: 10upx;">
						{{recordCar.vehicleName}}
					</view>
					<view style="font-size: 24upx;margin-top: 10upx;">
						{{recordCar.vehicleNum}}
					</view>
				</view>
			</view>
			<view style="float: right;background: #F0714E;border-radius: 100upx;font-size: 20upx;width: 108upx;
			line-height: 38upx; red;text-align: center;color: #FFFFFF;"
			 @click="goChange()">
				切换车辆
			</view>
		</view>
		<view style="margin-top: 20upx;">
			<view style="padding: 20upx;background: #fff;border-radius: 10upx;margin-top: 20upx;" v-for="(item,index) in storesdata"
			 :key="index">

				<view style="display: flex;justify-content: space-between;align-items: center;">
					<view style="font-size: 30upx;font-weight: bold;padding: 20upx 0;border-bottom: 1px dashed #EEEEEE;">
						{{item.mmrstoreName}}
					</view>
					<image style="width: 12upx;height: 24upx;" src="../../static/more.png" mode=""></image>
				</view>
				<view style="margin-top: 10upx;">
					<view style="display: flex;justify-content: space-between;font-size: 24upx;padding:  10upx;align-items: center;">
						<view style="color: #999999;">保养时间</view>
						<view>{{item.mmrmaintainDate}}</view>
					</view>
					<view style="display: flex;justify-content: space-between;font-size: 24upx;padding:  10upx;align-items: center;">
						<view style="color: #999999;">使用机油</view>
						<view style="width: 250upx;overflow: hidden;
						      text-overflow:ellipsis;white-space: nowrap;">
							{{item.mmroil}}
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
				recordCar: [],
				storesdata: [],
				data: [{
						address: '南通洪江路店',
						list1: '车牌号',
						item1: '苏FD5H86',
						list2: '保养时间',
						item2: '2019-11-18',
						list3: '里程数',
						item3: '5617.6公里',
						list4: '机油',
						item4: '原厂件',
						list5: '配件更换',
						item5: '无',
					},
					{
						address: '南通跃龙路店',
						list1: '车牌号',
						item1: '苏FD5H86',
						list2: '保养时间',
						item2: '2019-11-18',
						list3: '里程数',
						item3: '5617.6公里',
						list4: '机油',
						item4: '原厂件',
						list5: '配件更换',
						item5: '无',
					}
				]
			}
		},
		onShow() {
			this.recordCar = uni.getStorageSync('defaultCar')
			if (this.recordCar.vehicleNum == null) {
				this.recordCar.vehicleNum = ''
			}
			this.getmainrecord()
		},
		onLoad() {
			this.getmainrecord()
		},
		methods: {
			getmainrecord() {
				var ids = uni.getStorageSync('defaultCar').id
				this.recordCar = uni.getStorageSync('defaultCar')
				if (this.recordCar.vehicleNum == null) {
					this.recordCar.vehicleNum = ''
				}
				console.log(this.recordCar)
				http.post(`/app/carMaintainRecord/findCarMaintainCatRecords.do?page=1&rows=10&carMemberId=${ids}`, {}).then(res => {
					console.log(res)
					this.storesdata = res.data.list
				})
			},
			goChange() {

				uni.navigateTo({
					url: '../garage/garage'
				})
			}
		}
	}
</script>

<style>
</style>
