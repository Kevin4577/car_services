<template>

	<view style="background: #E6E6E6;">
		<view v-if="comsId == 1" style="position: fixed;width: 100%;top: 0;bottom:140upx ;" @click="getchangecomsid()"></view>
		<view id="coms" style="background: #FFFFFF;padding:20upx 30upx">
			<jyf-parser :html="nodes"></jyf-parser>
		</view>
		<view style="margin-top: 20upx;background: #FFFFFF;padding:20upx ">
			<view style="text-align: center;">
				——评论——
			</view>
			<view>
				<view style="display: flex;padding: 10upx 0;" v-for="(item,index) in commentlist" :key="index">
					<image :src="item.rmemberUrl" mode="" style="width: 78upx;height: 78upx;border-radius:100upx ;"></image>
					<view style="flex: 1;padding: 0 30upx;">
						<view style="display: flex;align-items: center;width: 100%;justify-content: space-between;">
							<view>
								<view style="font-size: 28upx;">
									{{item.rmemberName}}
								</view>
								<view v-if="item.minours >24" style="font-size: 22upx;margin-top: 10upx;">
									{{item.minusDays}}天前
								</view>
								<view v-if="item.minours < 24 && item.minute >60" style="font-size: 22upx;margin-top: 10upx;">
									{{item.minours}}小时前
								</view>
								<view v-if="item.minute < 60 &&item.minute > 1" style="font-size: 22upx;margin-top: 10upx;">
									{{item.minute}}分钟前  
								</view>
								<view v-if="item.minute < 1" style="font-size: 22upx;margin-top: 10upx;">
									刚刚 
								</view>
							</view>
							<view class="" style="font-size: 24upx;" @click="getReply(item.icid,item.rmemberName)">
								回复
							</view>
						</view>
						<view style="font-size: 24upx;padding: 10upx 0;">
							{{item.ccontent}}
						</view>
						<view style="background: #EEEEEE;padding: 20upx;" v-if="item.childs.length != 0">
							<view v-for="(ite,inde) in item.childs" :key="inde" style="font-size: 24upx;padding: 5upx 0;">
								{{ite.rmemberName}} 回复: {{ite.ccontent}}
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- <view v-if="pid == 0" style="width: 100%;height: 133upx;position: fixed;bottom: 0;display: flex;justify-content: space-between;
			align-items: center;background: #FFFFFF;padding: 0 30upx;box-sizing: border-box;border-top: 1px solid #EEEEEE;">
			<view style="width: 540upx;height: 52upx;border-radius: 30upx;border: 1px solid #999;display: flex;justify-content: center;"
			 @click="getcomsId()">

				<input type="text" :value="contant" placeholder="写评论" style="width: 480upx;height: 100%;font-size: 26upx;line-height: 52upx;"
				 @blur="getcontant" />
			</view>
			<view v-if="comsId == 1" style="width: 88upx;height: 38upx;border-radius: 50upx;font-size: 24upx;
				background: #F66C2D;text-align: center;line-height: 38upx;color: #FFFFFF;"
			 @click="getvalue()">
				评论
			</view>
			<view v-if="comsId == 0" style="display: flex;align-items: center;">
				<image style="width: 40upx;height: 40upx;" src="../../static/tiaop.png" @click="getjumpcom()"></image>
				<image style="width: 40upx;height: 40upx;margin-left: 20upx;" v-if="favId == 0" src="../../static/kfav.png" mode=""
				 @click="getFav()"></image>
				<image style="width: 40upx;height: 40upx;margin-left: 20upx;" v-if="favId == 1" src="../../static/fav.png" mode=""
				 @click="getFav()"></image>
			</view>
		</view> -->
		<!-- <view v-if="pid != 0" style="width: 100%;height: 133upx;position: fixed;bottom: 0;left: 0;display: flex;justify-content: space-between;
			align-items: center;background: #FFFFFF;padding: 0 30upx;box-sizing: border-box;border-top: 1px solid #EEEEEE;">
			<view style="width: 540upx;height: 52upx;border-radius: 30upx;border: 1px solid #999;display: flex;justify-content: center;">
				<input type="text" :value="contant" placeholder="写回复" style="width: 480upx;height: 100%;font-size: 26upx;line-height: 52upx;"
				 @blur="getcontant" />
			</view>
			<view style="width: 88upx;height: 38upx;border-radius: 50upx;font-size: 24upx;
				background: #F66C2D;text-align: center;line-height: 38upx;color: #FFFFFF;"
			 @click="getvalue()">
				回复
			</view>
		</view> -->
		<!-- <view v-if="pid != 0" style="width: 600upx;position: fixed;left: 0;top: 0;bottom: 140upx;" @click="changPid()">

		</view> -->
	</view>

</template>

<script>
	const http = require('@/api/token.js')
	import parser from "@/components/jyf-parser/jyf-parser";
	export default {
		data() {
			return {
				infodetail: [],
				date: new Date().toISOString().slice(0, 10),
				datehours:new Date().getTime(),
				nodes: [],
				time: '',
				commentlist: [],
				contant: '',
				infoId: 0,
				pid: 0,
				replay: '',
				favId: 0,
				deleId: 0,
				comsId: 0
			}
		},
		components: {
			"jyf-parser": parser
		},
		onReachBottom() {
			if (this.isLastPage != true) {
				var page = this.Pagenum + 1
				this.getinfocom(page)
			} else {
				console.log("没有更多")
			}
		},
		onShareAppMessage() {
			console.log(this.infoId)
			this.getshow()
		},
		onPullDownRefresh() {
			this.getshow()
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		onLoad(options) {
			this.infoId = options.id
			this.getshow()

		},

		methods: {
			getjumpcom() {
				const query = uni.createSelectorQuery();
				query.selectAll('#coms').boundingClientRect().exec((res) => {
					console.log(res[0])
					var height = 0
					var top = 0
					res[0].forEach((r) => {
						height = r.height
					})
					var Height = height
					uni.pageScrollTo({
						scrollTop: Height
					})
				});
			},
			getshow() {
				http.post(`/app/information/findQzInformation.do?id=${this.infoId}`, {}).then(res => {
					console.log(res)
					if(res.data != null){
						this.infodetail = res.data
						this.formatRichText(this.infodetail.content)
						this.time = this.infodetail.utime
						this.returnCollecte()
						this.getinfocom(1)
					}else{
						uni.showToast({
							title:'暂无数据',
							duration:2000,
							icon:"none"
						})
					}
				})	
			},
			getinfocom(pag) {
				var page = pag
				http.post(
					`/app/informationcomment/findQzInformationCommentsByInfoId.do?page=${page}&rows=10&informationId=${this.infoId}`, {}
				).then(res => {
					console.log(res)
					this.isLastPage = res.data.isLastPage
					this.Pagenum = res.data.pageNum
					if (page == 1) {
						this.commentlist = res.data.list
						this.getforcomlist(this.commentlist)
						console.log(this.commentlist)
					} else {
						this.commentlist = this.commentlist.concat(res.data.list)
						this.getforcomlist(this.commentlist)
					}
				})
			},
			getforcomlist(list){
				
				list.forEach((r) =>{
					const dateTime = 1000 * 60 * 60 * 24
					const hour =  60 * 60*1000
					const minute = 1000*60
					r.comday = r.createTime.slice(0,10)
					r.comhours = new Date(r.createTime.replace(/-/g, '/')).getTime()
					r.minusDays = Math.floor(Math.abs(Date.parse(this.date) - Date.parse(r.comday))/dateTime)
					r.minours =  Math.floor(Math.abs(this.datehours - r.comhours)/hour) 
					r.minute =  Math.floor(Math.abs(this.datehours - r.comhours)/minute)
				})
			},
			getcontant: function(e) {
				console.log(e.detail.value)
				this.contant = e.detail.value
			},
			changPid() {
				this.pid = 0
			},
			getvalue() {
				if (this.pid == 0) {
					if (this.contant != '') {
						var data = {
							"ccontent": this.contant,
							"infoId": this.infoId,
							"pid": 0,
							"replay": "",
						}
						http.post('/app/informationcomment/addQzInformationComment.do', data, 'application/x-www-form-urlencoded').then(
							res => {
								console.log(res)
								if (res.code == 1) {
									this.getshow()
									this.contant = ''
								}
							})
					}

				} else {
					if (this.contant != '') {
						var data = {
							"ccontent": this.contant,
							"infoId": this.infoId,
							"pid": this.pid,
							"replay": this.replay,
						}
						http.post('/app/informationcomment/addQzInformationComment.do', data, 'application/x-www-form-urlencoded').then(
							res => {
								console.log(res)
								if (res.code == 1) {
									this.getshow()
									this.contant = ''
								}
							})
					}

				}

			},
			getReply(id, name) {
				console.log(id)
				this.pid = id
				this.replay = name

			},
			formatRichText(html) { //控制小程序中图片大小
				// console.log(html)
				console.log(1)
				let newContent = html.replace(/<img[^>]*>/gi, function(match, capture) {
					match = match.replace(/style="[^"]+"/gi, '').replace(/style='[^']+'/gi, '');
					match = match.replace(/width="[^"]+"/gi, '').replace(/width='[^']+'/gi, '');
					match = match.replace(/height="[^"]+"/gi, '').replace(/height='[^']+'/gi, '');
					return match;
				});
				newContent = newContent.replace(/style="[^"]+"/gi, function(match, capture) {
					match = match.replace(/width:[^;]+;/gi, 'max-width:100%;').replace(/width:[^;]+;/gi, 'max-width:100%;');
					return match;
				});
				newContent = newContent.replace(/<br[^>]*\/>/gi, '');
				newContent = newContent.replace(/\<img/gi,
					'<img style="max-width:100%;height:auto;display:inline-block;margin:10rpx auto;"');
				// return newContent;
				this.nodes = newContent
				// console.log(this.nodes)
				console.log(2)
			},
			getcomsId() {
				this.comsId = 1
			},
			getchangecomsid() {
				this.comsId = 0
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
			getinspect() {
				uni.request({
					url: `https://api.weixin.qq.com/wxa/img_sec_check?access_token=${this.ACCESS_TOKEN}`,
					method:'POST',
					data:{
						media:''
					},
					success: (res) => {
						console.log(res.data);
					}
				})
				
				uni.request({
					url: `https://api.weixin.qq.com/wxa/msg_sec_check?access_token=${this.ACCESS_TOKEN}`,
					method: 'POST',
					data: {
						content: this.contant
					},
					success: (res) => {
						console.log(res.data);
					}
				})
			
			},
			getFav() {
				if (this.favId == 0) {
					this.favId = 1
					this.getcollaction()
					uni.showToast({
						title:'已收藏',
						duration:2000,
						icon:"none"
					})
				} else {
					this.favId = 0
					uni.showToast({
						title:'取消收藏',
						duration:2000,
						icon:"none"
					})
					this.delecollaction()
				}


			},
			getcollaction() {
				var favData = {
					"cother": this.infodetail.subtitle,
					"ctitle": this.infodetail.title,
					"ctype": 3,
					"cobjId": this.infodetail.id
				}
				http.post('/app/EsCollection/addEsCollection.do', favData, 'application/x-www-form-urlencoded').then(res => {
					console.log(res)
					this.deleId = res.data.id
					this.returnCollecte()
					uni.showToast({
						title: '收藏成功',
						duration: 2000,
						icon: 'none'
					})
				})
			},
			delecollaction() {
				http.post(`/app/EsCollection/deleteEsCollection.do?id=${this.deleId}`, {}).then(res => {
					console.log(res)
					this.returnCollecte()
					uni.showToast({
						title: '取消收藏',
						duration: 2000,
						icon: 'none'
					})
				})

			},
			returnCollecte() {
				var objId = this.infodetail.id
				http.post(`/app/EsCollection/findMemberEsCollection.do?type=3&objId=${objId}`, {}).then(res => {
					console.log(res)

					if (res.data != null) {
						this.favId = 1
						this.deleId = res.data.id
					} else {
						this.favId = 0
					}
				})

			}

		},
	}
</script>

<style>
</style>
