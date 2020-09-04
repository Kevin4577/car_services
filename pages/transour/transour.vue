<template>
	<view style="padding:20upx;background: #fff;">
		<view v-if="mototal == 0">
			<view style="padding: 20upx;color: #CCCCCC;">暂无交易信息!</view>
		</view>
		<view v-if="mototal != 0" style="display: flex;box-sizing: border-box;justify-content: space-between;padding: 0 5upx;">
			<view>
				<view v-for="(item,index) in leftmglist" :key="index" style="border-radius: 20upx;width: 340upx;display: flex;flex-wrap: wrap;justify-content: center;
				padding-bottom: 10upx ;box-shadow: 0 0 10upx #999;margin-top: 10upx;"
				 @click="getactionId(item.transactionId)">
					<image style="width: 340upx;height: 250upx;border-radius:20upx;" :src="item.extInfo" mode=""></image>
					<view style="font-size: 24upx;width: 300upx;padding: 5upx 0;">
						{{item.content}}
					</view>
					<view style="display: flex;font-size: 20upx;align-items: center;box-sizing: border-box;
					width: 300upx;justify-content: space-between;padding:5upx 10upx;">
						<view style="color: red;">
							￥{{item.price/100}}
						</view>
						<view>
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
				<view v-for="(item,index) in rightmglist" :key="index" style="border-radius: 20upx;width: 340upx;display: flex;flex-wrap: wrap;justify-content: center;
				padding-bottom: 10upx ;box-shadow: 0 0 10upx #999;margin-top: 10upx;"
				 @click="getactionId(item.transactionId)">
					<image style="width: 340upx;height: 320upx;border-radius:20upx;" :src="item.extInfo" mode=""></image>
					<view style="font-size: 24upx;width: 300upx;padding: 5upx 0;">
						{{item.content}}
					</view>
					<view style="display: flex;font-size: 20upx;align-items: center;box-sizing: border-box;
					width: 300upx;justify-content: space-between;padding:5upx 10upx;">
						<view style="color: red;">
							￥{{item.price/100}}
						</view>
						<view>
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
</template>

<script>
	var http = require('@/api/token.js')
	export default {
		data() {
			return {
				waterLastPage: false,
				waterPagenum: 0,
				waterimg:[],
				leftmglist:[],
				rightmglist:[],
				mototal:0
			}
		},
		onReachBottom() {
			if (this.waterLastPage != true) {
				var page = this.waterPagenum + 1
				this.waterpush(page)
			} else {
				console.log("没有更多")
			}
		},
		onPullDownRefresh() {
			this.waterpush(1)
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		onLoad() {
			this.waterpush(1)
		},
		methods: {
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
</style>
