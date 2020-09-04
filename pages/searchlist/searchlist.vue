<template>
	<view style="box-sizing: border-box;background: #eee;">
		<view style="display: flex;justify-content: space-between;padding: 15upx 0;
		border-bottom: 1px solid #eee;position: fixed;top: 0;width: 100%;background: #fff;z-index: 99;">
			<view v-for="(item,index) in list" :key="index" style="flex: 1;text-align: center;font-size: 24upx;
			border-left:1px solid #eee;display: flex;align-items: center;justify-content: center; "
			 @click="change(index)" :class="index == 3 ?'borders':''">
				<view v-for="(ite,inde) in imgId" :key="inde" v-if="index == inde " style="display: flex;justify-content: center;align-items: center;"
				 @click="getck(index)">
					<view :class="changeId === index ?'active':''">
						{{item}}
					</view>
					<image src="../../static/xiala.png" :class="ite.id ==0 ?'tranlata':''" style="width: 18upx;height: 10upx;margin-left: 10upx;"
					 v-if="index == 1 || index == 2"></image>
				</view>
			</view>
		</view>
		<view style="padding: 20upx;background: #fff;box-sizing: border-box;">
			
			<view style="height: 100%;width:100%;position: fixed;right: 0;top: 0;bottom: 0;" :class="showId == 1?'showactive':'hideactive'">
				<view style="position: absolute;width: 100%;height: 100%;right: 0" @click="getHide()">

				</view>
				<view style="position: absolute;width: 550upx;height: 100%;right: 0;background: #FFFFFF">
					<view style="padding: 20upx;">
						<view style="font-size: 30upx;font-weight: bold;">
							价格区间
						</view>
						<view style="display: flex;align-items: center;padding: 20upx 0;">
							<view style="width: 200upx;height: 50upx;background: #eee;align-items: center;padding:0 20upx">
								<input type="text" :value="MINprice" placeholder="最低价" @blur="getMINprice" style="height: 100%;line-height: 50upx;font-size: 26upx;text-align: center;" />
							</view>
							<view style="padding: 0 10upx;font-size: 28upx;">至</view>
							<view style="width: 200upx;height: 50upx;background: #eee;align-items: center;padding:0 20upx">
								<input type="text" :value="MAXprice" placeholder="最高价" @blur="getMAXprice" style="height: 100%;line-height: 50upx;font-size: 26upx;text-align: center;" />
							</view>
						</view>
					</view>
					<view style="padding: 20upx;">
						<view style="font-size: 30upx;font-weight: bold;">
							商品分类
						</view>
						<view style="display: flex;flex-wrap: wrap;padding: 20upx 0;">
							<view v-for="(item,index) in goodslist" :key="index" style="padding: 10upx;" @click="changeitem(index)">
								<view style="width: 145upx;height: 40upx;background: #eee;
								line-height: 40upx;font-size: 24upx;text-align: center;"
								 :class="itemId === index ?'itemactive':''">
									{{item}}
								</view>
							</view>
						</view>
					</view>
					<view style="width: 100%;position: absolute;bottom: 30upx;padding: 20upx 40upx;display: flex;justify-content: space-between;box-sizing: border-box;">
						<view style="width: 200upx;height: 50upx;line-height: 50upx;font-size: 26upx;
						text-align: center;background:#eee;"
						 @click="getnewReturn()">
							重置
						</view>
						<view style="width: 200upx;height: 50upx;line-height: 50upx;
						font-size: 26upx;text-align: center;background: #F56B2D;color: #FFFFFF;"
						 @click="geteturn()">
							完成
						</view>
					</view>
				</view>
			</view>
			<view v-if="SectionId == 0" style="padding: 20upx 0;box-sizing: border-box;margin-top: 20upx;">
				<view style="display: flex;padding: 20upx;" v-for="(item,index) in datalist" :key='index'>
					<image style="width: 182upx;height: 182upx;border-radius: 20upx;" :src="item.thumbnail" mode=""></image>
					<view style="flex: 1;margin-left: 20upx;position: relative;" @click="searchTopro(item.goodsId)">
						<view style="display: flex;justify-content: space-between;">
							<view style="font-size: 28upx;">
								{{item.name}}
							</view>
							<view style="font-size: 28upx;color: #D60808;display: flex;">
								<view style="font-weight: bold;">￥{{item.price/100}}</view>
								<view style="font-size: 22upx;color: #666;margin-left: 10upx;
								text-decoration: line-through;margin-top: 8upx;">￥{{item.mktprice/100}}</view>
							</view>
						</view>
						<view style="font-size: 24upx;color: #333;margin-top: 15upx;">
							{{item.intro}}
						</view>
						<view style="font-size: 28upx;color: #999;margin-top: 15upx;">
							{{item.kilo}}km
						</view>

						<view style="display: flex;font-size: 22upx;align-items: center;color: #999;margin-top: 15upx;">
							月销量{{item.buyCount}}笔
						</view>
						<view style="font-size: 24upx;color: #fff;background: #F56B2D;width: 80upx;line-height: 36upx;
								border-radius: 50upx;text-align: center;position: absolute;bottom: 20upx;right: 20upx;"
						 @click="searchtobuy(item.goodsId)">
							购买
						</view>
					</view>
				</view>
			</view>
			<view v-if="SectionId == 1" style="padding: 20upx 0;box-sizing: border-box;margin-top: 20upx;">
				<view style="display: flex;padding: 20upx;" v-for="(item,index) in Sectionlist" :key='index'>
					<image style="width: 152upx;height: 152upx;border-radius: 20upx;" :src="item.thumbnail" mode=""></image>
					<view style="flex: 1;margin-left: 20upx;position: relative;">
						<view style="display: flex;justify-content: space-between;">
							<view style="font-size: 28upx;">
								{{item.name}}
							</view>
							<view style="font-size: 28upx;color: #D60808;display: flex;">
								<view style="font-weight: bold;">￥{{item.price/100}}</view>
								<view style="font-size: 22upx;color: #666;margin-left: 10upx;
								text-decoration: line-through;margin-top: 8upx;">￥{{item.mktprice/100}}</view>
							</view>
						</view>
						<view style="font-size: 24upx;color: #333;margin-top: 15upx;">
							{{item.intro}}
						</view>
						<view style="font-size: 28upx;color: #999;margin-top: 15upx;">
							{{item.kilo}}km
						</view>
						
						<view style="display: flex;font-size: 22upx;align-items: center;color: #999;margin-top: 15upx;">
							月销量{{item.buyCount}}笔
						</view>
						<view style="font-size: 24upx;color: #fff;background: #F56B2D;width: 80upx;line-height: 36upx;
								border-radius: 50upx;text-align: center;position: absolute;bottom: 20upx;right: 20upx;"
						 @click="searchtobuy(item.goodsId)">
							购买
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
				changeId: 0,
				borderId: 3,
				search: '',
				showId: 0,
				MAXprice: "",
				MINprice: "",
				imgId: [{
						id: 1,
						sort: 0,
					},
					{
						id: 1,
						sort: 1,
					},
					{
						id: 1,
						sort: 2,
					},
					{
						id: 1,
						sort: null,
					},
				],
				itemId: -1,
				SectionId: 0, //价格区间
				list: ['综合', '销量', '价格', '筛选'],
				goodslist: ['汽车美容', '全车打蜡', '内饰清洗', '全车抛光', '汽车精洗'],
				datalist: [],
				Sectionlist: [],
				serviceName: ''
			}
		},
		onLoad(options) {
			this.search = options.index
			console.log(this.search)
			var lat1 = uni.getStorageSync('location').lat
			var lng1 = uni.getStorageSync('location').lng

			http.post(`/app/goods/findEsGoodsList.do?page=0&rows=0&text=${this.search}&lat=${lat1}&lon=${lng1}&sort=0&down=1`, {})
				.then(res => {
					console.log(res)
					this.datalist = res.data.list
					this.datalist.forEach((r) => {
						if (r.buyCount == null) {
							r.buyCount = 0
						}
						// console.log(r.store.distance)
						r.kilo = (r.store.distance / 1000).toFixed(2)
					})
				})
		},
		methods: {
			change(index) {
				this.changeId = index
			},
			changeitem(index) {
				this.itemId = index
				console.log(this.goodslist[index])
				this.serviceName = this.goodslist[index]
			},
			getlist(ind, indo) {
				// this.search = ''
				var index = ind
				var down = indo
				var lat1 = uni.getStorageSync('location').lat
				var lng1 = uni.getStorageSync('location').lng
				http.post(
						`/app/goods/findEsGoodsList.do?page=1&rows=40&text=${this.search}&lat=${lat1}&lon=${lng1}&sort=${index}&down=${down}`, {}
					)
					.then(res => {
						console.log(res)
						this.datalist = res.data.list
						this.datalist.forEach((r) => {
							if (r.buyCount == null) {
								r.buyCount = 0
							}
							// console.log(r.store.distance)
							r.kilo = (r.store.distance / 1000).toFixed(2)
						})
					})
			},
			getck(i, j) {
				this.SectionId = 0
				var index = i
				if (index == 0) {
					var sort = this.imgId[i].sort
					this.getlist(sort, 1)
				}
				if (index == 1) {
					var sort = this.imgId[i].sort
					var downid = this.imgId[i].id
					if (downid == 0) {
						this.imgId[i].id = 1
						var downId = this.imgId[i].id
						this.getlist(sort, downId)
					} else {
						this.imgId[i].id = 0
						var downId = this.imgId[i].id
						this.getlist(sort, downId)
					}
					console.log(this.imgId[i].id)

				}
				if (index == 2) {
					var sort = this.imgId[i].sort
					var downid = this.imgId[i].id
					if (downid == 0) {
						this.imgId[i].id = 1
						var downId = this.imgId[i].id
						this.getlist(sort, downId)
					} else {
						this.imgId[i].id = 0
						var downId = this.imgId[i].id
						this.getlist(sort, downId)
					}
					console.log(this.imgId[i].id)

				}
				if (index == 3) {
					this.showId = 1
				}
			},
			getHide() {
				this.showId = 0
			},
			getMAXprice: function(e) {
				this.MAXprice = e.detail.value
			},
			getMINprice: function(e) {
				this.MINprice = e.detail.value
			},
			getnewReturn() {
				this.itemId = -1
				this.MAXprice = ''
				this.MINprice = ''
				this.serviceName = ''
				this.Sectionlist = []
			},
			geteturn() {
				this.Sectionlist = []
				if (this.MAXprice == "" && this.MINprice == "") {
					if (this.serviceName != "") {
						this.datalist.forEach((r) => {
							if (this.serviceName == r.intro) {
								console.log(r)
								this.SectionId = 1
								this.Sectionlist.push(r)
							}
						})
					} else {
						uni.showToast({
							title: '筛选条件不能为空',
							duration: 2000,
							icon: 'none'
						});
					}

				} else {
					if (this.serviceName != "") {
						this.datalist.forEach((r) => {
							console.log(0)
							if (this.MINprice <= (r.price / 100) && (r.price / 100) <= this.MAXprice && this.serviceName == r.name) {
								console.log(r)
								this.SectionId = 1
								this.Sectionlist.push(r)
							}
						})
					} else {
						this.datalist.forEach((r) => {
							if (this.MINprice <= (r.price / 100) && (r.price / 100) <= this.MAXprice) {
								console.log(r)
								this.SectionId = 1
								this.Sectionlist.push(r)
							}
						})
					}

				}

			},
			searchTopro(id) {
				var ids = id
				uni.navigateTo({
					url: `../productdetails/productdetails?id=${ids}`
				})
			},
			searchtobuy(id) {
				var ids = id
				uni.navigateTo({
					url: `../confirmation/confirmation?id=${ids}`
				})
			}
		}
	}
</script>

<style>
	.active {
		color: #F56B2D;
	}

	.itemactive {
		background: #F66C2D !important;
		color: #FFFFFF !important;
	}

	.borders {
		border-right: 1px solid #eee;

	}

	.showactive {
		transform: translateX(0);
		transition: all 1s ease
	}

	.hideactive {
		transform: translateX(750upx);
		transition: all 1s ease
	}

	.tranlata {
		transform: rotate(180deg)
	}

	.right {
		border: none;
	}
</style>
