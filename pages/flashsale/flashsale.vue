<template>
	<view>
		<view style="height: 360rpx;">
			<image style="width: 100%;height: 100%" :src="'http://qiniu.1788c.cn/saleflash.png'" mode=""></image>
		</view>
		<view id="demo">
			<scroll-view scroll-x="true" style="width: 100%;height: 108rpx;background: #F56B2D;
				overflow: hidden;white-space: nowrap;"
			 :scroll-left="moving" :class="showId == 0?'bloactive':''">
				<view style="width: 150rpx;height: 100%;display: inline-block;" v-for="(item,index) in timelist" :key="index"
				 :class="index == choseId?'active':''">
					<view style="text-align: center;color: #fff;height: 108rpx;display: flex;flex-direction: column;
					align-items: center;justify-content: space-between;padding: 20rpx 0;box-sizing: border-box;"
					 @click="getchose(item.id,index)">
						<view style="font-size: 32rpx;">
							{{item.startTime}}
						</view>
						<view style="font-size: 26rpx;">
							<view v-if="item.overtime == 2">已结束</view>
							<view v-if="item.overtime == 1">抢购中</view>
							<view v-if="item.overtime == 0">即将开抢</view>
						</view>
					</view>
				</view>
			</scroll-view>
			<view v-if="showId == 0" style="width: 100%;height: 108rpx;background: #FC985C;"></view>
		</view>
		<view id="demos">
			<scroll-view v-if="showId == 0" scroll-x="true" style="width: 100%;height: 108rpx;background: #F56B2D;overflow: hidden;
				white-space: nowrap;position: fixed;top: 0;z-index: 99;"
			 :scroll-left="moving" :class="showId == 1?'noneactive':''">
				<view style="width: 150rpx;height: 100%;display: inline-block;" v-for="(item,index) in timelist" :key="index"
				 :class="index == choseId?'active':''">
					<view style="text-align: center;color: #fff;height: 108rpx;display: flex;flex-direction: column;
					align-items: center;justify-content: space-between;padding: 20rpx 0;box-sizing: border-box;"
					 @click="getchose(item.id,index)">
						<view style="font-size: 32rpx;">
							{{item.startTime}}
						</view>
						<view style="font-size: 26rpx;">
							<view v-if="item.overtime == 2">已结束</view>
							<view v-if="item.overtime == 1">抢购中</view>
							<view v-if="item.overtime == 0">即将开抢</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<view style="font-size: 30rpx;color: #fff;background:#FC985C;padding-top: 20rpx;padding-left: 30rpx;display: flex;
			width: 100%;align-items: center;"
		 v-for="(item,index) in timelist" :key="index" v-if="choseId == index">
			<view v-if="item.overtime == 1" style="display: flex;align-items: center;">
				<view>限时抢购中</view>
				<view>
					<uni-countdown :show-day="false" color="#fff" background-color="#333333" border-color="#FFFFFF" :hour="item.stoptime.slice(0,2)"
					 :minute="item.stoptime.slice(3,5)" :second="item.stoptime.slice(8,10)" :reset="reset">
					</uni-countdown>
				</view>
			</view>
			<view v-if="item.overtime != 1" style="display: flex;align-items: center;">
				<view v-if="item.overtime == 2">已结束</view>
				<view v-if="item.overtime == 0">即将开抢</view>
				<view>
					<uni-countdown :show-day="false" color="#fff" background-color="#333333" border-color="#FFFFFF" :hour="0" :minute="0"
					 :second="0" :reset="reset">
					</uni-countdown>
				</view>
			</view>
		</view>
		<swiper :duration="1000" style="height: 1200rpx;background:#FC985C;" :current="choseId" @change="changepage">
			<swiper-item v-for="(items,indexs) in timelist" :key="indexs" :item-id="items.id" style="padding: 20rpx;box-sizing: border-box;">
				<scroll-view scroll-y="true" style="height: 100%;">
					<view style="padding: 10rpx 0;" v-for="(item,index) in goodslist" :key="index">
						<view style="width: 100%;height: 260rpx;background:#fff;border-radius: 20rpx;
						display: flex;align-items: center;padding: 0 20rpx;box-sizing: border-box;">
							<view>
								<image v-if="item.esGoods != null" style="width: 208rpx;height: 218rpx;border-radius: 20rpx;" :src="item.esGoods.original"
								 mode="aspectFill">
								</image>
								<image v-if="item.esGoods == null" style="width: 208rpx;height: 218rpx;border-radius: 20rpx;" :src="item.carMaintainGoods.mgimgUrl"
								 mode="aspectFill">
								</image>
							</view>
							<view style="flex: 1;padding: 5rpx 25rpx;height: 218rpx;display: flex;flex-direction: column;
							justify-content: space-between;box-sizing: border-box;">
								<view v-if="item.esGoods != null" style="font-size:30rpx;color: #333;">
									{{item.esGoods.name}}
								</view>
								<view v-if="item.esGoods == null" style="font-size:30rpx;color: #333;">
									{{item.carMaintainGoods.mgname}}
								</view>
								<view style="display: flex;align-items: center;">
									<view style="width: 208rpx;height: 20rpx;background:#FF8047;border-radius: 50rpx;
									font-size: 18rpx;color: #fff;line-height: 20rpx;text-align: center;position: relative;">
										<view style="position: absolute;width: 100%;height: 100%;line-height: 20rpx;z-index: 99;">
											{{item.percen*100}}%
										</view>
										<view :style="{width:length}" class="baifen">

										</view>
									</view>
									<view style="color: #999999;font-size: 24rpx;margin-left: 20rpx;">剩余{{item.remainNum}}</view>
								</view>
								<view style="display: flex;align-items: center;width: 100%;justify-content: space-between;">
									<view style="display: flex;align-items: center;">
										<p style="font-size: 26rpx;">抢购价：</p>
										<p style="color:#F56B2D;font-size: 36rpx;margin-top: -6rpx;">￥{{item.price/100}}</p>
										<p style="color: #999999;font-size: 26rpx;text-decoration: line-through;margin-left: 8rpx;">￥{{item.oldPrice/100}}</p>
									</view>
									<view v-if="choseId == inde" v-for="(ite,inde) in timelist" :key="inde">
										<view v-if="ite.overtime == 0" style="height: 42rpx;width:108rpx;background:#CCCCCC;font-size: 24rpx;color: #fff;
										border-radius: 100rpx;line-height: 42rpx;text-align: center;font-size: 22rpx;" >
										即将抢购</view>
										<view v-if="item.remainNum != 0 && ite.overtime == 1" style="height: 42rpx;width:108rpx;background:#F56B2D;font-size: 24rpx;color: #fff;
										border-radius: 100rpx;line-height: 42rpx;text-align: center;"
										@click="getorder(item.esGoods,item.carMaintainGoods,item.price,item.type,ite.id)">
										抢购中</view>
										<view v-if="item.remainNum == 0 && ite.overtime == 1" style="height: 42rpx;width:108rpx;background:#CCCCCC;font-size: 24rpx;color: #fff;
										border-radius: 100rpx;line-height: 42rpx;text-align: center;" >
										已抢光</view>
										<view v-if="ite.overtime == 2" style="height: 42rpx;width:108rpx;background:#CCCCCC;font-size: 24rpx;color: #fff;
										border-radius: 100rpx;line-height: 42rpx;text-align: center;" >
										已结束</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import uniCountdown from "@/components/linnian-CountDown/uni-countdown.vue"
	const http = require('@/api/token.js')
	export default {
		components: {
			uniCountdown
		},
		data() {
			return {
				reset: true,
				timelist: [],
				goodslist: [],
				showId: -1,
				pageHeight: 0,
				choseId: 0,
				length: 0,
				percentage: 0,
				moving: 0,
				hdtimeId: 0,
				countdown: []
			}
		},
		onPageScroll(e) {
			this.pageHeight = e.scrollTop
			if (this.pageHeight > 178) {
				this.showId = 0
			} else {
				this.showId = 1
			}
		},
		onShareAppMessage() {
			this.gettime(0)
			// this.getgoods(this.hdtimeId)
		},
		onLoad() {
			this.gettime(0)
			//time里面的showdata
		},
		methods: {
			gettime(hdid) {
				http.post('/app/mshd/getShowDateByToday.do').then(res => {
					console.log(res)
					this.timelist = res.data
					if(hdid == 0){
						this.hdtimeId = this.timelist[0].id
						this.getgoods(this.hdtimeId)
					}else if(hdid == -1){
						
					}else{
						this.getgoods(hdid)
					}
					this.reset = true
					this.timelist.forEach((r) => {
						r.endDate = r.showDate.slice(0, 11) + r.endTime + ':00'
						r.startDate = r.showDate.slice(0, 11) + r.startTime + ':00'
						const minute = 1000
						var date = new Date()
						r.datehours = date.getTime()
						r.endhours = new Date(r.endDate.replace(/-/g, '/')).getTime()
						r.starthours = new Date(r.startDate.replace(/-/g, '/')).getTime()
						r.minute = Math.floor(Math.abs(r.datehours - r.endhours) / minute)
						r.stoptime = this.formatSeconds(r.minute)
						r.overtime = 0
						if (r.endhours <= r.datehours) {
							r.overtime = 2
							//当前时间大于了结束时间，结束了
						} else if (r.datehours < r.starthours) {
							r.overtime = 0
							//当前时间大于开始小于结束 抢购中
						} else {
							r.overtime = 1
						} //当前时间小于开始时间 即将
						var countdown = {
							'counttime': r.stoptime
						}
					})
				})
			},
			getgoods(id) {
				var ids = id
				http.post(`/app/mshd/getGoodsByHsTimeId.do?hdtimeId=${ids}`).then(res => {
					console.log(res)
					this.goodslist = res.data
					this.goodslist.forEach((r) => {
						r.percen = (r.remainNum / r.num).toFixed(2)
						this.length = r.percen * 208 + 'rpx'
					})
					// console.log(this.goodslist)
				})
			},
			formatSeconds(value) {
				let result = parseInt(value)
				let h = Math.floor(result / 3600) < 10 ? '0' + Math.floor(result / 3600) : Math.floor(result / 3600);
				let m = Math.floor((result / 60 % 60)) < 10 ? '0' + Math.floor((result / 60 % 60)) : Math.floor((result / 60 % 60));
				let s = Math.floor((result % 60)) < 10 ? '0' + Math.floor((result % 60)) : Math.floor((result % 60));

				let res = '';
				res += `${h}h`;
				res += `${m}min`;
				res += `${s}s`;
				return res;
				// if (h !== '00')
				// if (m !== '00')
			}, //时间处理
			getchose(i, ind) {
				this.choseId = ind
				// this.hdtimeId = i
				console.log(i)
				var ids = i
				this.gettime(ids)
			},
			changepage: function(e) {
				this.choseId = e.detail.current
				if (this.choseId > 3) {
					this.moving = 800
				} else {
					this.moving = 0
				}
				this.gettime(-1)
				var hdId = e.detail.currentItemId
				this.getgoods(hdId)
			},
			
			getorder(list1, list2, p, type,hdTimeId) {
				var msgoods
				if (list1 == null) {
					msgoods = list2
				} else {
					msgoods = list1
				}
				var hdTimeId = hdTimeId
				var price = p
				var type = type
				uni.setStorageSync('msgoods', msgoods)
				uni.navigateTo({
					url: `../msHdconfirmation/msHdconfirmation?price=${price}&type=${type}&hdTimeId=${hdTimeId}`
				})
			},
		}
	}
</script>

<style>
	.active {
		background: #FF8047;
	}

	.bloactive {
		display: none;
	}

	.noneactive {
		display: none;
	}

	.baifen {
		height: 20rpx;
		background: #F56B2D;
		border-radius: 50rpx;
		font-size: 18rpx;
		color: #fff;
		line-height: 20rpx;
		text-align: center;
		position: absolute;
		top: 0;
		left: 0;
	}
</style>
