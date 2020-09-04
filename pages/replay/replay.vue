<template>
	<view style="background: #EEEEEE;position: relative;">
		<view v-if="showId == 1" style="width: 100%;height: 100%;position: absolute;" @click="deleshow()">
			
		</view>
		<view v-if="commontId == 1" style="width: 100%;position: fixed;top: 0;bottom:90upx;" @click="hiddens()">
			
		</view>
		<view style="display: flex;justify-content: space-between;padding: 20upx;box-sizing: border-box;background: #FFFFFF;">
			
			<image v-if="momentdetial.memberImgurl != null" style="width: 100upx;height: 100upx;border-radius: 100upx;" :src="momentdetial.memberImgurl" ></image>
			<image v-if="momentdetial.memberImgurl == null" style="width: 100upx;height: 100upx;border-radius: 100upx;" src="../../static/mrtx.png" ></image>
			<view style="flex: 1;padding: 0 20upx;">
				<view>
					<view style="width: 100%;display: flex;justify-content: space-between;box-sizing: border-box;">
						<view style="color: #5F75A2;font-size: 26upx;">
							{{momentdetial.memberName}}
						</view>
						<view style="font-size: 24upx;color: #ccc;">
							{{momentdetial.createTime}}
						</view>
					</view>
					<view style="font-size: 24upx;">
						{{momentdetial.content}}
					</view>
					<view style="display: flex;flex-wrap: wrap;">
						<view v-for="(item,index) in momentdetial.imgs" :key="index"
						style="padding: 10upx 0;">
							<video v-if="item.type == 1" :src="item.videourl" style="width: 550upx;height: 300upx;" controls 
							direction="0" ></video>
							<image v-if="item.type == 0" :src="item.imgurl" mode="" style="width: 230upx;height: 200upx;" 
							@tap="proview1(momentdetial.imgs,index)"></image>
						</view>
					</view>
					
				</view>
				<view style="display: flex;padding: 10upx 0;justify-content: space-between;box-sizing: border-box;" >
					<view style="display: flex;font-size: 24upx;color: #999999;">
						<view>{{momentdetial.agreenum}}点赞</view>
						<view style="margin-left: 20upx;">{{momentdetial.commentnum}}评论</view>
					</view>
					<view style="display: flex;align-items: center;height: 45upx;">
						<view style="height: 45upx;position: relative;"  v-if="isagree == 1">
							<image style="width: 280upx;height:50upx ;" src="../../static/moment.png"></image>
							<view style="position: absolute;width: 280upx;height: 45upx;top: 0;
							display: flex;align-items: center;justify-content: center;">
								<view v-if="momentdetial.agreed == 0" style="flex: 1;display: flex;align-items:center;justify-content: center;" 
								@click="getSup1(momentdetial.agreed)">
									<image style="width: 30upx;height: 28upx;" src="../../static/moment1.png"></image>
									<view style="font-size: 24upx;margin-left:10upx;color: #FFFFFF;">点赞</view>
								</view>
								<view v-if="momentdetial.agreed == 1" style="flex: 1;display: flex;align-items:center;justify-content: center;"
								 @click="getSup1(momentdetial.agreed)">
									<image style="width: 30upx;height: 28upx;" src="../../static/moment1.png"></image>
									<view style="font-size: 26upx;margin-left:10upx;color: #FFFFFF;">已点赞</view>
								</view>
								<view style="flex: 1;display: flex;align-items:center;justify-content: center;" @click="getCom1(momentdetial.id)">
									<image style="width: 30upx;height: 30upx;" src="../../static/moment2.png"></image>
									<view style="font-size: 24upx;margin-left:10upx;color: #FFFFFF;">评论</view>
								</view>
							</view>
						</view>
						<image style="width: 80upx;height: 40upx;" src="../../static/gengduo.png" @click="getShow1()"></image>
					</view>
					<!-- 	<image src="" mode=""></image> -->
				</view>
				
			</view>
			
		</view>
		<view style="width: 100%;padding:  20upx;background: #fff;box-sizing: border-box;" v-if="momentdetial.agreenum != 0">
			<view style="display: flex;align-items: center;background: #F6F6F6;width: 100%;padding:10upx 20upx;box-sizing: border-box;border-radius: 20upx;">
				<view style="width: 60upx;height: 60upx;display: flex;justify-content: center;align-items: center;">
					<image style="width: 35upx;height: 35upx;" src="../../static/dianzan.png" mode=""></image>
				</view>
				<view style="display: flex;align-items: center;">
					<view v-for="(item,index) in momentdetial.agres" :key="index"
					style="font-size: 22upx;color: #5F75A2;padding:0 10upx;height: 60upx">
					<image v-if="item.memberUrl != ''" style="width: 60upx;height: 60upx;border-radius: 10upx;" :src="item.memberUrl" mode=""></image>
					<image v-if="item.memberUrl == ''" style="width: 60upx;height: 60upx;border-radius: 10upx;" src="../../static/mrtx.png" mode=""></image>
					</view>
				</view>
			</view>
		</view>
		<view style="background: #FFFFFF;margin-top: 10upx;box-sizing: border-box;padding: 20upx;">
			<view style="background:#F6F6F6;width: 100%;padding: 20upx 30upx;display: flex;box-sizing: border-box">
				<image style="width: 35upx;height: 35upx;" src="../../static/huifu.png" mode=""></image>
				<view>
					<view v-for="(item,index) in inforeplay" :key="index" style="font-size: 26upx;padding:  5upx 10upx;display: flex;flex: 1;">
						<image v-if="item.rmemberUrl != ''" style="width: 60upx;height: 60upx;border-radius: 10upx;" :src="item.rmemberUrl" mode=""></image>
						<image v-if="item.rmemberUrl == ''" style="width: 60upx;height: 60upx;border-radius: 10upx;" src="../../static/mrtx.png" mode=""></image>
						<view style="display: flex;align-items: center;flex: 1;padding: 0 20upx;">
							<view style="color:#5F75A2 ;" @click="gorepls(item.rmemberId,index,item.rmemberName)">
								{{item.rmemberName}}：
							</view>
							<view  v-if="item.replaymname != null" style="margin-left: 10upx;">
								回复 {{item.replaymname}} ：
							</view>
							<view>
								{{item.ccontent}}
							</view>
						</view>
					</view>
				</view>
				<view style=";position: fixed;bottom: 20upx;width: 100%;left: 0;padding: 0 20upx;box-sizing: border-box;
				background: #fff;" v-if="commontId == 1" >
					<view style="display: flex;justify-content: space-between;padding: 10upx 40upx;width: 100%;
					align-items: center;background:#eee;box-sizing: border-box">
						<view style="width: 500upx;height: 52upx;border-radius: 30upx;border: 1px solid #999;padding: 0 20upx;">
						 <input style="height: 52upx;line-height: 52upx;font-size: 26upx;align-items: center;" 
						 type="text"  :placeholder="sendvaluesname" @blur="getcommont"/>
						</view>
						<view @click="sendCom()" style="font-size: 28upx;line-height: 30upx">发送</view>
					</view>
				</view>
				
			</view>
		</view>
	</view>
</template>

<script>
	const http = require('@/api/token.js')
	export default{
		data(){
			return{
				momentdetial:[],
				imgAndvideo:[],
				inforeplay:[],
				isagree:0,
				showId:0,
				commont:"",
				commontId:0,
				moreinfoId:0,
				comId:0,
				replId:0,
				replaymname:'',
				sendvaluesname:'说点什么吧'
			}
		},
		onLoad(options) {
			this.pushData()
			this.moreinfoId = options.id
			console.log(this.moreinfoId)
			this.getNewcom()
		},
		methods:{
			deleshow(){
				this.showId = 0
				this.isagree = 0
			},

			proview1(img,i){
				var imgList = []
				var imgs = img
				imgs.forEach((r)=>{
					imgList.push(r.imgurl)
				})
				var  myindex = i;
				console.log(myindex)
				uni.previewImage({
					current: myindex,
					urls: imgList
				})
			},
			getNewcom(){
				http.post(`/app/QzInfoComment/findQzInfoCommentList.do?page=1&rows=30&infoId=${this.moreinfoId}`, {}).then(res => {
					console.log(res)
					this.inforeplay = res.data.list
				})
			},
			getShow1(){
			   this.showId = 1
				if(this.isagree == 0){
					this.isagree = 1
				}
			},
			hiddens(){
				this.commontId = 0
			},
			gorepls(id, i, name){
				this.replId = id
				this.replaymname = name
				console.log(this.replId)
				this.commontId = 1
				this.inforeplay[i].isstop = false
				this.comId = this.momentdetial.id
				this.sendvaluesname = '回复：' + this.replaymname
			},
			getSup1(){
				this.isagree = 0
				this.showId = 0
				this.momentdetial.isstop = false
				var agreed = this.momentdetial.agreed
				var qzAgree = {}
				qzAgree.infoId = this.momentdetial.id
				var Myagree = {}
				if (this.momentdetial.agreeMembers != null) {
					var agreeitem = JSON.parse(this.momentdetial.agreeMembers)
					agreeitem.forEach((item) => {
						Myagree = item
					})
				}
				var id = Myagree.id
				var infoId = Myagree.infoId
				if (agreed == 0) {
					http.post('/app/QzAgree/addQzAgree.do', qzAgree, 'application/x-www-form-urlencoded').then(res => {
						console.log(res)
						if(res.code == 1){
							this.pushData()
						}
					})
				} else {
					http.post(`/app/QzAgree/deleteQzAgree.do?id=${id}&infoId=${infoId}`, {}).then(res => {
						console.log(res)
						if(res.code == 1){
							this.pushData()
						}
						
					})
				}
			},
			getCom1(){
				this.isagree = 0
				this.showId = 0,
				this.commontId = 1
				this.comId = this.momentdetial.id
			},
			getcommont:function(e){
				this.commont = e.detail.value
			},
			sendCom(){
				if (this.replId != 0) {
					if (this.commont != '') {
						var qzInfoComment = {}
						qzInfoComment.infoId = this.comId
						qzInfoComment.ccontent = this.commont
						qzInfoComment.replaymid = this.replId
						qzInfoComment.replaymname = this.replaymname
						http.post('/app/QzInfoComment/addQzInfoComment.do', qzInfoComment, 'application/x-www-form-urlencoded').then(res => {
							console.log(res)
							if (res.code == 1) {
								this.getNewcom()
								this.commontId = 0
								this.commont=""
							}
						})
					}
				} else {
					if (this.commont != '') {
						var qzInfoComment = {}
						qzInfoComment.infoId = this.comId
						qzInfoComment.ccontent = this.commont
						qzInfoComment.replaymid = 0
						http.post('/app/QzInfoComment/addQzInfoComment.do', qzInfoComment, 'application/x-www-form-urlencoded').then(res => {
							console.log(res)
							if (res.code == 1) {
								this.getNewcom()
								this.commontId = 0
								this.commont=""
							}
						})
					}
				
				}
			},
			pushData(){
				var  ids = uni.getStorageSync('momentdetial')
				http.post(`/app/QzInfo/findQzInfo.do?id=${ids}`, {}).then(res => {
					console.log(res)
					this.momentdetial = res.data
					this.momentdetial.agres = JSON.parse(this.momentdetial.agreeMembers)
					// this.imgAndvideo = 
					// console.log(this.momentdetial.resources)
					if(this.momentdetial.resources != null){
						this.momentdetial.imgs = JSON.parse(this.momentdetial.resources)
					}
					if(this.momentdetial.content == null){
						this.momentdetial.content = ''
					}
				})
			}
		}
		
		
	}
</script>

<style>
</style>
