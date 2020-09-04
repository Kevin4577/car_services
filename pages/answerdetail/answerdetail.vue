<template>
	<view style="background: #eee;">
		<view v-if="pid == 1" style="position: fixed;top: 0;right: 0;left: 0;bottom: 120upx;" @click="delreplay()">

		</view>
		<view style="background: #fff;padding: 20upx;">
			<view style="display: flex;align-items: center;justify-content: space-between;width: 100%;box-sizing: border-box;">
				<view style="display: flex;align-items: center;">
					<image style="width: 78upx;height: 78upx;border-radius: 100%;" src="../../static/1788lo.png" mode=""></image>
					<view style="margin-left: 12upx;">
						<view style="font-size: 28upx;color: #333;">{{EsAnswer.username}}</view>
						<view style="font-size: 22upx;color: #999;">官方认证专家</view>
					</view>
				</view>
				<view style="margin-left: 15upx;font-size: 24upx;color: #999;">
					<view v-if="EsAnswer.minours >24">
						{{EsAnswer.minusDays}}天前
					</view>
					<view v-if="EsAnswer.minours < 24 && EsAnswer.minute >60">
						{{EsAnswer.minours}}小时前
					</view>
					<view v-if="EsAnswer.minute < 60 && EsAnswer.minute > 1">
						{{EsAnswer.minute}}分钟前
					</view>
					<view v-if="EsAnswer.minute < 1">
						刚刚
					</view>
				</view>
			</view>
			<view style="font-size: 28upx;color: #333;padding: 10upx ;">
				{{EsAnswer.anwer}}
			</view>
		</view>
		<view style="margin-top: 20upx;background: #fff;padding: 20upx;">
			<view style="width: 100%;text-align: center;padding: 10upx 0;">
				——探讨——
			</view>
			<view style="padding-bottom: 120upx;">
				<view v-for="(item,index) in answerslist" :key="index" style="display: flex;padding:20upx 10upx;">
					<image style="width: 78upx;height: 78upx;border-radius: 100%;" :src="item.memberImgurl" mode=""></image>
					<view style="flex: 1;margin-left: 15upx;">
						<view style="display: flex;align-items: center;width: 100%;justify-content: space-between;box-sizing: border-box;">
							<view>
								<view style="font-size: 26upx;">
									{{item.memberName}}
								</view>
								<view style="font-size: 24upx;color: #999;">
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
							<view style="font-size: 24upx;color: #666;" @click="getansreplay(item.acid,item.memberName)">
								回复
							</view>
						</view>
						<view style="font-size: 24upx;color: #333;padding: 10upx;">
							{{item.content}}
						</view>
						<view style="padding: 10upx;background:#F6F6F6 ;" v-if="item.childs.length != 0">
							<view v-for="(ite,inde) in item.childs" :key='inde'>
								<view style="display: flex;align-items: center;font-size: 24upx;color: #333;">
									<view>
										{{ite.memberName}} 回复：
									</view>
									<view>
										{{ite.content}}
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view style="width: 100%;height: 100upx;position: fixed;bottom: 0;display: flex;justify-content: space-between;
			align-items: center;background: #FFFFFF;padding: 0 30upx;box-sizing: border-box;border-top: 1px solid #EEEEEE;">
			<view style="width: 540upx;height: 52upx;border-radius: 30upx;border: 1px solid #999;display: flex;justify-content: center;">
				<input type="text" :value="contant" :placeholder="contants" style="width: 480upx;height: 100%;font-size: 26upx;line-height: 52upx;"
				 @blur="getanscontant" />
			</view>
			<view style="width: 88upx;line-height: 48upx;border-radius: 50upx;font-size: 24upx;
				background: #F66C2D;text-align: center;line-height: 38upx;color: #FFFFFF;">
				<view v-if="pid == 0" @click="getansvalue()">
					评论
				</view>
				<view v-if="pid == 1" @click="getansvalue()">
					回复
				</view>
			</view>
			<!-- <view v-if="comsId == 0" style="display: flex;align-items: center;margin-right: 30upx;">
				<image style="width: 40upx;height: 40upx;" src="../../static/tiaop.png" @click="getjumpcom()"></image>
			</view> v-if="comsId == 1" @click="getanscomsId()"-->
		</view>
	</view>
</template>

<script>
	const http = require('@/api/token.js')
	export default {
		data() {
			return {
				answerId: 0,
				EsAnswer: {},
				answerslist: [],
				date: new Date().toISOString().slice(0, 10),
				datehours: new Date().getTime(),
				pid: 0,
				comsId: 0,
				contant: '',
				contants: '请评价',
				replayId: 0,
				pinId: 0
			}
		},
		onLoad(options) {
			this.answerId = options.id
			this.getanswerdetail()
		},
		methods: {
			getanscontant: function(e) {
				this.contant = e.detail.value
			},
			getansreplay(id,name) {
				this.pid = 1
				this.contants = '回复'+ name
				this.replayId = id
			},
			delreplay() {
				this.pid = 0
				this.contants = '请评价'
			},
			// getanscomsId() {
			// 	this.comsId = 1
			// },
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
			getansvalue() {
				if (this.pid == 0) {
					if (this.contant != '' && this.contant != '请评价') {
						var data = {
							"answerId": this.answerId, //专家的解答id
							"content": this.contant, //我的评论
							"pid": 0
						}
						http.post('/app/EsAnswerComment/addEsAnswerComment.do', data, 'application/x-www-form-urlencoded').then(
							res => {
								console.log(res)
								if (res.code == 1) {
									this.contant = ''
									this.contants = '请评价'
									this.getanswerdetail()
									console.log(this.contant)
								}
							})
					}
				} else {
					if (this.contant != '') {
						var data = {
							"answerId": this.answerId, //专家的解答id
							"content": this.contant, //我的评论
							"pid": this.replayId
						}
						http.post('/app/EsAnswerComment/addEsAnswerComment.do', data, 'application/x-www-form-urlencoded').then(
							res => {
								console.log(res)
								if (res.code == 1) {
									this.pid = 0
									this.contant = ''
									this.contants = '请评价'
									this.getanswerdetail()
								}
							})
					}
				}
				console.log(this.contant)
			},
			getanswerdetail() {
				http.post(`/app/EsAnswer/findEsAnswer.do?id=${this.answerId}`, {}).then(res => {
					console.log(res)
					this.EsAnswer = res.data
					this.answertimes(this.EsAnswer)
				}) //专家的解答
				http.post(`/app/EsAnswerComment/findEsAnswerCommentList.do?page=1&rows=10&answerId=${this.answerId}`, {}).then(res => {
					console.log(res)
					this.answerslist = res.data.list
					this.answerslist.forEach((r) => {
						if (r.createTime == null) {
							r.createTime = ''
						}
					})
					this.anstime(this.answerslist)
				}) //解答下面的评论
			},
			anstime(list) {
				list.forEach((r) => {
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
			answertimes(list) {
				const dateTime = 1000 * 60 * 60 * 24
				const hour = 60 * 60 * 1000
				const minute = 1000 * 60
				list.comday = list.ctime.slice(0, 10)
				list.comhours = new Date(list.ctime.replace(/-/g, '/')).getTime()
				list.minusDays = Math.floor(Math.abs(Date.parse(this.date) - Date.parse(list.comday)) / dateTime)
				list.minours = Math.floor(Math.abs(this.datehours - list.comhours) / hour)
				list.minute = Math.floor(Math.abs(this.datehours - list.comhours) / minute)
			},
		}
	}
</script>

<style>
</style>
