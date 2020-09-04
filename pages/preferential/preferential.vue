<template>
	<view style="padding: 20upx;">
		<view v-for="(item,index) in goods" :key="index" style="display: flex;" @click="miaosha(item.goodsId)">
			<image style="width: 168upx;height: 168upx;border-radius: 10upx;" :src="item.thumbnail" mode=""></image>
			<view style="margin-left: 20upx;font-size: 24upx;flex: 1;">
				<view style="font-size: 28upx;padding: 5upx 0;">
					{{item.name}}
				</view>
				<view style="padding: 5upx 0;">
					销量{{item.buyCount}}笔
				</view>
				<view style="width: 100%;display: flex;justify-content: space-between;font-size: 22upx;padding: 5upx 0;">
					<view style="display: flex;">
						<view style="font-size: 26upx;color: #D60808;">￥{{item.price/100}}</view>
						<view style="font-size: 20upx;color: #999999;text-decoration: line-through;margin-top: 8upx;margin-left: 8upx;">￥{{item.mktprice/100}}</view>
					</view>
					<view v-if="benId != 3" style="font-size: 24upx;width: 88upx;height: 38upx;color: #fff;text-align: center;
						line-height: 38upx;border-radius: 50upx;background: #F46D2D;margin-right: 30upx;">购买</view>
					 <view v-if="benId == 3" >
						 <view v-for="(ite,inde) in timelist" :key="inde" >
						 	 {{ite.startTime}} 至 {{ite.endTime}}
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
				benId: 0,
				datalist: [],
				goods: [],
				title:'',
				timelist:[]
			}
		},
		onLoad(options) {
			this.benId = options.id
			if (this.benId == 3) {
				http.post('/app/seckill/findEsSeckillList.do?page=1&rows=5', {}).then(res => {
					console.log(res)
					this.datalist = res.data.list
					this.datalist.forEach((r) => {
						// if(r.gname)
						this.goods.push(r.goods)
						this.title = r.title
						var times ={
							"startTime":r.startTime.slice(5,16),
							"endTime" : r.endTime.slice(5,16)
						}
						this.timelist.push(times)
						
					})
					uni.setNavigationBarTitle({
					   title: this.title
					})
				})
			} else {
				http.post(`/app/hdGoods/findHdGoodsByHdCatId.do?page=1&rows=5&catId=${this.benId}`, {}).then(res => {
					console.log(res)
					this.datalist = res.data.list
					this.datalist.forEach((r) => {
						this.goods.push(r.goods)
						if(this.benId == 1){
							this.title  = '每日特价'
						}
						if(this.benId == 2){
							this.title  = '超值优惠'
						}
					})
					uni.setNavigationBarTitle({
					   title: this.title
					})
					console.log(this.goods)
				})

			}
			
		},
		methods:{
			miaosha(id){
				if(uni.getStorageSync('Userdetail').token != undefined){
					var ids = id
					uni.navigateTo({
						url:`../productdetails/productdetails?id=${ids}`
					})
				}else{
					uni.navigateTo({
						url:'../login/login'
					})
				}
				
			}
		}
	}
</script>

<style>
</style>
