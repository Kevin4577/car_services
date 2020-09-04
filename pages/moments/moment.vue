<!-- <template>
	<view class="main">
		<demock :cancelId="deletId" :refundId="refundId"  @confirmdele="mydelet" @waitthink="mythink"></demock>
		<view style="background: #eee;position: fixed;width: 100%;top: 0;z-index: 999;border-bottom: 1px solid #eee;">
			<view style="background:#fff;position: fixed;bottom: 100upx;right: 20upx;
			padding: 20upx;border-radius: 100%;border: 1px solid #eee;opacity: 0.8;">
				<image style="width: 40upx;height: 30upx;" src="../../static/crama.png" @tap="goToreless()"></image>
			</view>
			<view style="display: flex;padding: 10upx 0;background: #fff;">
				<view style="text-align: center;font-size: 28upx;display: flex;width: 100%;">
					<view v-for="(item,index) in ['车友圈','个人交易']" :key='index' @click="changeTab(index)" style="width: 50%;text-align: center;padding: 5upx 0;display: flex;flex-direction: column;align-items: center;"
					 :class="tabIndex === index ?'active':''">
						<view :class="index == 0?'rightborder':''" style="width: 100%;text-align: center;">
							{{item}}
						</view>
						<image style="width: 48upx;height: 4upx;position: absolute;bottom: 0;" src="../../static/tabchoose1.png" v-if="tabIndex === index"></image>
					</view>
				</view>
			</view>
		</view>
		<view v-if="textId == 1" style="width: 100%;position: fixed;top: 0;bottom:100upx;z-index: 999;" @click="getupdown()">

		</view>
		<scroll-view scroll-y="true" style="background: #fff;margin-top: 75upx;height: 100vh;" @scrolltolower="loadmore"
		 @scrolltoupper="pushrefresh1" v-show="tabIndex == 0">
			<view style="display: flex;position: relative;padding: 20upx;border-bottom: 1px solid #eee;" v-for="(item,index) in momentlist"
			 :key='index'>
				<view v-if="ydzId == 1" style="width: 100%;height: 100%;position: absolute;top: 0;" @click="getWant()">

				</view>
				<image v-if="item.memberImgurl != null" style="width: 78upx;height: 78upx;border-radius: 100upx;" :src="item.memberImgurl" 
				@tap="gotoNext(item.memberid)"></image>
				<image v-if="item.memberImgurl == null" style="width: 78upx;height: 78upx;border-radius: 100upx;" 
				src="../../static/mrtx.png" @tap="gotoNext(item.memberid)"></image>
				<view style="flex: 1;padding:5upx;margin-left: 5upx;">
					<view style="width: 100%;display: flex;justify-content: space-between;box-sizing: border-box;">
						<view style="font-size: 28upx;color:#5F75A2;font-weight: bold;" @tap="gotoNext(item.memberid)">
							{{item.memberName}}
						</view>
						<view style="font-size: 24upx;color: #ccc;">
							<view v-if="item.minours >24">
								{{item.minusDays}}天前
							</view>
							<view v-if="item.minours < 24 && item.minute >60">
								{{item.minours}}小时前
							</view>
							<view v-if="item.minute < 60 && item.minute > 1">
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
						<view v-for="(ite,inde) in item.imgs" :key="inde">
							<video :id="'video'+index" v-if="ite.type == 1" style="width: 550upx;height: 300upx;padding: 15upx 0;" :src="ite.videourl"
							 controls direction="0" @play="provideo('video'+index)">
							</video>
							<image v-if="ite.type == 0" style="width: 200upx;height: 200upx;padding: 5upx 2upx;" mode="aspectFill" :src="ite.imgurl"
							 @tap="proview(item.imgs,inde)"></image>
						</view>
					</view>
					<view style="display: flex;justify-content: space-between;align-items: center;">
						<view style="display: flex;align-items: center;font-size: 22upx;color: #999999;">
							<view>
								{{item.agreenum}}点赞
							</view>
							<view style="margin-left: 15upx;">
								{{item.commentnum}}评论
							</view>
						</view>
						<view style="display: flex;align-items: center;height: 45upx;">
							<view style="height: 45upx;position: relative;" :key='index' v-if="item.isstop == true">
								<image style="width: 280upx;height:50upx ;" src="../../static/moments.png"></image>
								<view style="position: absolute;width: 280upx;height: 45upx;top: 0;
								display: flex;align-items: center;justify-content: center;">
									<view v-if="item.agreed == 0" style="flex: 1;display: flex;align-items:center;justify-content: center;" @click="getSup(index)">
										<image style="width: 30upx;height: 28upx;" src="../../static/moment1.png"></image>
										<view style="font-size: 26upx;margin-left:10upx;color: #FFFFFF;">点赞</view>
									</view>
									<view v-if="item.agreed == 1" style="flex: 1;display: flex;align-items:center;justify-content: center;" @click="getSup(index)">
										<image style="width: 30upx;height: 28upx;" src="../../static/moment1.png"></image>
										<view style="font-size: 26upx;margin-left:10upx;color: #FFFFFF;">已点赞</view>
									</view>
									<view style="flex: 1;display: flex;align-items:center;justify-content: center;" @click="getCom(index,item.id)">
										<image style="width: 30upx;height: 30upx;" src="../../static/moment2.png"></image>
										<view style="font-size: 26upx;margin-left:10upx;color: #FFFFFF;">评论</view>
									</view>
								</view>
							</view>
							<view v-if="myId == item.memberid" style="font-size: 26upx;color: #BEBEBE;
							margin-right: 20rpx;color:#5F75A2" @click="deletmyself(item.id)">
								删除
							</view>
							<image style="width: 60upx;height: 30upx;" src="../../static/gengduo.png" @click="getShow(index)"></image>
						</view>
					</view>
					<view style="background: #F6F6F6;margin-top: 10upx;padding:10upx  20upx;display: flex;align-items: center;" v-if="item.agreenum != 0">
						<image style="width: 20upx;height: 18upx" src="../../static/ydz.png" mode=""></image>
						<view style="font-size: 26upx;display: flex;align-items: center;margin-left: 10upx;">
							<view v-for="(ite,inde) in item.agres" :key="inde" style="display: flex;">
								<p v-if="inde != 0" style="color:#5F75A2">、</p>
								<view style="color:#5F75A2">
									{{ite.memberName}}
								</view>

							</view>
						</view>
					</view>
					<view style="background: #F6F6F6;margin-top: 10upx;padding: 10upx  20upx;box-sizing: border-box;" v-if="item.commentnum != 0">
						<view style="font-size: 26upx;">
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
						<view v-if="item.commentnum > 3"  style="font-size: 24upx;color: #999999;text-align: center;padding: 10upx 0;"
						 @click="getAll(index)">
							查看全部
						</view>
					</view>
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
		</scroll-view>
		<utrans :leftmglist="leftmglist" :rightmglist="rightmglist" :mototal="mototal" :tabIndex="tabIndex"
		@pushrefresh2="pushrefresh2" @loadmore="loadmore" @getactionId="getactionId"></utrans>
	</view>
</template>

<script>
	import Utrans from '../../components/uni-transtions/uni-transtions.vue'
	var http = require('@/api/token.js')
	import demock from '@/pages/ordersZ/Demock'
	export default {
		components: {
			demock,
			Utrans
		},
		data() {
			return {
				textId: 0,
				ydzId: 0,
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
				replaymname: '',
				waterimg: [],
				leftmglist: [],
				rightmglist: [],
				isLastPage: false,
				Pagenum: 0,
				page: 0,
				waterLastPage: false,
				waterPagenum: 0,
				date: new Date().toISOString().slice(0, 10),
				datehours: new Date().getTime(),
				sendvaluesname: '说点什么吧',
				bottomId: 0,
				indexCurrent: null,
				videoIds: [],
				ACCESS_TOKEN: '',
				mototal: 0,
				inspect: 0,
				myId: 0,
				deletId:0,
				refundId:1,
				mydeledId:0,
			}
		},
		onShareAppMessage() {
			this.RefreshData(1)
			this.waterpush(1)
		},
		onShow() {
			this.RefreshData(1)
			this.waterpush(1)
		},
		onLoad() {
			this.RefreshData(1)
			this.waterpush(1)
			this.getaccesstoken()
			this.myId = uni.getStorageSync('Userdetail').uid
			console.log(uni.getStorageSync('Userdetail'))
		},
		methods: {
			mydelet(){
				http.post(`/app/QzInfo/deleteQzInfo.do?id=${this.mydeledId}`).then(res =>{
					console.log(res)
					if(res.code == 1){
						this.RefreshData(1)
					}
				})
				this.deletId = 0
			},
			mythink(){
				this.deletId = 0
			},
			deletmyself(id){
				this.deletId = 1
				this.refundId = 1
				this.mydeledId = id
			},
			pushrefresh1: function() {
				var that = this
				uni.startPullDownRefresh({
					success: function() {
						that.RefreshData(1)
					}
				})
				setTimeout(function() {
					uni.stopPullDownRefresh();
				}, 1000)
			},
			pushrefresh2: function() {
				var that = this
				uni.startPullDownRefresh({
					success: function() {
						that.waterpush(1)
					}
				})
				setTimeout(function() {
					uni.stopPullDownRefresh();
				}, 1000)
			},
			loadmore: function() {
				console.log('1')
				if (this.isLastPage != true) {
					this.bottomId = 1
					this.page = this.Pagenum + 1
					this.RefreshData(this.page)
				} else {
					uni.showToast({
						title: '我也是有底线的',
						duration: 2000,
						icon: 'none'
					})
				}
				if (this.waterLastPage != true) {
					var page = this.waterPagenum + 1
					this.waterpush(page)
				} else {
					uni.showToast({
						title: '我也是有底线的',
						duration: 2000,
						icon: 'none'
					})
				}
			},
			provideo(id) {
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

					} else {
						var videoContext = uni.createVideoContext(array[i], that);
						videoContext.pause();
					}
				}
			},
			getupdown() {
				this.textId = 0
			},
			proview(img, i) {
				var imgList = []
				var imgs = img
				imgs.forEach((r) => {
					imgList.push(r.imgurl)
				})
				var myindex = i;
				console.log(myindex)
				uni.previewImage({
					current: myindex,
					urls: imgList
				})
			},
			changeTab(index) {
				this.tabIndex = index
			},
			goToreless() {
				if (uni.getStorageSync('Userdetail').token != undefined) {
					uni.navigateTo({
						url: '../release/release'
					})
				} else {
					uni.showToast({
						title: '请您先登录',
						duration: 2000,
						icon: 'none'
					})
				}
			},
			gotoNext(id) {
				var ids = id
				uni.navigateTo({
					url: `../onwerdata/onwerdata?id=${ids}`
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
			RefreshData(pag) {
				var page = pag
				http.post(`/app/QzInfo/findQzInfoList.do?page=${page}&rows=10&memberId=0`, {}).then(res => {
					console.log(res.data)
					this.isLastPage = res.data.isLastPage
					this.Pagenum = res.data.pageNum
					if (page == 1) {
						this.momentlist = res.data.list
						this.getrefres(this.momentlist)
					} else {
						if (this.bottomId == 1) {
							this.momentlist = this.momentlist.concat(res.data.list)
							this.getrefres(this.momentlist)
						} else {
							if (page == this.page) {
								var rows = this.page * 10
								http.post(`/app/QzInfo/findQzInfoList.do?page=1&rows=${rows}&memberId=0`, {}).then(res => {
									this.momentlist = res.data.list
									this.getrefres(this.momentlist)
								})
							}
						}
					}

				})
			},
			getrefres(list) {
				console.log(list)
				list.forEach((r) => {
					if (r.content == null) {
						r.content = ''
					}
					var itemimg = {}
					if (r.resources != null) {
						r.imgs = JSON.parse(r.resources)
					} else {
						r.imgs = null
					}
					if (r.comments != "") {
						r.com = JSON.parse(r.comments)
					} else {
						r.com = ""
					}
					if (r.agreeMembers != "") {
						r.agres = JSON.parse(r.agreeMembers)
					} else {
						r.agres = ""
					}
					//时间计算
					const dateTime = 1000 * 60 * 60 * 24
					const hour = 60 * 60 * 1000
					const minute = 1000 * 60
					r.comday = r.createTime.slice(0, 10)
					r.comhours = new Date(r.createTime.replace(/-/g, '/')).getTime()
					r.minusDays = Math.floor(Math.abs(Date.parse(this.date) - Date.parse(r.comday)) / dateTime)
					r.minours = Math.floor(Math.abs(this.datehours - r.comhours) / hour)
					r.minute = Math.floor(Math.abs(this.datehours - r.comhours) / minute)
				})
			},
			getWant() {
				this.momentlist.forEach((r) => {
					r.isstop = false
				})
				this.ydzId = 0
			},
			getSup(index) {
				this.bottomId = 0
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
						if (res.code == 1) {
							if (this.page == 0) {
								this.RefreshData(1)
							} else {
								this.RefreshData(this.page)

							}
						}
					})
				} else {
					http.post(`/app/QzAgree/deleteQzAgree.do?id=${id}&infoId=${infoId}`, {}).then(res => {
						console.log(res)
						if (this.page == 0) {
							this.RefreshData(1)
						} else {
							this.RefreshData(this.page)
						}
					})
				}
			},
			getCom(index) {
				this.ydzId = 0
				this.textId = 1
				this.momentlist[index].isstop = false
				this.comId = this.momentlist[index].id
				this.sendvaluesname = '说点什么吧'
			},
			getval: function(e) {
				// this.textId = -1
				this.sendvalue = e.detail.value
			},
			gorepl(id, i, name) {
				this.replId = id
				this.replaymname = name
				console.log(this.replId)
				this.textId = 1
				this.momentlist[i].isstop = false
				this.comId = this.momentlist[i].id
				this.sendvaluesname = '回复：' + this.replaymname
			},
			getsend() {
				console.log(this.sendvalue)
				this.bottomId = 0
				if (this.replId != 0) {
					if (this.sendvalue != '') {
						uni.request({
							url: `https://api.weixin.qq.com/wxa/msg_sec_check?access_token=${this.ACCESS_TOKEN}`,
							method: 'POST',
							data: {
								content: this.sendvalue
							},
							success: (res) => {
								console.log(res.data);
								if (res.data.errcode == 0) {
									var qzInfoComment = {}
									qzInfoComment.infoId = this.comId
									qzInfoComment.ccontent = this.sendvalue
									qzInfoComment.replaymid = this.replId
									qzInfoComment.replaymname = this.replaymname
									http.post('/app/QzInfoComment/addQzInfoComment.do', qzInfoComment, 'application/x-www-form-urlencoded').then(
										res => {
											console.log(res)
											if (res.code == 1) {
												if (this.page == 0) {
													this.RefreshData(1)
												} else {
													this.RefreshData(this.page)
													console.log(this.momentlist)
												}
												this.textId = 0
											}
										})
								} else {
									uni.showToast({
										title: "您的评论包含敏感字符",
										duration: 2000,
										icon: "none"
									})
								}
							},
						})
					}
				} else {
					if (this.sendvalue != '') {
						uni.request({
							url: `https://api.weixin.qq.com/wxa/msg_sec_check?access_token=${this.ACCESS_TOKEN}`,
							method: 'POST',
							data: {
								content: this.sendvalue
							},
							success: (res) => {
								console.log(res.data);
								if (res.data.errcode == 0) {
									var qzInfoComment = {}
									qzInfoComment.infoId = this.comId
									qzInfoComment.ccontent = this.sendvalue
									qzInfoComment.replaymid = 0
									http.post('/app/QzInfoComment/addQzInfoComment.do', qzInfoComment, 'application/x-www-form-urlencoded').then(
										res => {
											console.log(res)

											if (res.code == 1) {
												if (this.page == 0) {
													this.RefreshData(1)
												} else {
													this.RefreshData(this.page)
													console.log(this.momentlist)
												}
												this.textId = 0
											}
										})
								} else {
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
			getAll(index) {
				var moreinfoId = this.momentlist[index].id
				uni.setStorageSync('momentdetial', this.momentlist[index].id)
				uni.setStorageSync('agreed', this.momentlist[index].agreed)
				uni.navigateTo({
					url: `../replay/replay?id=${moreinfoId}`
				})
			},
			waterpush(pag) {
				var page = pag
				http.post(`/app/EsTransaction/findEsTransactionList.do?page=${page}&rows=10&memberId=0`, {}).then(res => {
					this.waterLastPage = res.data.isLastPage
					this.waterPagenum = res.data.pageNum
					this.mototal = res.data.total
					console.log(res)
					if (page == 1) {
						this.waterimg = res.data.list
						this.getfenlei(this.waterimg)
					} else {
						this.waterimg = this.waterimg.concat(res.data.list)
						this.getfenlei(this.waterimg)
					}
				})
			},
			getaccesstoken() {
				var _this = this
				uni.request({
					url: 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wxe608c237e5c92a50&secret=6c52e7ee14d7aeafc343a24208d5cd74',
					method: 'POST',
					success: (res) => {
						console.log(res);
						if (res.statusCode == 200) {
							_this.ACCESS_TOKEN = res.data.access_token
						}
					}
				})
			},
			getfenlei(list) {
				list.forEach((r) => {
					if (r.countyName == null) {
						r.countyName = ""
					}
				})
				for (var i = 0; i < list.length; i++) {
					if (i % 2 == 0) {
						// console.log(list[i])
						this.leftmglist.push(list[i])
					} else {
						this.rightmglist.push(list[i])
					}
				}
			},
			getactionId(id) {
				var ids = id
				uni.navigateTo({
					url: `../transaction/transaction?id=${ids}`
				})
			}
		}
	}
</script>

<style>
	.main {
		background: #eee;
		width: 100vw;
		height: 100vh;
		overflow-x: hidden;
		overflow-y: auto;
	}
	.rightborder {
		border-right: 1px solid #ccc;
	}

	.active {
		color: #F56B2D;
	}
	.new-list {
		display: flex;
		justify-content: space-between;
		box-sizing: border-box;
		padding: 10upx;
	}
	.card {
		width: 100%;
		padding: 10upx;
		border-radius: 10upx;
		margin-top: 20upx;
		box-sizing: border-box;
		box-shadow: 0 0 5px #888888;
	}
	.list-left {
		width: 48%;
		height: 400upx;
	}
	.list-right {
		width: 48%;
		height: 400upx;
	}
	::-webkit-scrollbar {
		width: 0;
		height: 0;
		color: transparent;
	}
</style> -->