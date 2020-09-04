<template>
	<view style="background: #E6E6E6;">
		<view style="background: #fff;padding: 0 20upx;">
			<view id="demo" style="padding: 20upx 0;border-bottom: 1px solid #E6E6E6;" v-for="(item,index) in infolist" :key='item.id'
			 @click="getinfoist(item.id)">
				<view>
					{{item.title}}
				</view>
				<view v-if="item.imgs.length == 1" v-for="(ite,inde) in item.imgs" :key="inde" style="padding: 10upx 0;">
					<view v-if="ite.type == 0">
						<image style="width:700upx;height: 280upx;border-radius: 5upx;" :src="ite.imgurl" mode="scaleToFill"></image>

					</view>
					<video v-if="ite.type == 1" style="width:700upx;height: 280upx;border-radius: 5upx;" :src="ite.videourl"></video>
				</view>
				<view v-if="item.imgs.length != 1" style="display: flex;justify-content: space-between;flex-wrap: wrap;box-sizing: border-box;">
					<view v-for="(ite,inde) in item.imgs" :key="inde" style="padding: 10upx 0;">
						<image style="width: 235upx;height: 150upx;border-radius: 5upx;margin-top: 10upx;" :src="ite.imgurl" mode="">

						</image>
					</view>
				</view>
				<!-- <view v-if="item.imgs.length != 1" v-for="(ite,inde) in item.imgs" :key="inde"  >
						<view v-if="ite.type == 0">
							<image  style="width:700upx;height: 280upx;border-radius: 20upx;" :src="ite.imgurl" mode="scaleToFill"></image>
							<image  style="width:700upx;height: 280upx;border-radius: 20upx;" :src="ite.imgurl" mode="scaleToFill"></image>
						</view>
						
				</view> -->
				<view style="display: flex;margin-top: 10upx;">
					<view v-for="(it,ind) in Tags" :key="ind" v-if="ind === index" style="display: flex;align-items: center;">
						<view v-for="(id,ip) in it" :key="ip" style="font-size: 22upx;color: #F56B2D;width: 60upx;
						line-height: 28upx;background:#F6F6F6;border-radius: 5upx;text-align: center;margin-left: 5upx;">
							{{id}}
						</view>
					</view>
					<view style="display: flex;font-size: 22upx;align-content: center;text-align: center;padding: 5upx;margin-left: 20upx">
						<view>
							{{item.commentnum}}评论
						</view>
						<view>
							/{{item.from}}
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
				infolist: [],
				infoimg: [],
				Tags: [],
				hotId: 0,
				isLastPage: false,
				Pagenum: 0
			}
		},
		onPullDownRefresh() {
			this.getinfohot(1)
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		onShareAppMessage() {
			this.getinfohot(1)
		},
		onReachBottom() {
			if (this.isLastPage != true) {
				var page = this.Pagenum + 1
				this.getinfohot(page)
			} else {
				uni.showToast({
					title:'我也是有底线的',
					duration:2000,
					icon:'none'
				})
			}
		},
		onLoad(options) {
			this.hotId = options.hotId
			this.getinfohot(1)
		},
		methods: {
			getinfohot(pag) {
				var page = pag
				if (this.hotId == 2) {
					uni.setNavigationBarTitle({
					　　title:'热门资讯'
					})
					http.post(`/app/information/findHotQzInformationList.do?page=${page}&rows=10`, {}).then(res => {
						console.log(res)
						this.isLastPage = res.data.isLastPage
						this.Pagenum = res.data.pageNum
						if (page == 1) {
							this.infolist = res.data.list
							this.getinfoforeach(this.infolist)
						} else {
							this.infolist = this.infolist.concat(res.data.list)
							this.getinfoforeach(this.infolist)
						}
					})
				} else {
					http.post(`/app/information/findQzInformationList.do?page=${page}&rows=10`, {}).then(res => {
						this.isLastPage = res.data.isLastPage
						this.Pagenum = res.data.pageNum
						if (page == 1) {
							this.infolist = res.data.list
							this.getinfoforeach(this.infolist)
						} else {
							this.infolist = this.infolist.concat(res.data.list)
							this.getinfoforeach(this.infolist)
						}
					})
				}
			},
			getinfoforeach(list) {
				list.forEach((item) => {
					if (item.resources != []) {
						item.imgs = JSON.parse(item.resources)
					} else {
						item.imgs = []
					}
					this.Tags.push(JSON.parse(item.tags))
				})
			},
			getinfoist(id) {
				var ids = id
				uni.navigateTo({
					url: `../Informationdetails/Informationdetails?id=${ids}`
				})
			}
		}
	}
</script>

<style>
</style>
