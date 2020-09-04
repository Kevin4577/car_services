<template>
	<view class="" style="width: 100vw;background: #fff;overflow: hidden;">
		<!-- <scroll-view scroll-y="true"  @scroll="getscorll" style="height: 100vh;"> -->
		<view style="font-size: 22upx;">
			<view>
				<view style="padding: 20upx;line-height: 40upx;height: 40upx;background: #eee;">
					热门品牌
				</view>
				<view style="display: flex;flex-wrap: wrap;justify-content: center;">
					<view style="background: #FFFFFF;padding: 20upx 60upx ;text-align: center;box-sizing: border-box;" v-for="(item,index) in Hotbrands"
					 :key='index' @click="getchoose(item.id,index)" :id="item.id">
						<image style="width: 60upx;height: 60upx;" :src="item.url" mode=""></image>
						<view>{{item.brand.slice(3,item.brand.length)}}</view>
					</view>
				</view>
			</view>
			<view v-for="(item,index) in Initials" :key="index" id="index">
				<view style="padding: 20upx;line-height: 40upx;height: 40upx;background: #eee;">
					{{item}}
				</view>
				<view style="background: #fff;display: flex;align-items: center;padding: 20upx;border-bottom: 1px solid #eee;"
				 v-for="(ite,inde) in carlist" :key='inde' v-if="ite.sortletters == item" @click="getchoose(ite.id,index)" :id="ite.id">
					<image style="width: 60upx;height: 60upx;" :src="ite.url" mode=""></image>
					<view style="margin-left: 20upx;">{{ite.brand.slice(3,ite.brand.length)}}</view>
				</view>
			</view>
		</view>
		<view style="display: flex;flex-direction: column;justify-content: space-between;position:fixed;right: 20upx;top: 150upx;height: 80%;">
			<view v-for="(item,index) in Initials" :key="index" style="font-size: 20upx;" @click="getlist(index)">
				{{item}}
			</view>
		</view>
		<!-- </scroll-view> -->
		<uni-drawer :visible="Isshow" mode="right" @close="getck()">
			<view>
				<view style="display: flex;align-items: center;text-align: center; padding: 20upx;">
					<image style="width: 60upx;height: 60upx;" :src="choose.url" mode=""></image>
					<view style="font-size: 24upx;margin-left: 20upx;">
						{{choosename}}
					</view>
				</view>
				<view v-for="(item,index) in showdata" :key='index' style="background: #FFFFFF;">
					<view style="font-size: 24upx;padding: 20upx ;height: 30upx;line-height: 30upx;background: #F6F6F6;">{{item.cname}}</view>
					<view style="padding: 20upx;font-size: 22upx;border-bottom: 1px solid #eee;" v-for="(ite,inde) in item.models" :key='inde' @click="goToCar(ite.id,ite.catId,ite.name,index,inde)"
					 :id="ite.id">{{ite.name}}</view>
				</view>
			</view>
		</uni-drawer>
	</view>
</template>

<script>
	// import ajax from '@/api/index.js'
	// import UniDrawer from '../../components/uni-drawer/uni-drawer.vue'
	import uniDrawer from '@/components/uni-drawer/uni-drawer.vue'
	var http = require('@/api/token.js')
	export default {
		data() {
			return {
				carlist: [],
				Initials: [],
				Hotbrands: [],
				showdata: [],
				choose: {},
				choosename: '',
				chooseimg: '',
				Isshow: false
			}
		},
		components: {
			uniDrawer,
		},
		onLoad() {
			this.getBrandlsit()
		},
		methods: {
			getBrandlsit(){
				http.post('/app/CarBrand/findCarBrandList.do', {}).then(res => {
					console.log(res)
					this.carlist = res.data
					var arr = []
					var hot = []
					this.carlist.forEach((item) => {
						arr.push(item.sortletters)
						if (item.ishotbrand === 1)
							hot.push(item)
					})
					this.Hotbrands = hot.slice(0, 8)
					var array = [];
					for (var i = 0; i < arr.length; i++) {
						if (array.indexOf(arr[i]) === -1) {
							array.push(arr[i])
						}
					}
					this.Initials = array
				})
			},
			getlist(index) {
				let ind = index
				const query = uni.createSelectorQuery();
				query.selectAll('#index').boundingClientRect().exec((res) => {
					// console.log(res[0])
					var Height = 0
					var Heightlist = [] //获取所选高度的列表，没用到
					res[0].forEach((item, inde) => {
						if (ind > inde) {
							Height += item.height //所有选中的高度相加
						}

					})
					// console.log(Height)
					if (ind == 0) {
						uni.pageScrollTo({
							scrollTop: 234
						})
					} else {
						uni.pageScrollTo({
							scrollTop: 234 + Height
						})
					}
				});
			},
			getchoose(id, index) {
				let ids = id

				this.Isshow = true
				// if(this.Isshow){
				// 	this.Isshow= false
				// }

				this.carlist.forEach((item) => {

					if (ids == item.id) {
						this.choose = item
						this.choosename = this.choose.brand.slice(3, this.choose.brand.length)
						this.chooseimg = item.url
					}
				})

				uni.setStorageSync('chooseCar', this.chooseimg)
				//根据id选择车型接口brandId
				uni.setStorageSync('brandId', id)
				uni.setStorageSync('brandImg', this.chooseimg) //传给add接口用的，更‘chooseCar’值一样，方便看懂，重新列一个
				uni.setStorageSync('brandName', this.choosename)
				console.log(uni.getStorageSync('brandName'))
				http.post(`/app/CarModelCat/findCarModelCatByBrand.do?brandid=${id}`, {}).then(res => {
					this.showdata = res.data
					console.log(this.showdata)
					//catid是指上海大众或者是一汽大众之类的总分类名
				})

			},
			getck() {
				this.Isshow = false
			},
			goToCar(id, catId, name, index, inde) {
				// 根据id选择排量接口的跳转
				uni.setStorageSync('modelCatId', catId)
				uni.setStorageSync('modelCatName', this.showdata[index].cname)
				uni.setStorageSync('modelName', name)
				uni.redirectTo({
					url: '../chooseCar/chooseCar?index=' + id
				});
				console.log(index, this.showdata[index].models[inde])
				var name1 = this.showdata[index].cname
				var name2 = this.showdata[index].models[inde].name
				var names = name1 + '—' + name2
				uni.setStorageSync('names', names)
			}
		}
	}
</script>

<style>
</style>
