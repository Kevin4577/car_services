<template>
	<view style="background: #eee;">
		<view class="textlist">
			<view style="font-size: 24upx;display: flex;flex-direction: column;align-items: center;flex: 3;" v-for="(item,index) in ['全部','已评价','待评价']"
			 :key='index' :class="index == centerIndex ?'active':''" @click="tabClick(index)">
				{{item}}
				<image style="width: 50upx;height: 4upx;margin-top: 8upx;" src="../../static/tabchoose1.png" v-if="index == centerIndex"></image>
			</view>
		</view>
		<view class="statelist">
			<view v-for="(item,index) in namelist" :key='index'>
				<view v-for="(ite,inde) in item.orderItems" :key='inde' 
				style="padding: 20upx;background: #fff;border-radius: 10upx;overflow: hidden;margin-top: 10upx;">
					<view style="font-size: 26upx;color: #999;padding: 10upx;display: flex;
					justify-content: space-between;box-sizing: border-box;align-items: center;">
						<view>
							{{ite.sn}}
						</view>
					</view>
					<view style="display: flex;padding: 10upx 0;">
						<image style="width: 142upx;height: 142upx;" :src="ite.image" mode=""></image>
						<view style="padding: 20upx;">
							<view style="font-size: 24upx;width: 475upx;height: 53upx;">
								{{ite.name}}
							</view>
							<view style="width: 450upx;font-size: 24upx;margin-top: 30upx;
							display: flex;justify-content: space-between;box-sizing: border-box;">
								<view style="color: #999;">
									数量：1
								</view>
								<view style="color: #D60808;">
									￥{{ite.price}}
								</view>
							</view>
						</view>
					</view>
					<view v-if="item.commentStatus == 1" style="float: right;width: 108upx;height: 38upx;background: #F4F4F4;
					border-radius: 100upx;font-size: 24upx;text-align: center;line-height: 38upx;color: #999;">
						已评价
					</view>
					<view v-if="item.commentStatus == 0" style="float: right;width: 108upx;height: 38upx;
					background: #F56B2D;border-radius: 100upx;font-size: 24upx;text-align: center;line-height: 38upx;color: #fff;"
					 @click="goaPpraise(inde)" :id="inde">
						待评价
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
				centerIndex: 0,
				namelist: [],

			}
		},
		onLoad(options) {
			this.centerIndex = 0;
			this.getcomcenter()
		},

		methods: {
			getcomcenter() {
				http.post(`/app/my/getMyCommentOrders.do?status=-1&page=1&rows=10`, {}).then(res => {
					console.log(res)
					this.namelist  = res.data.list
					console.log(this.namelist)
				})
			},
			tabClick(index) {
				this.centerIndex = index;
			},

		}
	}
</script>

<style>
	.textlist {
		padding: 20upx 30upx;
		display: flex;
		justify-content: space-between;
		background: #fff;
	}

	.statelist {
		padding: 20upx;
	}

	.active {
		color: #FE712A;
	}
</style>
