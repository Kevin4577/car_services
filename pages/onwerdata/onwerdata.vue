<template>
	<view style="background: #eee;">
		<view style="display: flex;position: fixed;width: 100%;top: 0;z-index: 999;background: #fff;border-bottom: 1px solid #eee;">
			<view v-for="(item,index) in ['TA的发布','TA的交易']" :key="index" 
			style="flex: 1;text-align: center;padding: 20upx 0;display: flex;flex-direction: column;align-items: center;"
			 @click="changeimg(index)">
				<view :class="index == 0?'rightborder':''" style="width: 100%;text-align: center;">
					{{item}}
				</view>
				<image style="width: 48upx;height: 4upx;position: absolute;bottom: 0;" src="../../static/tabchoose1.png" v-if="imageId === index"
				 mode=""></image>
			</view>
		</view>
		<view style="background: #fff;margin-top: 110upx;padding:0 20upx;box-sizing: border-box;padding-bottom: 40rpx;">
			<view v-if="textId == 1" style="width: 100%;position: fixed;top: 0;bottom:100upx;z-index: 999;" @click="getupdown()">
			
			</view>
			
			<view v-if="imageId == 0" >
				<view style="display: flex;position: relative;" v-for="(item,index) in momentlist" :key='index'>
					<view v-if="ydzId == 1" style="width: 100%;height: 100%;position: absolute;top: 0;" @click="getWant()">

					</view>
					<image v-if="item.memberImgurl != null" style="width: 78upx;height: 78upx;border-radius: 100upx;" :src="item.memberImgurl" ></image>
					<image v-if="item.memberImgurl == null" style="width: 78upx;height: 78upx;border-radius: 100upx;" src="../../static/mrtx.png" mode=""></image>
					<view style="flex: 1;padding:5upx;margin-left: 5upx;">
						<view style="width: 100%;display: flex;justify-content: space-between;box-sizing: border-box;">
							<view style="font-size: 24upx;color:#5F75A2;font-weight: bold;" >
								{{item.memberName}}
							</view>
							<view style="font-size: 24upx;color: #ccc;">
								<view v-if="item.minours >24">
									{{item.minusDays}}天前
								</view>
								<view v-if="item.minours < 24 && item.minute >60">
									{{item.minours}}小时前
								</view>
								<view v-if="item.minute < 60 &&item.minute > 1">
									{{item.minute}}分钟前
								</view>
								<view v-if="item.minute < 1">
									刚刚
								</view>
							</view>
						</view>
						<view style="font-size: 26upx;line-height: 40upx;padding: 10upx 0;">
							{{item.content}}
						</view>
						<view style="display: flex;flex-wrap: wrap;width: 620upx;">
							<view v-for="(ite,inde) in item.imgs" :key="inde" >
								<video :id="'video'+index" v-if="ite.type == 1" style="width: 550upx;height: 300upx;padding: 15upx 0;" :src="ite.videourl"
								 controls direction="0" @play="provideo1('video'+index)">
								</video>
								<image v-if="ite.type == 0" style="width: 200upx;height: 200upx;padding: 5upx 2upx;" mode="aspectFill" :src="ite.imgurl"
								 @tap="proview(item.imgs,inde)"></image>
							</view>
						</view>

						<!-- 	我在这里啊 -->
						<view style="display: flex;justify-content: space-between;font-size: 40upx;align-items: center;">
							<view style="display: flex;align-items: center;font-size: 20upx;color: #999999;">
								<view>
									{{item.agreenum}}点赞
								</view>
								<view style="margin-left: 15upx;">
									{{item.commentnum}}评论
								</view>
							</view>
							<view style="display: flex;align-items: center;height: 45upx;">
								<view style="height: 45upx;position: relative;" :key='index' v-if="item.isstop == true">
									<image style="width: 280upx;height:45upx ;" src="../../static/moments.png"></image>
									<view style="position: absolute;width: 280upx;height: 45upx;top: 0;
									display: flex;align-items: center;justify-content: center;">
										<view v-if="item.agreed == 0" style="flex: 1;display: flex;align-items:center;justify-content: center;"
										 @click="getSup(index)">
											<image style="width: 30upx;height: 28upx;" src="../../static/moment1.png"></image>
											<view style="font-size: 22upx;margin-left:10upx;color: #FFFFFF;">点赞</view>
										</view>
										<view v-if="item.agreed == 1" style="flex: 1;display: flex;align-items:center;justify-content: center;"
										 @click="getSup(index)">
											<image style="width: 30upx;height: 28upx;" src="../../static/moment1.png"></image>
											<view style="font-size: 22upx;margin-left:10upx;color: #FFFFFF;">已点赞</view>
										</view>
										<view style="flex: 1;display: flex;align-items:center;justify-content: center;" @click="getCom(index,item.id)">
											<image style="width: 30upx;height: 30upx;" src="../../static/moment2.png"></image>
											<view style="font-size: 22upx;margin-left:10upx;color: #FFFFFF;">评论</view>
										</view>
									</view>
								</view>
								<image style="width: 60upx;height: 30upx;" src="../../static/gengduo.png" @click="getShow(index)"></image>
							</view>
						</view>
						<view style="background: #F6F6F6;margin-top: 10upx;padding:10upx  20upx;display: flex;align-items: center;" v-if="item.agreenum != 0">
							<image style="width: 20upx;height: 18upx" src="../../static/ydz.png" mode=""></image>
							<view style="font-size: 22upx;display: flex;align-items: center;margin-left: 10upx;">
								<view v-for="(ite,inde) in item.agres" :key="inde" style="display: flex;">
									<p v-if="inde != 0" style="color:#5F75A2">、</p>
									<view style="color:#5F75A2">
										{{ite.memberName}}
									</view>

								</view>
							</view>
						</view>
						<view style="background: #F6F6F6;margin-top: 10upx;padding: 10upx  20upx;box-sizing: border-box;" v-if="item.commentnum != 0">
							<view style="font-size: 24upx;">
								<view v-if="replayId == index">{{addreplay.rmemberName}}</view>
								<view v-for="(ite,inde) in item.com" :key="inde">
									<view style="display: flex;">
										<view @click="gorepl(ite.rmemberId,index,ite.rmemberName)" style="color:#5F75A2">
											{{ite.rmemberName}}
										</view>
										<view v-if="ite.replaymname != undefined" style="color:#5F75A2;margin-left: 10upx;">
											回复 {{ite.replaymname}}
										</view>
										<view style="margin-left: 10upx;">: {{ite.ccontent}}</view>
									</view>
								</view>
							</view>

							<view v-if="item.commentnum > 3" style="font-size: 24upx;color: #999999;text-align: center;padding: 10upx 0;"
							 @click="getAll(index)">
								查看全部
							</view>
						</view>
						<view style="box-sizing: border-box;width: 100%;background: #F6F6F6;padding: 10upx;position: fixed;bottom: 0;left: 0;"
						 v-if="textId == 1">
							<view style="display: flex;align-items: center;background: #FFFFFF;">
								<input type="text" :id="index" style="width: 80%;height: 30upx;font-size: 24upx;background: #FFFFFF;padding: 10upx;"
								 value="" :placeholder="sendvaluesname" @blur="getval" />
								<view @click="getsend()" style="font-size: 28upx;">
									发送
								</view>
							</view>
						</view>
					</view>
				</view>

			</view>
			<view v-if="imageId == 1">
				<view v-if="waterimg.length == 0" style="font-size: 28upx;color: #ccc;">
					这个用户很懒，没留下任何交易记录!
				</view>
				<view v-if="waterimg.length != 0" style="display: flex;box-sizing: border-box;justify-content: space-between;padding: 0 10upx;">
					<view>
						<view v-for="(item,index) in leftmglist" :key="index" 
						style="border-radius: 20upx;width: 340upx;display: flex;flex-wrap: wrap;justify-content: center;
						padding-bottom: 10upx ;box-shadow: 0 0 10upx #999;margin-top: 10upx;" @click="getactionId(item.transactionId)">
							<image style="width: 340upx;height: 250upx;" :src="item.extInfo" mode=""></image>
							<view style="font-size: 24upx;width: 300upx;padding: 5upx 0;">
								{{item.content}}
							</view>
							<view style="display: flex;font-size: 20upx;align-items: center;box-sizing: border-box;
							width: 300upx;justify-content: space-between;padding:5upx 10upx;">
								<view style="color: red;">
									￥{{item.price/100}}
								</view>
								<view >
									{{item.countyName}}
								</view>
							</view>
							<view style="display: flex;align-items: center;width: 300upx;">
								<image style="width: 30upx;height: 30upx;border-radius: 100%;" :src="item.memberImgurl" mode=""></image>
								<view style="font-size: 24upx;margin-left: 20upx;">
									{{item.memberName}}
								</view>
							</view>
						</view>
					</view>
					<view>
						<view v-for="(item,index) in rightmglist" :key="index" 
						style="border-radius: 20upx;width: 340upx;display: flex;flex-wrap: wrap;justify-content: center;
						padding-bottom: 10upx ;box-shadow: 0 0 10upx #999;margin-top: 10upx;" @click="getactionId(item.transactionId)">
							<image style="width: 340upx;height: 320upx;" :src="item.extInfo" mode=""></image>
							<view style="font-size: 24upx;width: 300upx;padding: 5upx 0;">
								{{item.content}}
							</view>
							<view style="display: flex;font-size: 20upx;align-items: center;box-sizing: border-box;
							width: 300upx;justify-content: space-between;padding:5upx 10upx;">
								<view style="color: red;">
									￥{{item.price/100}}
								</view>
								<view >
									{{item.countyName}}
								</view>
							</view>
							<view style="display: flex;align-items: center;width: 300upx;">
								<image style="width: 30upx;height: 30upx;border-radius: 100%;" :src="item.memberImgurl" mode=""></image>
								<view style="font-size: 24upx;margin-left: 20upx;">
									{{item.memberName}}
								</view>
							</view>
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
				imageId:0,
				memberId: 0,
				textId: -1,
				ydzId:0,
				comId: 0,
				momentlist: [],
				momentimg: [],
				commentslist: [],
				agreeMemberslist: [],
				Userdetail: '',
				addreplay: {},
				sendvalue: '',
				getshowId: -1,
				tabIndex: 0,
				replId: 0,
				replaymname:'',
				waterimg:[],
				leftmglist:[],
				rightmglist:[],
				videoIds:[],
				date: new Date().toISOString().slice(0, 10),
				datehours: new Date().getTime(),
			}
		},
		onLoad(options) {
			this.memberId = options.id
			this.onwerData()
			this.waterpush()
		},
		methods: {
			changeimg(index) {
				this.imageId = index
			},
			getupdown() {
				this.textId = 0
			},
			provideo1(id) {
				var ids = id
				var that = this
				if (ids != '') {
					this.videoIds.push(ids)
				}
				var array = [];
				for (var i = 0; i < this.videoIds.length; i++) {
					if (array.indexOf(this.videoIds[i]) === -1) {
						array.push(this.videoIds[i])
					}
				}
				for (var i = 0; i < array.length; i++) {
					if (ids == array[i]) {
						// console.log('播放视频不做处理');
					} else {
						var videoContext = uni.createVideoContext(array[i], that);
						videoContext.pause();
					}
				}
			},
			proview(img,i){
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
			getShow(index) {
				this.ydzId = 1
				var indexs = index
				let shops = this.momentlist.map((item, index) => {
					item.isstop = false
					if (indexs === index) {
						item.isstop = true
					}
					return item
				})
			},
			onwerData(){
				http.post(`/app/QzInfo/findQzInfoList.do?page=0&rows=0&memberId=${this.memberId}`, {}).then(res => {
					console.log(res)
					this.momentlist = res.data.list
					this.momentlist.forEach((r) => {
						if (r.content == null) {
							r.content = ''
						}
						var itemimg = {}
						if (r.resources != null) {
							r.imgs = JSON.parse(r.resources)
						} else {
							r.imgs = null
						}
						if(r.comments != ""){
							r.com = JSON.parse(r.comments)
						}else{
							r.com = ""
						}
						if(r.agreeMembers != ""){
							r.agres = JSON.parse(r.agreeMembers)
						}else{
							r.agres = ""
						}
						
						const dateTime = 1000 * 60 * 60 * 24
						const hour = 60 * 60 * 1000
						const minute = 1000 * 60
						r.comday = r.createTime.slice(0, 10)
						r.comhours = new Date(r.createTime.replace(/-/g, '/')).getTime()
						r.minusDays = Math.floor(Math.abs(Date.parse(this.date) - Date.parse(r.comday)) / dateTime)
						r.minours = Math.floor(Math.abs(this.datehours - r.comhours) / hour)
						r.minute = Math.floor(Math.abs(this.datehours - r.comhours) / minute)
					})
				})
				
			},
			getWant(){
				this.momentlist.forEach((r)=>{
					r.isstop = false
				})
				this.ydzId = 0
			},
			getSup(index) {
				this.ydzId = 0
				this.momentlist[index].isstop = false
				var agreed = this.momentlist[index].agreed
				var qzAgree = {}
				qzAgree.infoId = this.momentlist[index].id
				var Myagree = {}
				if (this.momentlist[index].agreeMembers != null) {
					var agreeitem = JSON.parse(this.momentlist[index].agreeMembers)
					agreeitem.forEach((item) => {
						Myagree = item
					})
				}
				var id = Myagree.id
				var infoId = Myagree.infoId
				if (agreed == 0) {
					http.post('/app/QzAgree/addQzAgree.do', qzAgree, 'application/x-www-form-urlencoded').then(res => {
						console.log(res)
						this.onwerData()
					})
				} else {
					http.post(`/app/QzAgree/deleteQzAgree.do?id=${id}&infoId=${infoId}`, {}).then(res => {
						console.log(res)
						this.onwerData()
					})
				}
			},
			getCom(index) {
				this.ydzId = 0
				this.textId = 1
				this.momentlist[index].isstop = false
				this.comId = this.momentlist[index].id
			},
			getval: function(e) {
				// this.textId = -1
				this.sendvalue = e.detail.value
			},
			gorepl(id, i,name) {
				this.replId = id
				this.replaymname = name
				console.log(this.replId)
				this.textId = 1
				this.momentlist[i].isstop = false
				this.comId = this.momentlist[i].id
			},
			getsend() {
				if (this.replId != 0) {
					if (this.sendvalue != '') {
						var qzInfoComment = {}
						qzInfoComment.infoId = this.comId
						qzInfoComment.ccontent = this.sendvalue
						qzInfoComment.replaymid = this.replId
						qzInfoComment.replaymname = this.replaymname
						http.post('/app/QzInfoComment/addQzInfoComment.do', qzInfoComment, 'application/x-www-form-urlencoded').then(res => {
							console.log(res)
							if (res.code == 1) {
								this.onwerData()
								this.textId = -1
							}
						})
					}
				} else {
					if (this.sendvalue != '') {
						var qzInfoComment = {}
						qzInfoComment.infoId = this.comId
						qzInfoComment.ccontent = this.sendvalue
						qzInfoComment.replaymid = 0
						http.post('/app/QzInfoComment/addQzInfoComment.do', qzInfoComment, 'application/x-www-form-urlencoded').then(res => {
							console.log(res)
							if (res.code == 1) {
								this.onwerData()
								this.textId = -1
							}
						})
					}
			
				}
			},
			getAll(index) {
				var moreinfoId = this.momentlist[index].id
				uni.setStorageSync('momentdetial', this.momentlist[index].id)
				uni.setStorageSync('agreed', this.momentlist[index].agreed)
				// 
				uni.navigateTo({
					url: `../replay/replay?id=${moreinfoId}`
				})
			},
			waterpush(){
				http.post(`/app/EsTransaction/findEsTransactionList.do?page=0&rows=0&memberId=${this.memberId}`, {}).then(res => {
					this.waterimg = res.data.list
					this.waterimg.forEach((r)=>{
						if(r.countyName == null){
							r.countyName = ""
						}
					})
					for (var i = 0; i < this.waterimg.length; i++) {
						if(i%2 == 0){
							this.leftmglist.push(this.waterimg[i])
						}else{
							this.rightmglist.push(this.waterimg[i])
						}
					}
				})
			},
			getactionId(id){
				var ids = id
				uni.navigateTo({
					url:`../transaction/transaction?id=${ids}`
				})
			}
		}
	}
</script>

<style>
.rightborder{
		border-right: 1px solid #ccc;
	}
</style>
