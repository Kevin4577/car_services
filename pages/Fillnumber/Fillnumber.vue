<template>
	<view>
		
		<view style="height: 80upx;line-height: 80upx;background: #F4F4F4;font-size: 28upx;padding: 0 20upx;font-weight: bold;">
			{{title}}
		</view>
		<view style="display: flex;padding: 20upx 40upx;justify-content: space-between;align-items: center;font-size: 24upx;">
			<view>车辆识别号：</view>
			<view style="padding: 0 20upx;border: 1px solid #EEEEEE;border-radius: 100upx;">
				<input type="text" value="" @blur="getDnum" placeholder="请输入17位车驾码" />
			</view>
			<view style="width: 128upx;height: 42upx;line-height: 42upx;border-radius: 100upx;
			background:#F56B2D;text-align: center;color: #FFFFFF;font-size: 24upx;" @click="getvehicleNum()">扫一扫</view>
		</view>
		<view style="padding: 20upx ">
			<view>示例:</view>
			<view style="display: flex;justify-content: center;margin-top: 20upx;padding: 0 30upx;">
				<view style="display: flex;justify-content: space-between;width: 100%;">
					<image style="width: 300upx;height: 168upx;border: 1px dashed #333;" :src="'http://qiniu.1788c.cn/sbm.png'"></image>
					<image style="width: 300upx;height: 168upx;" :src="'http://qiniu.1788c.cn/xsz.png'"></image>
				</view>
			</view>
		</view>
		<view  style="display: flex;justify-content: center;padding: 20upx;width: 100%;position: fixed;bottom: 20upx;box-sizing: border-box;">
			<view style="width: 100%;height: 80upx;line-height: 80upx;background: #F56B2D;color: #FFFFFF;text-align: center;border-radius: 100upx;"
			 @click="goback()">
				完成
			</view>
		</view>
	</view>
</template>

<script>
	var http = require('@/api/token.js')
	export default{
		data(){
			return{
				title:'车架号',
				DrivingNumber:''
			}
		},
		onLoad() {
			
		},
		methods:{
			getDnum: function(e) {
				// console.log(e.detail.value)
				if (e.detail.value.length == 17) {
					// uni.setStorageSync('DrivingNumber', e.detail.value)
					this.DrivingNumber = e.detail.value
				} else {
					uni.showToast({
						title: '车驾号错误',
						duration: 2000,
						icon: 'none'
					});
				}
			
			},
			getvehicleNum(){
				// uni.scanCode({
				// 	onlyFromCamera: true,
				// 	scanType: 'qrCode',
				// 	success: function(res) {
				// 		var data = {}
				// 		data.code = res.result
				// 		http.post('/app/AaCode/findByCode.do', data, 'application/x-www-form-urlencoded').then(res => {
				// 			console.log(res)
							
				// 		})
				// 	}
				// });
			},
			goback(){
				if(this.DrivingNumber != ''){
					var supInfo = uni.getStorageSync('maintainCar')
					var data ={
						"id": supInfo.id,		
						// "vehicleId":supInfo.vehicleId,	
						"vehicleNum": this.DrivingNumber
					}
					http.post('/app/carmember/updateCarMember.do',data, 'application/x-www-form-urlencoded').then(res=>{
						console.log(res)
						if(res.code == 1){
							http.post('/app/carmember/findCarMemberList.do', {}).then(res => {
							      console.log(res)	
									  res.data.forEach((r)=>{
										   if(r.id == supInfo.id){
											  console.log(r)
											  uni.setStorageSync('maintainCar',r)
											  uni.navigateBack({
											  	delta:1
											  })
										   }
										  
									  })
							})
							
						}
					})
				}
				
			}
		}
	}
</script>

<style>
</style>
