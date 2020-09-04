<template>
	<view>
		<view style="height: 226upx;background: #F0714E;color: #FFFFFF;font-size: 24upx;display: flex;align-items: center;padding: 0 30upx;">
			<image style="width: 80upx;height: 80upx;" :src="chooseimg" mode=""></image>
			<view style="margin-left: 20upx;font-size: 30upx;">{{names}}</view>
		</view>

		<view v-if="showId === 0">
			<view style="height: 80upx;line-height: 80upx;background: #F4F4F4;font-size: 28upx;padding: 0 24upx;">
				{{title}}
			</view>
			<view v-for="(item,index) in Turbo" :key='index' style="padding: 0 20upx;border-bottom: 1px solid #EEEEEE">
				<view @click="nextnumber(index,item.id,item.name)" style="padding: 20upx 0;font-size: 24upx;">
					{{item.name}}
				</view>
			</view>
		</view>
		<view v-if="showId === 1">
			<view style="height: 80upx;line-height: 80upx;background: #FFFFFF;font-size: 24upx;
			padding: 0 20upx;color: #666;" @click="getUp()">
				{{upname}} >
			</view>
			<view style="height: 80upx;line-height: 80upx;background: #F4F4F4;font-size: 28upx;padding: 0 24upx;">
				{{title}}
			</view>
			<view v-for="(item,index) in stylelist" :key='index' style="padding: 0 20upx;border-bottom: 1px solid #EEEEEE">
				<view @click="nextsave(index,item.name)" style="padding: 20upx 0;font-size: 24upx;">
					{{item.name}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	var http = require('@/api/token.js')
	export default {

		data() {
			return {
				showId: 0,
				upname:'',
				chooseimg: '',
				names: '',
				title: '',
				Turbo: [],
				turbo: '',
				Year: [],
				year: '',
				stylelist: [],
				styles: '',
				partId:0,
				completeId: 0,
				toptitle: ['选择生产年份', '选择车型'],
				modelIds:0
			}
		},
		onShow() {
			this.chooseimg = uni.getStorageSync('chooseCar')
			this.names = uni.getStorageSync('names')
		},
		onLoad(options) {
			this.choosetitle()
			this.modelIds  = options.index
			uni.setStorageSync('modelId', options.index)
			this.getmodels()
		},
		methods: {
			getmodels(){
				http.post(`/app/CarParticularYear/findCarParticularYearsByModelId.do?modelId=${this.modelIds}`, {}).then(res => {
					console.log(res) //返回modelId （例如id = 75） 
					this.Turbo = res.data
				})
			},
			choosetitle() {
				var index = this.showId
				this.title = this.toptitle[index]
			},
			getUp(){
				this.showId = 0
			},
			nextnumber(index,id,name) {
				this.upname = name
				this.showId = 1
				this.choosetitle()
				this.quwei()
				this.partId = id
				//（）
				http.post(`/app/CarVehicle/findCarVehiclesByParticularid.do?particularId=${this.partId}`, {}).then(res => {
					console.log(res)
					this.stylelist = res.data
					uni.setStorageSync('vehicleId', this.stylelist[index].id) 
					console.log(this.stylelist)
				})
			},
			nextsave(index,name){
				this.styles = name
				uni.setStorageSync('vehicleName', this.styles)
				this.addCar()
			},
			addCar() {
				var carlistModel = {}
				carlistModel.brandId = uni.getStorageSync('brandId') 
				carlistModel.brandImg = uni.getStorageSync('brandImg') 
				carlistModel.brandName = uni.getStorageSync('brandName')
				
				carlistModel.modelId = uni.getStorageSync('modelId') 
				carlistModel.modelName = uni.getStorageSync('modelName') 
				carlistModel.modelCatId = uni.getStorageSync('modelCatId') 
				carlistModel.modelCatName = uni.getStorageSync('modelCatName') 
				carlistModel.vehicleId = uni.getStorageSync('vehicleId')
				
				carlistModel.vehicleName = uni.getStorageSync('vehicleName')
				// carlistModel.vehicleNum = uni.getStorageSync('DrivingNumber')
				http.post('/app/carmember/addCarMember.do', carlistModel, 'application/x-www-form-urlencoded').then(res => {
					console.log(res)
					if(res.code == 1){
						uni.redirectTo({
							url:"../garage/garage?id=4"
						})
					}
				})
			},
			quwei() {
				var index = this.showId
				uni.setNavigationBarTitle({
					title: this.toptitle[index],
				});
			}
		}
	}
</script>

<style>
</style>
