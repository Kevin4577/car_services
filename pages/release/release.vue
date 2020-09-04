<template>
	<view>
		<view style="display: flex;padding: 5upx 0;">
			<view style="text-align: center;font-size: 28upx;display: flex;width: 100%;">
				<view v-for="(item,index) in ['车友圈','个人交易']" :key='index' @click="changeTab(index)" style="width: 50%;text-align: center;padding: 5upx 0;display: flex;flex-direction: column;align-items: center;"
				 :class="tabIndex === index ?'active':''">
					{{item}}
					<image style="width: 48upx;height: 4upx;" src="../../static/tabchoose1.png" v-if="tabIndex === index"></image>
				</view>
			</view>
		</view>
		<view v-if="tabIndex == 0">
			<view style="width: 100%;height: 100upx;padding: 20upx;">
				<input value="" placeholder="这一刻你想说的" style="height: 100%;" @blur="getVal" />
			</view>
			<view style="width: 100%;box-sizing: border-box;display: flex;justify-content: center;">
				<view style="display: flex;flex-wrap: wrap;width:100%;padding:20upx 45upx;align-items: center;">
					<view v-if="showimg == 0" v-for="(item,index) in imglist" @click="proview4(imglist,index)" :key="index" style="padding: 10upx;position: relative;" >
						<image style="width: 200upx;height: 200upx;" :src="item"></image>
						<image style="width: 20upx;height: 24upx;position: absolute;top:0;right: 20upx;" :key='index' src="../../static/dele.png" @click="getDele(index)"></image>
					</view>
					<view v-if="vid == 1" style="position: relative;padding-bottom: 20upx;">
						<video :src="videos" style="width: 500upx;height: 300upx;margin-right: 20upx;"
						 controls :duration="Duration" objectFit="contain"></video>
						 <image style="width: 20upx;height: 24upx;position: absolute;top:0;right: 20upx;" src="../../static/dele.png" @click="getDele()"></image>
					</view>
					<image v-if="imgId  == 0" style="width: 200upx;height: 200upx;"                     src="../../static/xiangji.png" @click="chooseImg()"></image>
			        <image v-if="videId == 0" style="width: 200upx;height: 200upx;margin-left: 20upx;"  src="../../static/shipin.png" @click="chooseVideo()"></image>
				</view>
				<view v-if="showId == 1" style="position: fixed;top: 400upx;height: 100upx;width:200upx;line-height: 100upx;
			    background: #ccc;color: #999;font-size: 24upx;text-align: center;padding: 0 20upx;border-radius: 100upx;">
					<text>最多只能选9张图</text>
				</view>
				<view v-if="showId == 2" style="position: fixed;top: 400upx;height: 100upx;width:200upx;line-height: 100upx;
				background: #ccc;color: #999;font-size: 22upx;text-align: center;padding: 0 20upx;">
					<text>视频大小大于10M</text>
				</view>
			</view>
			<view  style="float: right;background: #F0714E;color: #FFFFFF;line-height: 40upx;
			text-align: center;margin-right: 20upx;padding: 0 20upx;font-size: 22upx;border-radius: 20upx;" @click="getPublish()">
				发表
			</view>
		</view>
		<view v-if="tabIndex == 1">
			<view style="padding: 20upx;box-sizing: border-box;">
				<view style="width: 100%;border: 1px solid #eee;padding: 10upx 20upx;box-sizing: border-box;">
					<input type="text" value="" placeholder="标题" @blur="getreTitle"/>
				</view>
				<view style="border: 1px solid #eee;padding: 10upx 20upx;margin-top: 20upx;">
					<textarea value="" placeholder="物品描述" style="height: 200upx;" @blur="getrecontant"/>
				</view>
				<view style="display: flex;align-items: center;border: 1px solid #eee;padding: 10upx 20upx;margin-top: 20upx;">
					<input type="text" value="" placeholder="价格" @blur="getrePrice" style="width: 80upx;text-align: center;"/><view>元</view>
				</view>
				<view style="border: 1px solid #eee;padding: 10upx 20upx;margin-top: 20upx;">
					<input type="text" value="" placeholder="联系人姓名" @blur="getrename"/>
				</view>
				<view style="border: 1px solid #eee;padding: 10upx 20upx;margin-top: 20upx;">
					<input type="text" value="" placeholder="联系人电话" @blur="getrephone"/>
				</view>
			</view>
			<view style="width: 100%;box-sizing: border-box;display: flex;justify-content: center;">
				<view style="display: flex;flex-wrap: wrap;width:100%;padding:20upx 45upx;">
					<view v-if="showimg == 0" v-for="(item,index) in imglist" :key="index" style="padding: 10upx;position: relative;" >
						<image style="width: 200upx;height: 200upx;" :src="item"></image>
						<image style="width: 20upx;height: 24upx;position: absolute;top:0;right: 20upx;" :key='index' src="../../static/dele.png" @click="getDele(index)"></image>
					</view>
					<view v-if="vid == 1" style="position: relative;padding-bottom: 20upx;">
						<video :src="videos" style="width: 500upx;height: 700upx;margin-right: 20upx;"
						 controls :duration="Duration" objectFit="contain"></video>
						 <image style="width: 20upx;height: 24upx;position: absolute;top:0;right: 20upx;" src="../../static/dele.png" @click="getDele()"></image>
					</view>
					<image v-if="imgId  == 0" style="width: 200upx;height: 200upx;"                     src="../../static/xiangji.png" @click="chooseImg()"></image>
			        <image v-if="videId == 0" style="width: 200upx;height: 200upx;margin-left: 20upx;"  src="../../static/shipin.png" @click="chooseVideo()"></image>
				</view>
				<view v-if="showId == 1" style="position: fixed;top: 400upx;height: 100upx;width:200upx;line-height: 100upx;
			    background: #ccc;color: #999;font-size: 24upx;text-align: center;padding: 0 20upx;border-radius: 100upx;">
					<text>最多只能选9张图</text>
				</view>
				<view v-if="showId == 2" style="position: fixed;top: 400upx;height: 100upx;width:200upx;line-height: 100upx;
				background: #ccc;color: #999;font-size: 22upx;text-align: center;padding: 0 20upx;">
					<text>视频大小大于10M</text>
				</view>
			</view>
			<view  style="float: right;background: #F0714E;color: #FFFFFF;line-height: 40upx;
			text-align: center;margin-right: 20upx;padding: 0 20upx;font-size: 22upx;border-radius: 20upx;" @click="getRele()">
				发布
			</view>
		</view>
		
	</view>
</template>

<script>
	var http = require('@/api/token.js')
	var constant = require('@/config/constant.js')
	export default{
		data(){
			return{
				imglist:[],
				videos:'',
				chooseId:0,
				imgId:0,
				vid:0,
				videId:0,
				showimg:0,
				saveId:false,
				showId:0,
				Duration:0,
				textval:'',
				upimg:[],
				upvide:[],
				orderItems1:[],
				orderItems2:[],
				tabIndex:0,
				Area:[],
				retitle:'',
				reprice:0,
				resendId:0,
				releitems:[],
				revideos:[],
				recontant:'',
				rename:'',
				rephone:''
			}
		},
		
		onLoad() {
			console.log(uni.getStorageSync('area'))
			this.Area = uni.getStorageSync('area').ad_info
		},
		
		methods:{
			changeTab(index) {
				this.tabIndex = index
			},
			getVal:function(e){
				this.textval = e.detail.value
			},
			getHidden(){
				if(this.showId == 1 || this.showId == 2){
					setTimeout(()=>{
						this.showId = 0
					},2000)
				}
			},
			chooseImg(){
					var _this = this
					if(this.imglist.length >=9){
						this.showId = 1
						this.getHidden()
					}else{
						uni.chooseImage({
							count: 9,
							sizeType:['original'],
							sourceType: ['album'],
							success: function (res) {
									const temps = res.tempFilePaths
								for (var i = 0; i < temps.length; i++) {
									 _this.imglist.push(temps[i])
								}
								  _this.imglist =  _this.imglist.slice(0,9) 
								   _this.Upload(_this.imglist)
							}
							  })
						}	
			},
			chooseVideo(){
					var  _this = this
					uni.chooseVideo({
						  	count: 1,
						  	sourceType: ['camera', 'album'],
						  	success: function (res) {
								console.log(res.duration)
								if(res.duration >15){
									uni.showToast({
										title: '视频过长，请重新选择',
										duration: 2000,
										icon:'none'
									})
								}else{
									
									if((res.size/1000000).toFixed(1)>10){
										// console.log('文件过大')
										_this.videos = []
										_this.showId = 2
										_this.getHidden()
									}else{
										_this.videos = res.tempFilePath
										_this.Duration = res.duration
										console.log(_this.videos)
										_this.videoUp(_this.videos)	 
									}
								}
								  if(_this.videos != []){
									   _this.imgId = 1
									   _this.showimg = 1
									   _this.vid  = 1
								  }
						  	}
						})
			},
			proview4(img, i) {
				var imgList = []
				var imgs = img
				var myindex = i;
				console.log(imgs)
				// imgs.forEach((r) => {
				// 	imgList.push(r.imgurl)
				// })
				
				// console.log(myindex)
				uni.previewImage({
					current: myindex,
					urls: imgs
				})
			},
			Upload(k){
				var  _this = this
			   for (var i = 0; i < k.length; i++){
			       uni.uploadFile({
			           url:constant.BASE_URL + '/app/uploadIamge.do',
			           filePath:k[i],
			           name:'imgurl',
			           formData:{},
			           header:{"Content-Type": "multipart/form-data"},
			           success: (res) =>{
			   					console.log(res)
								_this.upimg.push(res.data)
			           }
			       })
			   }
			},
			videoUp(j){
				var  _this = this
				uni.uploadFile({
				            url: constant.BASE_URL +'/app/uploadIamge.do', 
				            filePath:this.videos,
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
			},
			getDele(index){
				this.imglist.splice(index,1)
				if(this.imglist.length == 0){
					 this.videId = 0
				}
				this.videos = ''
				if(this.videos == ''){
					 this.imgId = 0
					 this.vid  = 0
				}
				console.log(this.videos)
			},
			
			getPublish(){
				console.log(this.textval)
				if(this.textval == '' && this.upimg == '' && this.upvide == ''){
					uni.showToast({
						title:'文字、图片或视频不能都为空',
						duration:2000,
						icon:'none'
					})
				}else{
					if(this.upimg!=''){
						this.upimg.forEach((val)=>{
							var imgprase = []
							imgprase.push(JSON.parse(val))
							console.log(imgprase)
							   imgprase.forEach((r) => {
								   var orderimg = {
									   "type":0,
									   "imgurl":r.data
								   }
								   console.log(orderimg)
								  this.orderItems1.push(orderimg)
								   return
							   })
						})
						uni.request({
							url: `https://api.weixin.qq.com/wxa/msg_sec_check?access_token=${this.ACCESS_TOKEN}`,
							method: 'POST',
							data: {
								content: this.textval
							},
							success: (res) => {
								console.log(res)
								if(res.data.errcode == 0){
									var data1 = {
										"content": this.textval,
										"resources": JSON.stringify(this.orderItems1),
									    "title": this.textval,
									}//img
									http.post('/app/QzInfo/publishForm.do',data1,'application/x-www-form-urlencoded').then(res =>{
											console.log(res)
											if(res.code == 1){
												uni.navigateBack({
													delta:1
												})
											}
									})
								}else{
									uni.showToast({
										title: "您的评论包含敏感字符",
										duration: 2000,
										icon: "none"
									})
								}
							},
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
								  this.orderItems2.push(ordervideo) 
							   })
						})
						uni.request({
							url: `https://api.weixin.qq.com/wxa/msg_sec_check?access_token=${this.ACCESS_TOKEN}`,
							method: 'POST',
							data: {
								content: this.textval
							},
							success: (res) => {
								console.log(res)
								if(res.data.errcode == 0){
									var data2 = {
										   "content": this.textval,
										   "resources": JSON.stringify(this.orderItems2),
										   "title": this.textval,
									}//video
									http.post('/app/QzInfo/publishForm.do',data2,'application/x-www-form-urlencoded').then(res =>{
											console.log(res)
											if(res.code == 1){
												uni.navigateBack({
													delta:1
												})
											}
									})
								}else{
									uni.showToast({
										title: "您的评论包含敏感字符",
										duration: 2000,
										icon: "none"
									})
								}
							},
							})
					}
				}
			},
			getreTitle:function(e){
				this.retitle = e.detail.value	
			},
			getrePrice:function(e){
				this.reprice = e.detail.value
			},
			getrecontant:function(e){
				this.recontant = e.detail.value
			},
			getrename:function(e){
				this.rename = e.detail.value
			},
			getrephone:function(e){
				this.rephone = e.detail.value
			},
			
			getRele(){
				if(this.retitle != '' && this.reprice != '' && this.rename != '' && this.rephone != ''){
					if(this.upimg != ''){
						this.upimg.forEach((val)=>{
							console.log(JSON.parse(val))
							var imgprase = []
							imgprase.push(JSON.parse(val))
							console.log(imgprase)
							   imgprase.forEach((r) => {
								   // console.log(r.mgid)
								   var orderimg = {
									   "ttype":0,
									   "imgurl":r.data,
									   "imgUrl":r.data
								   }
								  this.releitems.push(orderimg)
							   })
						})
						uni.request({
							url: `https://api.weixin.qq.com/wxa/msg_sec_check?access_token=${this.ACCESS_TOKEN}`,
							method: 'POST',
							data: {
								content: this.recontant
							},
							success: (res) => {
								if(res.data.errcode == 0){
									var releData = {
									  "cityCode": this.Area.adcode.slice(0,4)+'00',//市  
									  "content": this.recontant,
									  "countyCode": this.Area.adcode,//区
									  "countyName": this.Area.district,
									  "extInfo": this.releitems[0].imgurl,
									  "phone":this.rephone,
									  "price": this.reprice,
									  "linkName":this.rename,
									  "provinceCode": this.Area.adcode.slice(0,3)+'000',//省
									  "resources": this.releitems,
									  "title": this.retitle,
									}
									http.post('/app/EsTransaction/addEsTransaction.do',releData).then(res =>{
										console.log(res)
										if(res.code == 1){
											uni.navigateBack({
												delta:1
											})
										}
									})
								}else{
									uni.showToast({
										title: "您的评论包含敏感字符",
										duration: 2000,
										icon: "none"
									})
								}
							},
							})
						
					}else{
						if(this.upvide !=''){
							this.upvide.forEach((val)=>{
								var imgprase = []
								imgprase.push(JSON.parse(val))
								console.log(imgprase)
								   imgprase.forEach((r) => {
									   console.log(r.mgid)
									   var orderimg = {
										   "ttype":1,
										   "imgUrl":r.data,
										   "imgurl":r.data+'?vframe/jpg/offset/1',
									   }
									  this.revideos.push(orderimg)
								   })
							})
							uni.request({
								url: `https://api.weixin.qq.com/wxa/msg_sec_check?access_token=${this.ACCESS_TOKEN}`,
								method: 'POST',
								data: {
									content: this.recontant
								},
								success: (res) => {
									if(res.data.errcode == 0){
										var releData = {
										  "cityCode": this.Area.adcode.slice(0,4)+'00',//市  
										  "content": this.recontant,
										  "countyCode": this.Area.adcode,//区
										  "countyName": this.Area.district,
										  "extInfo": this.revideos[0].imgurl,
										  "phone": this.rephone,
										  "price": this.reprice,
										  "provinceCode": this.Area.adcode.slice(0,3)+'000',//省
										  "resources": this.revideos,
										  "linkName":this.rename,
										  "title": this.retitle,
										}
										console.log(releData)
										http.post('/app/EsTransaction/addEsTransaction.do',releData).then(res =>{
											console.log(res)
											if(res.code == 1){
												uni.navigateBack({
													delta:1
												})
											}
										})
									}else{
										uni.showToast({
											title: "您的评论包含敏感字符",
											duration: 2000,
											icon: "none"
										})
									}
								},
								})
							
						}else{
							uni.showToast({
								title: '最少上传一张图或者视频',
								duration: 2000,
								icon:'none'
							})
						}
						
					}
				}else{
					uni.showToast({
						title: '请将信息填写完整',
						duration: 2000,
						icon:'none'
					})
				}
				
			}
			
		}
	}
</script>

<style>
	.active {
		color: #F56B2D;
	}
</style>
