<template>
	<view style="background: #fff;margin-top: 5upx;">
		<view style="display: flex;justify-content: space-between;padding:10upx 20upx;position: relative;
		box-sizing: border-box;">
			<view style="flex: 3;text-align: center;display: flex;flex-direction: column;align-items: center;" v-for="(item,index) in services"
			 :key='index' @click="change(index)">
				<view :class="index !== 0?'rightborder':''" style="width: 100%;text-align: center;">
					<view :class="changeId == index?'coloractive':''" style="font-size: 30upx;">{{item}}</view>
				</view>
				<image style="width: 48upx;height: 4upx;margin-top: 10upx;position: absolute;bottom: 0;" src="../../static/tabchoose1.png"
				 v-if="changeId == index"></image>
			</view>
		</view>
		<view style="width: 100%;height: 5upx;background: #eee;"></view>
		<view v-if="services.length == 3">
			<view v-if="changeId == services.length - 3" style="padding-bottom:160upx;">
				<view style="padding: 20upx;border-bottom: 1upx solid #f6f6f6;" v-for="(item,index) in goodslist" :key="index">
					<view style="display: flex;align-items: center;justify-content: space-between;">
						<view @click="detialTo(item.goodsId)">
							<view style="font-size: 28upx;color: #333;">
								{{item.name}}
							</view>
							<view style="font-size: 24upx;color: #666;">
								已售:{{item.buyCount}}
							</view>
						</view>
						<view style="display: flex;align-items: center;">
							<view style="color: #F56B2D;font-size: 26upx;display: flex;align-items: center;margin-right: 40upx;">
								<view style="display: flex;">
									<view style="color: #F56B2D;font-size: 20upx;display: flex;align-items: center;">
										<view style="margin-top: 6upx;">￥</view>
										<view style="font-size: 36upx;">{{item.price/100}}</view>
									</view>
									<view style="color: #F56B2D;font-size: 22upx;color: #999;margin: 10upx 0 0 10upx;
										display: flex;align-items: center;text-decoration: line-through;">
										<view>￥</view>
										<view>{{item.mktprice/100}}</view>
									</view>
								</view>
							</view>
							<view style="font-size: 24upx;color: #fff;background: #F56B2D;
								width: 80upx;line-height: 36upx;border-radius: 50upx;text-align: center;"
							 @click="Purchase(item.goodsId)">
								购买
							</view>
						</view>
					</view>
				</view>
			</view>
			<view v-if="changeId == services.length - 2" style="padding-bottom: 140upx;">

				<view style="display: flex;width: 100%;justify-content: space-between;box-sizing: border-box;">
					<view style="padding-bottom: 160upx;">
						<view v-for="(item,index) in dataList" id="item.catId" :key="index" @click="gotest(item.catId,index)" style="display: flex;font-size: 26upx;position: relative;">
							<view style="width: 10upx;height: 84upx;position: absolute;left: 0;background: #F66C2D;" v-if="tabbarId == index"></view>
							<view style="width: 172upx;height: 86upx;line-height: 86upx;text-align: center;background: #F3F3F3;" :class="tabbarId == index?'tarbar':''"
							 :id='index'>
								{{item.name}}
							</view>
						</view>
					</view>
					<view style="padding: 0 20upx;flex: 1;padding-bottom: 160upx">
						<view v-for="(item,index) in servicelist" :key='index' @click="detialTo(item.goodsId)">
							<view style="display: flex;padding:  20upx;align-items: center;">
								<image :src="item.thumbnail" style="width: 168upx;height: 168upx;border-radius: 10upx;" mode="aspectFill"></image>
								<view style="margin-left: 20upx;font-size: 24upx;flex: 1;">
									<view style="font-size: 28upx;padding: 5upx 0;">
										{{item.name}}
									</view>
									<view style="padding: 5upx 0;">
										{{item.intro}}
									</view>
									<view style="padding: 5upx 0;">
										销量{{item.buyCount}}笔
									</view>
									<view style="width: 290upx;display: flex;justify-content: space-between;font-size: 22upx;padding: 5upx 0;position: relative;">
										<view style="display: flex;">
											<view style="font-size: 26upx;color: #D60808;">￥{{item.price/100}}</view>
											<view style="font-size: 20upx;color: #999999;text-decoration: line-through;margin-top: 8upx;margin-left: 8upx;">￥{{item.mktprice/100}}</view>
										</view>
										<view style="font-size: 24upx;width: 88upx;position: absolute;
											height: 38upx;color: #fff;text-align: center;top: 5upx;right: 0;
											line-height: 38upx;border-radius: 50upx;background: #F46D2D;margin-left: 20upx;"
										 @click="Purchase(item.goodsId)">购买</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view v-if="changeId == services.length - 1" style="padding-bottom: 130upx;">
				<view style="display: flex;width: 280upx;justify-content: space-between;box-sizing: border-box;margin-top: 20upx;padding: 0 10upx;">
					<view style="padding: 5upx 20upx;background: #eee;border-radius: 100upx;
						font-size: 24upx;" @click="changecom(0)"
					 :class="comId == 0 ?'comactive':''">
						全部({{allcom.total}})
					</view>
					<view style="padding: 5upx 20upx;background: #eee;border-radius: 100upx;
						font-size: 24upx;" @click="changecom(1)"
					 :class="comId == 1 ?'comactive':''">
						有图({{imgcom.total}})
					</view>
				</view>
				<view v-if="comId == 0">
					<view style="padding: 20upx;">
						<view v-for="(item,index) in allcomlist" :key="index" style="border-bottom: 1px solid #EEEEEE;padding: 20upx 0;">
							<view style="display: flex;align-items: center;font-size: 26upx;justify-content: space-between;">
								<view style="display: flex;align-items: center;">
									<image :src="item.uheadimg" style="width: 60upx;height: 60upx;border-radius: 100upx;" mode=""></image>
									<view style="margin-left: 20upx;">
										{{item.commembername}}
									</view>
								</view>
								<view>
									{{item.createTime}}
								</view>
							</view>
							<view>
								<view style="padding: 20upx 0;font-size: 26upx;">
									{{item.comcontent}}
								</view>
								<view style="width: 620upx;display: flex;;flex-wrap: wrap;">
									<view v-for="(ite,inde) in item.imgs" :key="inde">
										<video v-if="ite.type == 1" :src="ite.videourl" style="width: 500upx;height: 300upx;" controls direction="0"
										 @play="provideos('video'+index)" :id="'video'+index"></video>
										<image v-if="ite.type == 0" :src="ite.imgurl" @click="detailsproview(item.imgs,inde)" mode="aspectFill" style="width: 200upx;height: 200upx;padding:5upx 2upx;"></image>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view v-if="comId == 1">
					<view style="padding: 20upx;">
						<view v-for="(item,index) in imgcomlist" :key="index" style="border-bottom: 1px solid #EEEEEE;padding: 20upx 0;">
							<view style="display: flex;align-items: center;font-size: 26upx;justify-content: space-between;">
								<view style="display: flex;align-items: center;">
									<image :src="item.uheadimg" style="width: 60upx;height: 60upx;border-radius: 100upx;" mode=""></image>
									<view style="margin-left: 20upx;">
										{{item.commembername}}
									</view>
								</view>
								<view>
									{{item.createTime}}
								</view>
							</view>
							<view>
								<view style="padding: 20upx 0;font-size: 26upx;">
									{{item.comcontent}}
								</view>
								<view style="width: 620upx;display: flex;flex-wrap: wrap;">
									<view v-for="(ite,inde) in item.imgs" :key="inde">
										<video v-if="ite.type == 1" :src="ite.videourl" controls direction="0" :id="'video'+index" style="width: 500upx;height: 300upx;"
										 @play="provideos('video'+index)"></video>
										<image v-if="ite.type == 0" :src="ite.imgurl" @click="detailsproview(item.imgs,inde)" mode="aspectFill" style="width: 200upx;height: 200upx;padding:5upx 2upx; "></image>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view v-if="services.length == 2">
			<view v-if="changeId == 0 && goodslist.length != 0" style="padding-bottom: 160upx;">
				<view style="padding: 20upx;border-bottom: 1upx solid #f6f6f6;" v-for="(item,index) in goodslist" :key="index">
					<view style="display: flex;align-items: center;justify-content: space-between;">
						<view @click="detialTo(item.goodsId)">
							<view style="font-size: 28upx;color: #333;">
								{{item.name}}
							</view>
							<view style="font-size: 24upx;color: #666;">
								已售:{{item.buyCount}}
							</view>
						</view>
						<view style="display: flex;align-items: center;">
							<view style="color: #F56B2D;font-size: 26upx;display: flex;align-items: center;margin-right: 40upx;">
								<view style="display: flex;">
									<view style="color: #F56B2D;font-size: 20upx;display: flex;align-items: center;">
										<view style="margin-top: 6upx;">￥</view>
										<view style="font-size: 36upx;">{{item.price/100}}</view>
									</view>
									<view style="color: #F56B2D;font-size: 22upx;color: #999;margin: 10upx 0 0 10upx;
										display: flex;align-items: center;text-decoration: line-through;">
										<view>￥</view>
										<view>{{item.mktprice/100}}</view>
									</view>
								</view>
							</view>
							<view style="font-size: 24upx;color: #fff;background: #F56B2D;
								width: 80upx;line-height: 36upx;border-radius: 50upx;text-align: center;"
							 @click="Purchase(item.goodsId)">
								购买
							</view>
						</view>
					</view>
				</view>

			</view>
			<view v-if="changeId == 0 && dataList.length != 0" style="padding-bottom: 140upx;">

				<view style="display: flex;width: 100%;justify-content: space-between;box-sizing: border-box;">
					<view style="padding-bottom: 160upx;">
						<view v-for="(item,index) in dataList" id="item.catId" :key="index" @click="gotest(item.catId,index)" style="display: flex;font-size: 26upx;position: relative;">
							<view style="width: 10upx;height: 84upx;position: absolute;left: 0;background: #F66C2D;" v-if="tabbarId == index"></view>
							<view style="width: 172upx;height: 86upx;line-height: 86upx;text-align: center;background: #F3F3F3;font-size: 22upx;"
							 :class="tabbarId == index?'tarbar':''" :id='index'>
								{{item.name}}
							</view>
						</view>
					</view>
					<view style="padding: 0 20upx;flex: 1;padding-bottom: 160upx;">
						<view v-for="(item,index) in servicelist" :key='index' @click="detialTo(item.goodsId)">
							<view style="display: flex;padding:  20upx;align-items: center;">
								<image :src="item.thumbnail" style="width: 168upx;height: 168upx;border-radius: 10upx;" mode="aspectFill"></image>
								<view style="margin-left: 20upx;font-size: 24upx;flex: 1;">
									<view style="font-size: 28upx;padding: 5upx 0;">
										{{item.name}}
									</view>
									<view style="padding: 5upx 0;">
										{{item.intro}}
									</view>
									<view style="padding: 5upx 0;">
										销量{{item.buyCount}}笔
									</view>
									<view style="width: 290upx;display: flex;justify-content: space-between;font-size: 22upx;padding: 5upx 0;position: relative;">
										<view style="display: flex;">
											<view style="font-size: 26upx;color: #D60808;">￥{{item.price/100}}</view>
											<view style="font-size: 20upx;color: #999999;text-decoration: line-through;margin-top: 8upx;margin-left: 8upx;">￥{{item.mktprice/100}}</view>
										</view>
										<view style="font-size: 24upx;width: 88upx;position: absolute;
											height: 38upx;color: #fff;text-align: center;top: 5upx;right: 0;
											line-height: 38upx;border-radius: 50upx;background: #F46D2D;margin-left: 20upx;"
										 @click="Purchase(item.goodsId)">购买</view>
									</view>
								</view>
							</view>
						</view>
					</view>

				</view>

			</view>
			<view v-if="changeId == 1" style="padding-bottom: 130upx;">
				<view style="display: flex;width: 280upx;justify-content: space-between;box-sizing: border-box;margin-top: 20upx;padding: 0 10upx;">
					<view style="padding: 5upx 20upx;background: #eee;border-radius: 100upx;
						font-size: 24upx;" @click="changecom(0)"
					 :class="comId == 0 ?'comactive':''">
						全部({{allcom.total}})
					</view>
					<view style="padding: 5upx 20upx;background: #eee;border-radius: 100upx;
						font-size: 24upx;" @click="changecom(1)"
					 :class="comId == 1 ?'comactive':''">
						有图({{imgcom.total}})
					</view>
				</view>
				<view v-if="comId == 0">
					<view style="padding: 20upx;">
						<view v-for="(item,index) in allcomlist" :key="index" style="border-bottom: 1px solid #EEEEEE;padding: 20upx 0;">
							<view style="display: flex;align-items: center;font-size: 26upx;justify-content: space-between;">
								<view style="display: flex;align-items: center;">
									<image :src="item.uheadimg" style="width: 60upx;height: 60upx;border-radius: 100upx;" mode=""></image>
									<view style="margin-left: 20upx;">
										{{item.commembername}}
									</view>
								</view>
								<view>
									{{item.createTime}}
								</view>
							</view>
							<view>
								<view style="padding: 20upx 0;font-size: 26upx;">
									{{item.comcontent}}
								</view>
								<view style="width: 620upx;display: flex;;flex-wrap: wrap;">
									<view v-for="(ite,inde) in item.imgs" :key="inde">
										<video v-if="ite.type == 1" :src="ite.videourl" style="width: 500upx;height: 300upx;" controls direction="0"
										 @play="provideos('video'+index)" :id="'video'+index"></video>
										<image v-if="ite.type == 0" :src="ite.imgurl" @click="detailsproview(item.imgs,inde)" mode="aspectFill" style="width: 200upx;height: 200upx;padding:5upx 2upx;"></image>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view v-if="comId == 1">
					<view style="padding: 20upx;">
						<view v-for="(item,index) in imgcomlist" :key="index" style="border-bottom: 1px solid #EEEEEE;padding: 20upx 0;">
							<view style="display: flex;align-items: center;font-size: 26upx;justify-content: space-between;">
								<view style="display: flex;align-items: center;">
									<image :src="item.uheadimg" style="width: 60upx;height: 60upx;border-radius: 100upx;" mode=""></image>
									<view style="margin-left: 20upx;">
										{{item.commembername}}
									</view>
								</view>
								<view>
									{{item.createTime}}
								</view>
							</view>
							<view>
								<view style="padding: 20upx 0;font-size: 26upx;">
									{{item.comcontent}}
								</view>
								<view style="width: 620upx;display: flex;flex-wrap: wrap;">
									<view v-for="(ite,inde) in item.imgs" :key="inde">
										<video v-if="ite.type == 1" :src="ite.videourl" controls direction="0" :id="'video'+index" style="width: 500upx;height: 300upx;"
										 @play="provideos('video'+index)"></video>
										<image v-if="ite.type == 0" :src="ite.imgurl" @click="detailsproview(item.imgs,inde)" mode="aspectFill" style="width: 200upx;height: 200upx;padding:5upx 2upx; "></image>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		name: 'USdetail',
		props: {
			services: {
				type: Array
			},
			changeId: {
				type: Number
			},
			goodslist: {
				type: Array
			},
			dataList: {
				type: Array
			},
			servicelist: {
				type: Array
			}
		},
		data() {
			return {

			}
		}
	}
</script>

<style>
</style>
