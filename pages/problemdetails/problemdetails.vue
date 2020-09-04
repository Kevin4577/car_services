<template>
	<view>
		<view style="background: #F6F4F5;height: 20upx;width: 100%;"></view>
		<view style="padding: 20upx ;box-sizing: border-box;background: #fff;">
			<view style="display: flex;justify-content: space-between;align-items: center;width: 100%;padding: 0 20upx;box-sizing: border-box;">
				<view style="display: flex;align-items: center;font-size: 28upx;">
					<image style="width: 78upx;height: 78upx;border-radius: 100%;" :src="questiondetail.imgurl" mode=""></image>
					<view style="margin-left: 10upx;">{{questiondetail.memberName}}</view>
				</view>
				<view style="color: #999999;font-size: 24upx;">{{questiondetail.createTime}}</view>
			</view>
			<view style="padding: 20upx;box-sizing: border-box;font-size: 28upx;">
				{{questiondetail.question}}
			</view>
			<view v-for="(item,index) in questiondetail.imgs" :key="index" 
			style="padding: 10upx 20upx;box-sizing: border-box;display: flex;flex-wrap: wrap;justify-content: center;">
				<image v-if="item.type == 0" style="width: 680upx;height: 420upx;border-radius: 10upx;" 
				:src="item.imgurl" mode="aspectFill" @click="answerview(questiondetail.imgs,index)">
				</image>
				<video v-if="item.type == 1" style="width: 680upx;height: 420upx;border-radius: 10upx;" :src="item.videourl" controls></video>
			</view>
			<view style="width: 100%;overflow: hidden;">
				<view style="display: flex;align-items: center;padding: 0 20upx;float: right;">
					<view style="font-size: 20upx;color: #666;">{{questiondetail.seenum}}人浏览/{{questiondetail.replaynum}}条回复</view>
				</view>
			</view>
		</view>
		<view style="background: #F6F4F5;padding: 20upx;box-sizing: border-box;">
			<view style="font-size: 28upx;color: #333;">
				专家解答
			</view>
			<view style="width:100%;background: #fff;border-radius: 20upx;margin-top: 20upx;
			padding: 20upx;box-sizing: border-box;" v-for="(item,index) in replaylist" :key="index">
				<view style="display: flex;align-items: center;justify-content: space-between;width: 100%;box-sizing: border-box;">
					<view style="display: flex;align-items: center;">
						<image style="width: 78upx;height: 78upx;border-radius: 100%;" src="../../static/1788lo.png" mode=""></image>
						<view style="margin-left: 12upx;">
							<view style="font-size: 28upx;color: #333;">{{item.username}}</view>
							<view style="font-size: 22upx;color: #999;">官方认证专家</view>
						</view>
					</view>
					<view style="font-size: 24upx;color: #999;">{{item.replaynum}}条回复</view>
				</view>
				<view style="font-size: 26upx;color: #333;padding: 20upx 10upx;white-space:normal;word-break:break-all;word-wrap:break-word;">
					{{item.anwer}}
				</view>
				<view style="display: flex;align-items: center;justify-content: space-between;box-sizing: border-box;">
					<view style="margin-left: 15upx;font-size: 24upx;color: #999;">
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
					<view style="display: flex;align-items: center;font-size: 24upx;color: #999;">
						<view @click="getviewall(item.aid)">查看全部</view>
						<image style="width: 10upx;height: 20upx;margin-left: 10upx;" src="../../static/more.png" mode=""></image>
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
				questionId:0,
				questiondetail:{},
				replaylist:[],
				date: new Date().toISOString().slice(0, 10),
				datehours: new Date().getTime(),
			}
		},
		onLoad(options) {
			this.questionId = options.id
			this.getquestiondetail()
			this.getEsAnswer()
		},
		methods:{
			answerview(img, i) {
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
			getEsAnswer(){
				http.post(`/app/EsAnswer/findEsAnswerList.do?page=1&rows=10&questionId=${this.questionId}`).then(res =>{
					console.log(res)
					this.replaylist = res.data.list
					this.clearstimes(this.replaylist)
				})
			},
			clearstimes(list) {
					list.forEach((r)=>{
						const dateTime = 1000 * 60 * 60 * 24
						const hour = 60 * 60 * 1000
						const minute = 1000 * 60
						r.comday = r.ctime.slice(0, 10)
						r.comhours = new Date(r.ctime.replace(/-/g, '/')).getTime()
						r.minusDays = Math.floor(Math.abs(Date.parse(this.date) - Date.parse(r.comday)) / dateTime)
						r.minours = Math.floor(Math.abs(this.datehours - r.comhours) / hour)
						r.minute = Math.floor(Math.abs(this.datehours - r.comhours) / minute)
					})
			},
			getquestiondetail(){
				http.post(`/app/EsQuestion/findEsQuestion.do?id=${this.questionId}`).then(res =>{
					console.log(res);
					this.questiondetail = res.data
					if(this.questiondetail.resources != null){
						this.questiondetail.imgs = JSON.parse(this.questiondetail.resources)
					}else{
						this.questiondetail.imgs = null
					}
				})
			},
			getviewall(id){
				var ids = id
				uni.navigateTo({
					url:`../answerdetail/answerdetail?id=${ids}`
				})
			}
		}
	}
</script>

<style>
</style>
