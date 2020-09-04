<template>
	<view style="padding: 20upx;box-sizing: border-box;">
		<view style="display: flex;justify-content: space-between;padding:0 20upx;">
			<view style="width: 501upx;height: 52upx;background: #F4F4F4;border-radius: 100upx;padding:0 30upx;">
				<input type="text" :value="searchs" placeholder="请输入您要搜索的商品" style="height: 52upx;line-height: 52upx;font-size: 26upx;" @blur="getsearch" />
			</view>
			<view style="font-size: 26upx;line-height: 52upx;" @click="gosearch()">
				搜索
			</view>
		</view>
		<view style="padding: 20upx 10upx;font-size: 30upx;font-weight: bold;">
			热门搜索
		</view>
		<view style="padding:0upx 20upx;display: flex;flex-wrap: wrap;align-items: center;">
			<view v-for="(item,index) in list" :key='index'  @click="getHotkey(item.keywords)"
			style="width: 128upx;height: 38upx;line-height: 38upx;text-align: center;
			line-height: 38upx;border-radius: 100upx;background: #F4F4F4;font-size: 24upx;margin-left: 10upx;">
				{{item.keywords}}
			</view>
		</view>
		<view style="padding: 20upx 10upx;font-size: 30upx;font-weight: bold;display: flex;align-items: center;justify-content: space-between;">
			<view>
				历史搜索
			</view>
			<image style="width: 20upx;height: 24upx;" src="../../static/dele.png" mode="" @click="seachDele()"></image>
		</view>
		<view style="padding:0upx 20upx;display: flex;flex-wrap: wrap;align-items: center;">
			<view v-for="(item,index) in list2" :key='index'  @click="getHiskey(item)"
			style="width: 128upx;height: 38upx;line-height: 38upx;text-align: center;margin-top: 20upx;
			line-height: 38upx;border-radius: 100upx;background: #F4F4F4;font-size: 24upx;margin-left: 10upx;">
				{{item}}
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
				list: [],
				list2: [],
				search: '',
				searchs:''
			}
		},
		onLoad() {
			http.post('/app/HdSearch/findHotSearchList.do', {}).then(res => {
				console.log(res)
				this.list = res.data
			})
			if(uni.getStorageSync('Hdsearch')!=''){
				this.list2 = uni.getStorageSync('Hdsearch')
			}else{
				this.list2 = []
			}
			
		},
		methods: {
			getsearch: function(e) {
				if(e.detail.value != ''){
					this.searchs = e.detail.value
					this.search = this.searchs
					var hdlist = []
					hdlist.push(this.search)
					for (var i = 0; i < hdlist.length; i++) {
						if (this.list2.indexOf(hdlist[i]) == -1) {
							this.list2.push(hdlist[i]);
						}
						uni.setStorageSync('Hdsearch',this.list2)
					}
				}
			},
			getHotkey(i){
				console.log(i)
				this.search = i
				uni.navigateTo({
					url:`../searchlist/searchlist?index=${this.search}`
				})
			},
			getHiskey(i){
				console.log(i)
				this.search = i
				uni.navigateTo({
					url:`../searchlist/searchlist?index=${this.search}`
				})
			},
			seachDele(){
				uni.setStorageSync('Hdsearch',[])
				this.list2 = uni.getStorageSync('Hdsearch')
			},
			gosearch() {
				this.searchs = ''
				uni.navigateTo({
					url:`../searchlist/searchlist?index=${this.search}`
				})
					
			}
		}
	}
</script>

<style>
	.active {
		color: #F56B2D;
	}
</style>
