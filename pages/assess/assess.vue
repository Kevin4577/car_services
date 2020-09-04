<template>
	<view style="background: #eee;padding-top: 20upx;">
		<view style="background: #fff;padding: 20upx;" v-for="(item,index) in comshop" :key="index">
			<view style="display: flex;padding:0 20upx ;align-items: center;" v-for="(ite,inde) in item.orderItems" :key="inde">
				<image style="width: 142upx;height: 142upx;border-radius: 5upx;" :src="ite.image" mode=""></image>
				<view style="font-size: 24upx;flex: 1;margin-left: 10upx;">
					{{ite.name}}
				</view>
			</view>
		</view>
		<view style="background: #fff;padding: 20upx;box-sizing: border-box;">
			<view style="font-size: 26upx;color: #999999;;width: 100%;box-sizing: border-box;">
				<textarea value="" placeholder="写下您用过的感受吧" @blur="getasscom" style="width: 100%;height: 100upx;padding: 20upx;box-sizing: border-box;" />
				</view>
			<view v-if="comimglist.length != 0">
				<view v-if="comimglist.length >2" style="width: 100%;display: flex;align-items: center;
				flex-wrap: wrap;box-sizing: border-box;justify-content: space-between;">
					<view v-for="(item,index) in comimglist" :key="index" style="position: relative;">
						<image style="width: 200upx;height: 200upx;" :src="item" mode=""></image>
						<image style="width: 20upx;height: 24upx;position: absolute;top:0;right: -5upx;"
						 src="../../static/dele.png" @click="getDelecom(index)"></image>
					</view>
				</view>
				<view v-if="comimglist.length <=2" style="width: 100%;display: flex;flex-wrap: wrap;box-sizing: border-box;align-items: center;">
					<view v-for="(item,index) in comimglist" :key="index" style="position: relative;">
						<image style="width: 200upx;height: 200upx;" :src="item" mode=""></image>
						<image style="width: 20upx;height: 24upx;position: absolute;top:0;right: -5upx;"
						 src="../../static/dele.png" @click="getDelecom(index)"></image>
					</view>
				</view>
			</view>
			<view v-if="videos.length != 0" style="position: relative;">
					<video style="width: 300upx;height: 260upx;" :src="videos" controls></video>
					<image style="width: 20upx;height: 24upx;position: absolute;top:0;right: -5upx;"
					 src="../../static/dele.png" @click="getDelecom()"></image>
			</view>
			<view style="padding: 30upx;">
				<image v-if="videolen < 0"  style="width: 136upx;height: 136upx;" src="../../static/xiangji.png" @click="sendimg()"></image>
				<image v-if="showId < 0" style="width: 136upx;height: 136upx;margin-left: 20upx;" src="../../static/shipin.png" @click="sendvide()"></image>
			</view>
		</view>
		<view style="background: #fff;padding: 20upx;margin-top: 20upx;">
			<view style="display: flex;align-items: center;padding: 20upx;">
				<image style="width: 4upx;height: 28upx;" src="../../static/shu.png" mode=""></image>
				<view style="margin-left: 20upx;font-size: 28upx;font-weight: bold;">产品评分</view>
			</view>
			<view style="padding:20upx 40upx;box-sizing: border-box;display: flex;justify-content: center;">
				<uni-rate value="0" size="30" @change='getstar'></uni-rate>
			</view>
		</view>
		<view style="position: fixed;bottom:  20upx;width: 100%;padding: 20upx;box-sizing: border-box;">
			<view style="height: 80upx;background:#F56B2D;border-radius: 100upx;text-align: center;color: #FFFFFF;line-height: 80upx;" @click="getAss()">
				评论
			</view>
		</view>

	</view>
</template>

<script>
	const http = require('@/api/token.js')
	var constant = require('@/config/constant.js')
	import uniRate from '@/components/uni-rate/uni-rate.vue'
	export default {
		data() {
			return {
				comshop: [],
				comimglist:[],
				videos:[],
				asscom:'',
				goodsId:0,
				score:-1,
				storeid:0,
				orderId:0,
				showId:-1,
				videolen:-1,
				type:0,
				upvide:[],
				upimg:[],
				orderItems:[]
			}
		},
		onLoad() {
			this.getassfor()
		},
		components: {
			uniRate
		},
		methods:{
			getassfor(){
				this.comshop = uni.getStorageSync('waitcom')
				console.log(this.comshop)
				this.comshop.forEach((r) =>{
					this.storeid =r.storeId
					this.orderId = r.oid
					r.orderItems.forEach((s) =>{
						console.log(s.goodsId)
						this.goodsId = s.goodsId
					})
				})
			},
			sendimg(){
				var _this = this
				if(this.comimglist.length >=9){
					// this.showId = 1
					// this.getHidden()
				}else{
					uni.chooseImage({
						count: 9,
						sizeType:['original'],
						sourceType: ['album'],
						success: function (res) {
								const temps = res.tempFilePaths
							for (var i = 0; i < temps.length; i++) {
								 _this.comimglist.push(temps[i])
							}
							  _this.comimglist =  _this.comimglist.slice(0,9)
							  _this.type = 1
							  _this.showId = _this.comimglist.length
							   _this.Upload(_this.comimglist)
						}
						  })
					}	
			},
			sendvide(){
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
									_this.videos = []
								}else{
									_this.videos = res.tempFilePath
									_this.videolen = 1
									_this.type = 2
									_this.Duration = res.duration
									console.log(_this.videos)
									  _this.Upload(_this.videos) 
								}
							}
					  	}
					})
			},
			Upload(k){
				var  _this = this
			   if(this.type == 1){
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
			   }
			   if(this.type == 2){
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
			   }
			},
			getAss(){
				if(this.score != -1 && this.asscom !=''){
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
								  this.orderItems.push(orderimg)
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
					if(JSON.stringify(this.orderItems) !== '[]'){
						 var data = {
						 	  "comcontent": this.asscom,
						 	  "comgoodsid":this.goodsId ,
						 	  "comorderid": this.orderId,
						 	  "comscore": this.score,
						 	  "comstoreid": this.storeid,
						 	  "comtype": 0,
						 	  "resources": JSON.stringify(this.orderItems),
						 	}
					}else{
						var data = {
							  "comcontent": this.asscom,
							  "comgoodsid":this.goodsId,
							  "comorderid": this.orderId,
							  "comscore": this.score,
							  "comstoreid": this.storeid,
							  "comtype": 0,
							}
					}
					http.post('/app/my/addEsComment.do',data,'application/x-www-form-urlencoded').then(res =>{
						console.log(res)
						if(res.code == 1){
							uni.navigateBack({
								delta:1
							})
						}
					})
				}else{
					uni.showToast({
						title:'请添加评分与评价内容',
						duration:2000,
						icon:'none'
					})
				}
				
			},
			getasscom:function(e){
				console.log(e.detail.value)
				this.asscom = e.detail.value
			},
			getstar:function(e){
				console.log(e.value)
				this.score = e.value
			},
			getDelecom(index){
				this.comimglist.splice(index,1)	
				console.log(this.comimglist.length)
				if(this.comimglist.length == 0){
					this.showId = -1
				}
				this.videos = ''
				if(this.videos == ''){
					this.videolen = -1
				}
			}
		}
	}
</script>

<style>
</style>
