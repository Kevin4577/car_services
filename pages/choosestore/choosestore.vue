<template>
	<view class="content">
		<screen @getchoose="getnum"></screen>
		<view style="margin-top: 75upx;">
			<view class="store" style="border-bottom: 1px solid #eee;" v-for="(item,index) in datalist" :key='item.storeId'>
				<image style="width: 201upx;height: 149upx;border-radius: 20upx;" :src="item.imgurl" mode="aspectFill"></image>
				<view class="storelist" >
					<view style="display: flex;justify-content: space-between;box-sizing: border-box;padding-bottom: 5upx;height: 40upx;align-items: center;">
						<view style="font-size: 28upx;font-weight:500;width: 350upx;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">
							{{item.sname}}
						</view>
						<view style="width: 88upx;padding: 5upx 0;font-size: 24upx;text-align: center;
						background: #F56B2D;border-radius: 100upx;color: #FFFFFF;"
						 :key="index" @click="getchoose(item.storeId,index)" :id="index" :class="item.isstop == true?'chooseactive':''">
							选择
						</view>
					</view>
					<view style="display: flex;padding-bottom: 5upx;margin-top: 15upx;">
						<view style="display: flex;font-size: 24upx;">
							<view style="color:#666">
								总评分
							</view>
							<view style="color:#D60808">
								{{item.comScore}}
							</view>
						</view>
						<view style="display: flex;font-size: 24upx;margin-left: 15upx;">
							<view style="color:#666">
								总订单
							</view>
							<view style="color:#D60808">
								{{item.comNumber}}
							</view>
						</view>
					</view>
					<view style="display: flex;font-size: 24upx;justify-content: space-between;color: #666;padding-bottom: 5upx;margin-top: 15upx;">
						<view style="width: 400upx;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">
							{{item.saddress}}
						</view>
						<view>
							{{item.kilo}}km
						</view>
					</view>
					<view style="display: flex;margin-top: 15upx;">
						<view style="box-sizing: border-box;font-size: 20upx;color: #F89062;" v-for="(ite,inde) in item.Tags"
						 :key='inde' >
							<view style="border-radius: 100upx;padding:5upx 10upx;
							border:1px solid #F89062;text-align: center;" :class="inde != 0 ?'leftactive':''">
								{{ite.name}}
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
	import '../choosestore/choosestore.css'
	import screen from '../../components/uni-screen/uni-screen.vue'
	export default {
		components: {
			screen
		},
		data() {
			return {
				nextId: 0,
				datalist: [],
				ischoose: 0,
				isLastPage: false,
				Pagenum: 0,
				isfirst: 0,
				areacode:'',
				sortId:1,
				catid:0
			}
		},
		onShow(){
			if (uni.getStorageSync('chooseshop') != '') {
				this.datalist = uni.getStorageSync('chooseshop') //判断是否已经选择过门店了
			} else {
				this.getstores(1)
			}
		},
		onReachBottom(){
		},
		onLoad() {
			// this.getstores(1)
		},
		methods: {
			getnum:function (e) {
				if(e.areacode != undefined){
					this.areacode = e.areacode
				}else{
					this.areacode = ''
				}//地区
				
				if(e.catid != undefined){
					this.catid = e.catid
				}else{
					this.catid = 0
				}//门店
				
				if(e.sortId != undefined){
					this.sortId = e.sortId
				}else{
					this.sortId = 1
				}//排序	
				this.getstores(1)
			},
			getstores(pag) {
				var lat = uni.getStorageSync('location').lat
				var lon = uni.getStorageSync('location').lng
				var citycode = uni.getStorageSync('area').ad_info.adcode.slice(0, 4) + '00'
				var page = pag
				http.post(
					`/app/EsStore/findStoreByCity.do?citycode=${citycode}&areacode=${this.areacode}&catid=${this.catid}&lat=${lat}&lon=${lon}&sort=${this.sortId}&page=${page}&rows=30`, {}
				).then(res => {
					console.log(res)
					this.datalist = res.data.list
					this.getchoosefor(this.datalist)
				})
			},
			getchoosefor(list) {
				list.forEach((item) => {
					if (item.tags != []) {
						item.Tags = JSON.parse(item.tags)
								
					} else {
						item.Tags = []
					}
					item.kilo = ((item.distance) / 1000).toFixed(2)
					if (item.comScore == null) {
						item.comScore = 0
					}
					if (item.comNumber == null) {
						item.comNumber = 0
					}
				})
			},
			getchoose(id,i) {
				this.isfirst = 1
				var indexs = i
				let shops = this.datalist.map((item, index) => {
					item.isstop = false
					if (indexs === index) {
						item.isstop = true
					}
					return item
				})
				this.getchoosefor(shops)
				uni.setStorageSync('chooseshop', shops)
				var ids = id
				var pages = getCurrentPages();
				var currPage = pages[pages.length - 1]; //当前页面
				var prevPage = pages[pages.length - 2]; //上一个页面
				prevPage.setData({
				        storeId:ids,
						replaceId:2,
				})
				uni.navigateBack({
					delta: 1
				})
			},
		}
	}
</script>
<style>
	.chooseactive {
		background: #FFFFFF !important;
		border: 1upx solid #F56B2D;
		color: #F56B2D !important;
	}
	.borderactive {
		border-left: 1px solid #eee;
		border-right: 1px solid #eee;
	}
	.leftactive{
		margin-left: 10upx;
	}
</style>
