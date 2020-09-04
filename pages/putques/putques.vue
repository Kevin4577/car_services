<template>
	<view style="background: #eee;overflow: hidden;">
		<view style="width: 100%;background: #fff;margin-top: 20upx;">
			<view style="font-size: 26upx;width: 100%;padding:30upx;
			border-bottom: 1px solid #eee;box-sizing: border-box;">
				请详细描述您的问题，以便专家更好的解答。
			</view>
			<view style="padding:30upx;box-sizing: border-box;">
				<textarea style="font-size: 26upx;color: #999;height: 150upx;width: 100%;" @blur="getquestion" value="" placeholder="您的车型是什么？公里数为多少？何时出现何种问题？该问题是否经常出现？请上传图片或视频进行提问" />

				<view v-if="comimglist.length != 0" style="margin-top: 30upx;">
					<view  style="width: 100%;display: flex;align-items: center;
					flex-wrap: wrap;box-sizing: border-box;">
						<view v-for="(item,index) in comimglist" :key="index" style="position: relative;">
							<image style="width: 220upx;height: 180upx;padding: 0 5upx;border-radius: 10upx;"
							 :src="item" mode="aspectFill" @click="answerviews(comimglist,index)"></image>
							<image style="width: 20upx;height: 24upx;position: absolute;top:0;right: -5upx;" 
							src="../../static/dele.png" @click="getDelecoms(index)"></image>
						</view>
					</view>
				</view>
				<view v-if="videos.length != 0" style="position: relative;margin-top: 30upx;width: 500upx;">
					<video style="width: 500upx;height: 260upx;border-radius: 10upx;" :src="videos" controls></video>
					<image style="width: 20upx;height: 24upx;position: absolute;top:0;right:-5upx;" src="../../static/dele.png"
					 @click="getDelecoms()"></image>
				</view>
				<view style="margin-top: 30upx;">
					<image v-if="videolen < 0" style="width: 136upx;height: 136upx;" src="../../static/xiangji.png" @click="sendimg()"></image>
					<image v-if="showId < 0" style="width: 136upx;height: 136upx;margin-left: 20upx;" src="../../static/shipin.png"
					 @click="sendvide()"></image>
				</view>
			</view>
		</view>
		<view style="position: fixed;bottom: 20upx;display: flex;justify-content: center;width: 100%;">
			<view style="background:#F56A2E;width: 650upx;line-height: 80upx;text-align: center;
			border-radius: 100upx;font-size: 32upx;color: #fff;" @click="getaddquestion()">
				提问
			</view>
		</view>
	</view>
</template>

<script>
	const http = require('@/api/token.js')
	var constant = require('@/config/constant.js')
	export default {
		data() {
			return {
				comimglist: [],
				videos: [],
				showId: -1,
				videolen: -1,
				type: 0,
				upvide:[],
				upimg:[],
				questionvalue:'',
				orderItems:[]
			}
		},
		onLoad() {

		},
		methods: {
			getquestion:function(e){
				this.questionvalue = e.detail.value
			},
			answerviews(img, i) {
				var imgs = img
				var myindex = i;
				uni.previewImage({
					current: myindex,
					urls: imgs
				})
			},
			sendimg() {
				var _this = this
				if (this.comimglist.length >= 9) {
					// this.showId = 1
					// this.getHidden()
				} else {
					uni.chooseImage({
						count: 9,
						sizeType: ['original'],
						sourceType: ['album'],
						success: function(res) {
							const temps = res.tempFilePaths
							for (var i = 0; i < temps.length; i++) {
								_this.comimglist.push(temps[i])
							}
							_this.comimglist = _this.comimglist.slice(0, 9)
							_this.type = 1
							_this.showId = _this.comimglist.length
							_this.Uploads(_this.comimglist)
						}
					})
				}
			},
			sendvide() {
				var _this = this
				uni.chooseVideo({
					count: 1,
					sourceType: ['camera', 'album'],
					success: function(res) {
						console.log(res.duration)
						if (res.duration > 15) {
							uni.showToast({
								title: '视频过长，请重新选择',
								duration: 2000,
								icon: 'none'
							})
						} else {
							if ((res.size / 1000000).toFixed(1) > 10) {
								_this.videos = []
							} else {
								_this.videos = res.tempFilePath
								_this.videolen = 1
								_this.type = 2
								_this.Duration = res.duration
								console.log(_this.videos)
								_this.Uploads(_this.videos)
							}
						}
					}
				})
			},
			Uploads(k) {
				var _this = this
				if (this.type == 1) {
					for (var i = 0; i < k.length; i++) {
						uni.uploadFile({
							url: constant.BASE_URL + '/app/uploadIamge.do',
							filePath: k[i],
							name: 'imgurl',
							formData: {},
							header: {
								"Content-Type": "multipart/form-data"
							},
							success: (res) => {
								console.log(res)
								_this.upimg.push(res.data)
							}
						})
					}
				}
				if (this.type == 2) {
					uni.uploadFile({
						url: constant.BASE_URL + '/app/uploadIamge.do',
						filePath: this.videos,
						name: 'imgurl',
						formData: {},
						header: {
							"Content-Type": "multipart/form-data"
						},
						success: (res) => {
							console.log(res);
							_this.upvide.push(res.data)
							// self.src = uploadFileRes.data
							
							console.log(_this.upvide)
						}
					});
				}
			},
			getDelecoms(index) {
				this.comimglist.splice(index, 1)
				console.log(this.comimglist.length)
				if (this.comimglist.length == 0) {
					this.showId = -1
				}
				this.videos = ''
				if (this.videos == '') {
					this.videolen = -1
				}
			},
			getaddquestion() {
				if(this.questionvalue != ''){
					if(this.upimg!=''){
						this.upimg.forEach((val)=>{
							var imgprase = []
							imgprase.push(JSON.parse(val))
							
							   imgprase.forEach((r) => {
								   var orderimg = {
									   "type":0,
									   "imgurl":r.data
								   }
								   console.log(orderimg)
								  this.orderItems.push(orderimg)
								   return
							   })
						})
					}else{
						this.upvide.forEach((val)=>{
							var videoprase = []
							videoprase.push(JSON.parse(val))
							   videoprase.forEach((r) => {
								   console.log(r.mgid)
								   var ordervideo = {
									   "type":1,
									   "imgurl":r.data+'?vframe/jpg/offset/1',
									   "videourl":r.data
								   }
								   console.log(ordervideo)
								  this.orderItems.push(ordervideo) 
							   })
						})	
					}
					var data = {
						"question": this.questionvalue,
						"resources": JSON.stringify(this.orderItems),
					}
					http.post(`/app/EsQuestion/addEsQuestion.do`,data,'application/x-www-form-urlencoded').then(res =>{
						console.log(res)
						if(res.code == 1){
							uni.navigateBack({
								delta:1
							})
						}
					})
				}else{
					uni.showToast({
						title:'请描述您的问题',
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
