<template>
	<view class="content">
		<screen @getchoose="getnum"></screen>
		<view style="margin-top: 70upx;">
			<view  class="store" v-for="(item,index) in datalist" :key='index' @click="gonext(item.storeId)"
			 style="border-bottom: 1px solid #eee;">
				<image style="width: 200upx;height: 160upx;border-radius: 10upx;" :src="item.imgurl" mode="aspectFill"></image>
				<view class="storelist">
					<view style="display: flex;justify-content: space-between;box-sizing: border-box;padding: 5upx 0;">
						<view style="font-size: 30upx;font-weight: 500;width: 330upx;
						overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">
							{{item.sname}}
						</view>
						<view v-if="item.price != 0" style="flex: 1;display: flex;align-items: center;
						text-align: center;color:#D60808;font-weight: 500;justify-content: flex-end;">
							<view style="font-size: 26upx;margin-top: 6upx;">
								￥
							</view>
							<view style="font-size: 34upx;">
								{{item.price/100}}
							</view>
							<view style="font-size: 26upx;margin-left: 5upx;margin-top: 6upx;">
								洗车
							</view>
						</view>
					</view>
					<view style="display: flex;padding: 8upx 0;font-size: 26upx;">
						<view style="display: flex;">
							<view style="color:#666">
								总评分
							</view>
							<view style="color:#D60808;margin-left:10upx">
								{{item.comScore}}
							</view>
						</view>
						<view style="display: flex;margin-left: 15upx;">
							<view style="color:#666">
								总订单
							</view>
							<view style="color:#D60808;margin-left:10upx">
								{{item.sbuyCount}}
							</view>
						</view>
					</view>
					<view style="display: flex;font-size: 26upx;justify-content: space-between;color: #666;padding: 8upx 0;">
						<view style="width: 400upx;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">
							{{item.saddress}}
						</view>
						<view style="color: #666;">
							{{item.kilo}}km
						</view>
					</view>
					<view style="padding: 8upx 0;display: flex;">
						<view style="box-sizing: border-box;font-size: 22upx;color: #F89062;" v-for="(ite,inde) in item.Tags" :key='inde'
						 v-if="item.Tags != []">
							<view style="border-radius: 100upx;padding:2upx 10upx;
							border:1px solid #F89062;text-align: center;"  :class="inde != 0?'leftactive':''">
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
	import '../store/store.css'
	import screen from '../../components/uni-screen/uni-screen.vue'
	const http = require('@/api/token.js')
	const QQMapWX = require('../../qqsdk/qqmap-wx-jssdk.js')
	export default {
		components: {
			screen
		},
		data() {
			return {
				displayId: '',
				storelist: [],
				datalist: [],
				choosedata: [],
				isLastPage: false,
				Pagenum: 0,
				areacode:'',
				sortId:1,
				catid:0
			}
		},
		
		onPullDownRefresh() {
			this.Storeoaction()
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		onShareAppMessage() {
			this.Storeoaction()
			this.getDefault(1)
		},
		onReachBottom() {
			if(this.filterId == 1){
				if(this.filterisLastPage != true){
					var page = this.filterPagenum + 1
					this.getfilter(page)
				}else{
					console.log("没有更多")
				}
			}else{
				if (this.isLastPage != true) {
					var page = this.Pagenum + 1
					this.getDefault(page)
				} else {
					console.log("没有更多")
				}
			}
		},
		
		onLoad() {
			this.Storeoaction()
			this.getDefault(1)
		},
		onShow(){
			// this.Storeoaction()
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
				this.getDefault(1)
			},
			Storeoaction() {
				let _this = this;
				uni.getLocation({
					type: 'gcj02',
					success: function(res) {
						console.log(res)
						const qqmapsdk = new QQMapWX({
							key: '22GBZ-RGZEX-RBQ4B-7HODA-ADFK2-XFBWR' //key腾讯地图api密钥  
						})
						qqmapsdk.reverseGeocoder({
							location: {
								latitude: res.latitude,
								longitude: res.longitude
							},
							success: res => {
								_this.pos = res.result.location
								uni.setStorageSync('location', _this.pos)
								uni.setStorageSync('area', res.result)
								_this.city = res.result.address_component.city
								_this.getDefault(1)
							}
						})
					}
				})
			},
			getforeach(list) {
				list.forEach((r) => {
					r.kilo = ((r.distance) / 1000).toFixed(2)
					if (r.comScore == null) {
						r.comScore = 0
					}
					if (r.comNumber == null) {
						r.comNumber = 0
					}
				})
				list.forEach((item) => {
					if (item.tags != []) {
						item.Tags = JSON.parse(item.tags)

					} else {
						item.Tags = []
					}
				})
			},
			gonext(id) {
				uni.navigateTo({
					url: '../storedetails/storedetails?index=0' + '&&id=' + id
				})
			},
			getDefault(pag) {
				var lat = uni.getStorageSync('location').lat
				var lon = uni.getStorageSync('location').lng
				var citycode = uni.getStorageSync('area').ad_info.adcode.slice(0, 4) + '00'
				var page = pag
				http.post(
					`/app/EsStore/findStoreByCity.do?citycode=${citycode}&areacode=${this.areacode}&catid=${this.catid}&lat=${lat}&lon=${lon}&sort=${this.sortId}&page=${page}&rows=30`, {}
				).then(res => {
					console.log(res)
					this.isLastPage = res.data.isLastPage
					this.Pagenum = res.data.pageNum
					if (page == 1) {
						this.datalist = res.data.list
						this.getforeach(this.datalist)
					} else {
						this.datalist = this.datalist.concat(res.data.list)
						this.getforeach(this.datalist)
					}
				})
			},
		}
	}
</script>

<style>
	.borderactive {
		border-left: 1px solid #eee;
		border-right: 1px solid #eee;
	}
	.leftactive{
		margin-left: 10upx !important;
	}
</style>
