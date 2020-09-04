<template>
	<view>
		<view style="width: 100%;height: 386upx;background: linear-gradient(to right, #F1704E, #D55139);display: flex;flex-direction: column;align-items: center;justify-content: center;">
			<image style="width: 120upx;height: 120upx;border-radius: 100%;" :src="Userdetail.Headimg" mode=""></image>
			<view style="font-size: 30upx;font-weight: bold;color: #fff;margin-top: 25upx;">
				{{Userdetail.nickName}}
			</view>
			<view style="font-size: 24upx;color: #F56B2D;width: 128upx;line-height: 42upx;
			text-align: center;border-radius: 100upx;background: #fff;margin-top: 25upx;" @click="getToput()">
				立即提问
			</view>
		</view>
		<view style="padding: 20upx;background: #eee;">
			<view style="font-size: 28upx;">热门问题</view>

			<view v-for="(item,index) in questionlist" :key="index" style="padding: 0 20upx;background: #fff;
				border-radius: 20upx;margin-top: 10upx;" @click="getquestionId(item.id)">
				<view style="padding:  20upx 0;">
					<view style="font-size: 28upx;padding: 5upx 0;">
						{{item.question}}
					</view>
					<view style="padding: 10upx 0;width: 100%;border-bottom: 1px  solid #eee;" v-if="item.imgs != null">
						<view v-for="(ite,inde) in item.imgs" :key='inde' style="width: 100%;" v-if="ite.type == 1">
							<video :src="ite.videourl" :id="'video'+index" 
							controls style="width: 100%;height: 300upx;border-radius: 10upx;"></video>
						</view>
						<view v-if="item.imgs.length <= 2" style="display: flex;align-items: center;">
							<view v-for="(ite,inde) in item.imgs" :key='inde' v-if="ite.type == 0">
								<image :src="ite.imgurl" style="width: 215upx;height: 160upx;margin-right: 10upx;border-radius: 10upx;" 
								mode="aspectFill" >
								</image>
							</view>
						</view>
						<view v-if="item.imgs.length > 2" style="display: flex;align-items: center;justify-content: space-between;">
							<view v-for="(ite,inde) in item.imgs" :key='inde' v-if="ite.type == 0">
								<image :src="ite.imgurl" style="width: 215upx;height: 160upx;border-radius: 10upx;" 
								mode="aspectFill" >
								</image>
							</view>
						</view>
						
					</view>
					<view style="display: flex;align-items: center;margin-top: 20upx;box-sizing: border-box;justify-content: space-between;">
						<view style="display: flex;align-items: center;font-size: 24upx;">
							<image v-if="item.imgurl != null" style="width: 48upx;height: 48upx;border-radius: 100%;" :src="item.imgurl" mode="aspectFill"></image>
							<image v-if="item.imgurl == null" style="width: 48upx;height: 48upx;border-radius: 100%;" src="../../static/mrtx.png" mode="aspectFill"></image>
							<view style="margin-left: 15upx;">{{item.memberName}}</view>
							<view style="margin-left: 15upx;">
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
						<view style="font-size: 24upx;">{{item.seenum}}人浏览</view>
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
				questionlist: [],
				date: new Date().toISOString().slice(0, 10),
				datehours: new Date().getTime(),
				videoIds:[],
				Userdetail:{}
			}
		},
		onShow() {
			this.getquestionlist()
		},
		onLoad() {
			this.getquestionlist()
		},
		methods: {
			getquestionId(id){
				console.log(id)
				var ids = id
				uni.navigateTo({
					url:`../problemdetails/problemdetails?id=${ids}`
				})
			},
			getquestionlist() {
				http.post(`/app/EsQuestion/findEsQuestionList.do?page=1&rows=10`, {}).then(res => {
					console.log(res)
					this.questionlist = res.data.list
					if(this.questionlist.seenum == null){
						this.questionlist.seenum = 0
					}
					this.cleartime(this.questionlist)
					this.Userdetail.nickName = uni.getStorageSync('Userdetail').uname
					this.Userdetail.Headimg = uni.getStorageSync('Userdetail').uheadimg
				})
			},
			cleartime(list) {
				list.forEach((r) => {
					if (r.resources != null) {
						r.imgs = JSON.parse(r.resources)
					} else {
						r.imgs = null
					}
					if (r.question == null) {
						r.question = ''
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
			},

			getToput(){
				console.log(uni.getStorageSync('Userdetail').token)
				if(uni.getStorageSync('Userdetail').token != undefined){
					uni.navigateTo({
						url:'../putques/putques'
					})
				}else{
					uni.showToast({
						title:'请您先登录',
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
