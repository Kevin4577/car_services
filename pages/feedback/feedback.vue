<template>
	<view style="background: #EEEEEE;height: 100vh;">
		<view style="padding: 20upx;background: #eee;">
			<view style="background: #fff;border-radius: 10upx;padding: 30upx;">
				<view style="font-size: 26upx;padding-bottom: 20upx;">
					您的问题或建议：
				</view>
				<textarea style="height: 300upx;border: 1px dashed #999;padding: 30upx;font-size: 24upx;" 
				:value="feedvalue" placeholder="请简要描述您遇到的问题，并及时反馈给我们。" @blur="getfeedvalue"/>
			</view>
			<view style="background: #fff;border-radius: 10upx;padding: 20upx;margin-top: 20upx;">
				<view style="font-size: 26upx;padding-bottom: 20upx;">
					您的联系方式：
				</view>
				<view style="height: 56upx;border: 1px solid #999999;border-radius: 10upx;padding: 0 20upx;">
					<input style="height: 56upx;line-height: 56upx;font-size: 24upx;" 
					type="text" :value="feedname" placeholder="*姓名(必填)" @blur="getfeedname"/>
				</view>
				<view style="margin-top: 20upx;height: 56upx;border: 1px solid #999999;border-radius: 10upx;padding: 0 20upx;">
					<input style="height: 56upx;line-height: 56upx;font-size: 24upx;" 
					type="text" :value="feedphone" placeholder="*手机号(必填)" @blur="getfeedphone" />
				</view>
				<view style="font-size: 22upx;padding: 20upx 0;">
					* 请留下您的联系方式，以便我们能方便了解问题和及时反馈您的问题结果。如有紧急问题可拨打客服：400-065-1788 获得帮助
				</view>
			</view>
		</view>
		<view style="position: fixed;bottom: 100upx;width: 100%;display: flex;justify-content: center;">
			<view style="width: 660upx;height: 80upx;line-height: 80upx;text-align: center;background: #F56B2D;
			border-radius: 100upx;font-size: 30upx;color: #fff;" @click="getfeedback()">
				反馈意见
			</view>
		</view>
	</view>
</template>

<script>
	const http = require('@/api/token.js')
	export default {
		data() {
			return {
				feedvalue:'',
				feedname:'',
				feedphone:''
			}
		},
		onLoad() {

		},
		methods: {
			
			getfeedvalue:function(e){
				this.feedvalue = e.detail.value
			},
			getfeedname:function(e){
				this.feedname = e.detail.value
			},
			getfeedphone:function(e){
				this.feedphone = e.detail.value
			},
			getfeedback() {
				if(this.feedvalue != '' && this.feedname !='' && this.feedphone !=''){
					var data = {
						"content": this.feedvalue,
						"name": this.feedname,
						"phone": this.feedphone
					}
					http.post('/app/feedback/addSysFeedback.do', data, 'application/x-www-form-urlencoded').then(res => {
						console.log(res)
						if(res.code == 1){
							this.feedvalue = ''
							this.feedname = ''
							this.feedphone =''
						}
					})
				}else{
					uni.showToast({
						title:'请您将信息填写完整',
						duration:2000,
						icon:'none'
					})
				}
			}
		}
	}
</script>

<style>
</style>
