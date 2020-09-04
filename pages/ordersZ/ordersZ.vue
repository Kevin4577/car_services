<template>
	<view style="padding: 20upx;">
		<!-- v-show="showIndex === 0" -->
		<scroll-view scroll-y="true" style="height: 100vh;margin-top: 60upx;"  @scrolltolower="loadmores">
			<view>
				<view style="padding: 20upx 0;overflow: hidden;background: #fff;border-radius: 10upx;margin-top: 10upx;" 
				v-for="(item,index) in datalist"
				 :key='index'>
					<view style="padding: 10upx 20upx;font-size: 30upx;color: #999;display: flex;justify-content: space-between;box-sizing: border-box;align-items: center;">
						<view class="">
							订单编号：{{item.sn}}
						</view>
						<image v-if="showIndex == 0" style="width: 24upx;height: 28upx;" src="../../static/dele.png" @click="cancel(item.oid)"></image>
					</view>
					<view v-for="(ite,inde) in item.orderItems" :key="inde" >
						<view style="padding: 0 20upx;">
							<view style="display: flex;padding: 20upx 0;box-sizing:border-box;border-bottom: 1px solid #f1f1f1;" @click="getdetail(item.oid)">
								<image style="width: 160upx;height: 160upx;border-radius: 5upx;" :src="ite.image" mode=""></image>
								<view style="flex: 1;display: flex;flex-direction: column;
								justify-content: space-between;box-sizing: border-box;padding: 20rpx 0;margin-left: 20rpx;">
									<view style="font-size: 28upx;width: 475upx;height: 53upx;">
										{{ite.name}}
									</view>
									<view style="width: 450upx;font-size: 28upx;display: flex;justify-content: space-between;box-sizing: border-box;">
										<view style="color: #999;">
											数量:{{ite.num}}
										</view>
										<view style="color: #D60808;">
											￥{{ite.price/100}}
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
					<view style="display: flex;align-items: center;justify-content: space-between;margin-top: 20upx;padding:0 20upx;box-sizing: border-box;">
						<view style="display: flex;">
							<image style="width: 28upx;height: 28upx;" src="../../static/shopmen.png" mode="" v-if="item.sname"></image>
							<view style="font-size: 26rpx;color: #333333;margin-left: 8upx;line-height: 28upx;">{{item.sname || ''}}</view>
						</view>
						<view v-if="showIndex == 0" style="width: 118upx;height: 48upx;background: #F56B2D;border-radius: 100upx;
									font-size: 30upx;text-align: center;line-height: 48upx;color: #fff;"
						 :key="index" @click="goPay(index)">
							去付款
						</view>
						<view v-if="showIndex == 1" style="display: flex;align-items: center;justify-content: flex-end;">
							<view v-if="item.disableRefund != 1" style="width: 138upx;height: 48upx;background: #F56B2D;border-radius: 100upx;
									font-size: 28upx;text-align: center;line-height: 48upx;color: #fff;"
							 :key="index" @click="goreturnPay(item.oid)">
								申请退款  <!-- disableRefund 秒杀活动不可退款-->
							</view>
							<view v-if="item.orderGoodsType === 0 || item.orderGoodsType === 1" style="width: 118upx;height: 48upx;background: #F56B2D;border-radius: 100upx;
									font-size: 28upx;text-align: center;line-height: 48upx;color: #fff;margin-left: 10upx;"
							 :key="index" @click="make(item.sn)">
								核销码  <!-- orderGoodsType -->
							</view>
							<view v-if="(item.orderGoodsType === 1 || item.orderGoodsType === 2) && item.otype === 2" style="width: 118upx;height: 48upx;background: #F56B2D;border-radius: 100upx;
									font-size: 28upx;text-align: center;line-height: 48upx;color: #fff;margin-left: 10upx;"
							 :key="index" @click="makejump(item.orderItems[0].catId,item.orderItems[0].goodsId,item.orderItems[0].name,item.oid)">
								去保养  <!-- orderGoodsType -->
							</view>
						</view>
						<view v-if="showIndex == 2" style="width: 118upx;height: 48upx;background:#eee;border-radius: 100upx;
								font-size: 28upx;text-align: center;line-height: 48upx;color: #999;"
						 :key="index" >
							已评价
						</view>
						<view v-if="showIndex == 3"  style="width: 118upx;height: 48upx;background:#F66C2D;border-radius: 100upx;
								font-size: 28upx;text-align: center;line-height: 48upx;color: #fff;"
						 :key="index" @click="getordcoms()">
							去评价
						</view>
						
						<view v-if="showIndex == 4" style="width: 118upx;height: 48upx;background:#eee;border-radius: 100upx;
								font-size: 28upx;text-align: center;line-height: 48upx;color: #999999;"
						 :key="index">
							已处理
						</view>
						<view v-if="showIndex == 5" style="width: 118upx;height: 48upx;background:#eee;border-radius: 100upx;
								font-size: 28upx;text-align: center;line-height: 48upx;color: #999999;"
						 :key="index">
							处理中
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default{
		name:'orders',
		props: {
			datalist:{
				type:Array
			},
			showIndex:{
				type:Number
			}
		},
		data(){
			return{
				
			}
		},
		methods:{
			loadmores(){
				this.$emit('loadmores')
			},
			cancel(id){
				this.$emit('cancel',id)
			},
			goPay(i){
				this.$emit('goPay',i)
			},
			goreturnPay(id){
				this.$emit('goreturnPay',id)
			},
			make(sn){
				this.$emit('make',sn)
			},
			makejump(catId,mgId,name,id){
				this.$emit('makejump',catId,mgId,name,id)
			},
			getordcoms(){
				this.$emit('getordcoms')
			},
			getdetail(id){
				var ids = id
				uni.navigateTo({
					url:`../orderdetail/orderdetail?id=${ids}`
				})
			}
			
		}
	}
</script>

<style>
	::-webkit-scrollbar {
	width: 0;
	height: 0;
	color: transparent;
	display: none;
	}
</style>
