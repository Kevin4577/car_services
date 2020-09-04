<template>
	<view class="" style="background: #eee;">
		<view style="">
			<view v-for="(item,index) in changelist" :key="index" 
			style="display: flex;justify-content: space-between;box-sizing: border-box;border-bottom: 1px solid #ccc;background: #fff;">
				<view style="padding: 10upx;display: flex;">
					<image style="width: 142upx;height: 142upx;" :src="item.mgimgUrl" mode=""></image>
					<view style="flex: 1;padding: 10upx 20upx;">
						<view style="font-size: 24upx;">
							{{item.mgname}}
						</view>
						<view style="display: flex;margin-top: 20upx;font-size: 26upx;justify-content: space-between;">
							<view class="">
								￥{{item.mgprice/100}}
							</view>
							<view @click="getgengH(item.mgid,item.mgprice)">
							    更换
							</view>
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
		data(){
			return{
				changelist:[],
				dataTip:0,
				count:0,
				Newlist:[]
			}
		},
		onLoad(options) {
			console.log(options.index)
			var ids = options.id
			this.dataTip = options.ip
			this.count = options.ic
			var cis = options.ci
			http.post(`/app/carMaintainGoods/findGoodsByStandard.do?stanardId=${ids}&catId=${cis}`,{}).then(res => {
				console.log(res)
				this.changelist = res.data
			})
		},
		methods:{
			getgengH(id,pri){
				console.log(id)
				var goodsid = id
				var price = pri
				var pages = getCurrentPages();
				var currPage = pages[pages.length - 1]; //当前页面
				var prevPage = pages[pages.length - 2]; //上一个页面
				prevPage.setData({
				        replaceId:1,
				        goodsid:goodsid,
						// changeprice:price,
						dataTip:this.dataTip,
						count:this.count,
						changestatus:1//跟换状态
				})
				uni.navigateBack({
					delta:1
				})
				
			}
		}
		
	}
</script>

<style>
</style>
