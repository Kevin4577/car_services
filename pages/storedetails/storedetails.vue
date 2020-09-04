<template>
	<view style="background: #f4f4f4;box-sizing: border-box;">
		<image style="width: 750upx;height: 400upx;" :src="storedetail.imgurl" mode=""></image>
		<view style="padding: 10upx ;background: #fff;margin-top: -10upx;" v-show="beginId == 1">
			<view style="display: flex;justify-content: space-between;box-sizing: border-box;align-items: flex-end;">
				<view style="">
					<view style="font-size: 32upx;color: #333333;padding: 6upx 0;">
						{{storedetail.sname}}
					</view>
					<view style="display: flex;font-size: 24upx;align-items: center;padding: 6upx 0;">
						<view>
							<text style="color: #666666;">总评分</text>
							<text style="margin-left: 5upx;color: #D60808;">{{storedetail.comScore}}</text>
						</view>
						<view style="margin-left: 20upx;">
							<text style="color: #666666;">总订单</text>
							<text style="margin-left: 5upx;color: #D60808;">{{storedetail.sbuyCount}}</text>
						</view>
					</view>
					<view style="padding: 6upx 0;font-size: 24upx;display: flex;align-items: center;">
						<image style="width: 22upx;height: 28upx;" src="../../static/ding.png" mode=""></image>
						<view style="margin-left: 20upx;">
							{{storedetail.saddress}}
						</view>
					</view>
				</view>
				<view style="flex: 1;padding:0 20upx;display: flex;justify-content: space-between;">
					<view style="flex: 1;height: 60upx;border-right: 1px solid #eee;">

					</view>
					<view style="display: flex;flex-direction: column;align-items: center;margin-left: 30upx;">
						<image style="width: 36upx;height: 36upx;" src="../../static/zhinan.png" mode="" @click="gotostroes(storedetail.gdlat,storedetail.gdlon)"></image>
						<view style="font-size: 24upx;color: #999999;margin-top: 20upx;">
							{{storedetail.kilo}}km
						</view>
					</view>
				</view>
			</view>
			<view style="display: flex;border-top: 1px solid #eee;margin-top: 20upx;">
				<view style="font-size: 22upx;padding: 6upx 0;margin-top: 10upx;" v-for="(item,index) in storedetail.Tags" :key='index'>
					<view style="border: 1px solid #F56B2D;border-radius: 100upx;
					padding: 2upx 10upx;color: #F56B2D;" :class="index !=0 ?'leftactive':''">
						{{item.name}}
					</view>
				</view>
			</view>
		</view>
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
								<view style="font-size: 30upx;color: #333;display: flex;align-items: center;">
									<p>{{item.name}}</p>
									<p v-if="item.isactivity != 0" style="width: 108rpx;height: 28rpx;background:#FFE6DA;text-align: center;color: #F56B2D;
									line-height: 28rpx;font-size: 24rpx;border-radius: 30rpx;margin-left: 20rpx;">
										超值抢购
									</p>
								</view>
								<view style="font-size: 22upx;color: #666;display: flex;">
									<p style="margin-right: 20rpx;">已售:{{item.buyCount}}</p>
									<p v-if="item.isactivity != 0" style="color: #F56B2D;border-left: 1px solid #ccc;padding: 0 20rpx;">
										剩余:{{item.stock_num}}
									</p>
								</view>
							</view>
							<view style="display: flex;align-items: center;">
								<view style="color: #F56B2D;font-size: 26upx;display: flex;align-items: center;margin-right: 40upx;">
									<view style="display: flex;">
										<view style="color: #F56B2D;font-size: 20upx;display: flex;align-items: center;">
											<view style="margin-top: 6upx;">￥</view>
											<view style="font-size: 36upx;">{{item.price/100}}</view>
										</view>
										<view v-if="item.isactivity == 0" style="color: #F56B2D;font-size: 22upx;color: #999;margin: 10upx 0 0 10upx;
											display: flex;align-items: center;text-decoration: line-through;">
											<view>￥</view>
											<view>{{item.mktprice/100}}</view>
										</view>
									</view>
								</view>
								<view v-if="item.stock_num >= 0" style="font-size: 24upx;color: #fff;background: #F56B2D;
									width: 80upx;line-height: 36upx;border-radius: 50upx;text-align: center;"
								 @click="Purchase(item.goodsId,item.buy)">
									购买
								</view>
								<view v-if="ite.stock_num == 0 && ite.isactivity != 0" style="font-size: 20upx;color: #ccc;background: #efefef;
									width: 80upx;line-height: 36upx;border-radius: 50upx;text-align: center;">
									已售完
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
											 @click="Purchase(item.goodsId,item.buy)">购买</view>
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
											<image v-if="ite.type == 0" :src="ite.imgurl" @click="detailsproview(item.imgs,inde)" mode="aspectFill"
											 style="width: 200upx;height: 200upx;padding:5upx 2upx;"></image>
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
											<image v-if="ite.type == 0" :src="ite.imgurl" @click="detailsproview(item.imgs,inde)" mode="aspectFill"
											 style="width: 200upx;height: 200upx;padding:5upx 2upx; "></image>
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
								<view style="font-size: 30upx;color: #333;display: flex;align-items: center;">
									<p>{{item.name}}</p>
									<p v-if="item.isactivity != 0" style="width: 108rpx;height: 28rpx;background:#FFE6DA;text-align: center;color: #F56B2D;
									line-height: 28rpx;font-size: 24rpx;border-radius: 30rpx;margin-left: 20rpx;">
										超值抢购
									</p>
								</view>
								<view style="font-size: 24upx;color: #666;display:flex;">
									<p style="margin-right: 20rpx;">已售:{{item.buyCount}}</p>
									<p v-if="item.isactivity != 0" style="color: #F56B2D;border-left: 1px solid #ccc;padding: 0 20rpx;">
										剩余:{{item.stock_num}}
									</p>
								</view>
							</view>
							<view style="display: flex;align-items: center;">
								<view style="color: #F56B2D;font-size: 26upx;display: flex;align-items: center;margin-right: 40upx;">
									<view style="display: flex;">
										<view style="color: #F56B2D;font-size: 20upx;display: flex;align-items: center;">
											<view style="margin-top: 6upx;">￥</view>
											<view style="font-size: 36upx;">{{item.price/100}}</view>
										</view>
										<view v-if="item.isactivity == 0" style="color: #F56B2D;font-size: 22upx;color: #999;margin: 10upx 0 0 10upx;
											display: flex;align-items: center;text-decoration: line-through;">
											<view>￥</view>
											<view>{{item.mktprice/100}}</view>
										</view>
									</view>
								</view>
								<view v-if="item.stock_num >= 0" style="font-size: 24upx;color: #fff;background: #F56B2D;
									width: 80upx;line-height: 36upx;border-radius: 50upx;text-align: center;"
								 @click="Purchase(item.goodsId,item.buy)">
									购买
								</view>
								<view v-if="ite.stock_num == 0 && ite.isactivity != 0" style="font-size: 20upx;color: #ccc;background: #efefef;
									width: 80upx;line-height: 36upx;border-radius: 50upx;text-align: center;">
									已售完
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
											 @click="Purchase(item.goodsId,item.buy)">购买</view>
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
											<image v-if="ite.type == 0" :src="ite.imgurl" @click="detailsproview(item.imgs,inde)" mode="aspectFill"
											 style="width: 200upx;height: 200upx;padding:5upx 2upx;"></image>
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
											<image v-if="ite.type == 0" :src="ite.imgurl" @click="detailsproview(item.imgs,inde)" mode="aspectFill"
											 style="width: 200upx;height: 200upx;padding:5upx 2upx; "></image>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>

		</view>


		<view style="display: flex;justify-content: space-between;box-sizing: border-box;align-items: center;
		background: #FFFFFF;padding: 20upx ;position: fixed;width: 100%;bottom: 0;box-shadow: 0 -2upx 5upx #F3F3F3 ;">
			<view>
				<button open-type="contact" style="background: #fff;
				justify-content: space-between;align-items: center;box-sizing: border-box;
				font-size: 20upx;text-align: center;margin-top: 10upx;border: none;display: flex;flex-direction: column;">
					<image style="width: 30upx;height: 30upx;" src="../../static/12.png" mode=""></image>
					<view>客服咨询</view>
				</button>
			</view>
			<view style="display: flex;">
				<view style="text-align: right;margin-right: 20upx;" v-if="maintainId == 1">
					<view style="display: flex;align-items: center;">
						<p style="color: #D60808;font-size: 20upx;">门店保养价：</p>
						<p style="color: #D60808;font-size: 20upx;">￥</p>
						<p style="color: #D60808;font-size: 32upx;margin-top: -10upx;">{{saveprice/100}}</p>
					</view>
					<view style="font-size: 20upx;color: #666666;">
						常规保养——{{maintainCar.modelCatName}}{{maintainCar.modelName}}
					</view>
				</view>
				<view style="height: 64upx;width: 218upx;background: #F56B2D;border-radius: 100upx;
				line-height: 64upx;text-align: center;color: #fff;font-size: 30upx;display: flex;justify-content: center;align-items: center;"
				 @click="goback()">
					<view v-if="maintainId == 1">去保养</view>
					<view v-if="maintainId == 0">去登录</view>
					<image style="width: 14upx;height: 24upx;margin-left: 10upx;" src="../../static/mores.png" mode=""></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	const http = require('@/api/token.js')
	const QQMapWX = require('../../qqsdk/qqmap-wx-jssdk.js')
	export default {
		data() {
			return {
				beginId: 0,
				changeId: 1,
				activeId: 0,
				calcId: 0,
				tabbarId: 0,
				totalPrice: 0,
				storedetail: [],
				dataList: {},
				goodslist: {},
				goodsId: 0,
				comId: 0,
				allcom: [],
				allcomlist: [],
				imgcom: [],
				imgcomlist: [],
				AllimgAndvideo: [],
				imgAndvideo: [],
				storesId: 0,
				allcomPage: false,
				imgcomPage: false,
				allpageNum: 0,
				imgpageNum: 0,
				videoIds: [],
				servicelist: [],
				services: ['洗车美容', '服务', '评价'],
				maintainCar: '',
				saveprice: '',
				maintainId: 0,
				vehicleId: 0,
				memberId:0,
				defaultId: 0,
			}
		},
		onReachBottom() {
			if (this.allcomPage != true) {
				var page = this.allpageNum + 1
				this.getallcom(page)
			} else {
				uni.showToast({
					title: '我也是有底线的',
					duration: 2000,
					icon: 'none'
				})
			}
			if (this.imgcomPage != true) {
				var page = this.imgpageNum + 1
				this.getimgcom(page)
			} else {
				uni.showToast({
					title: '我也是有底线的',
					duration: 2000,
					icon: 'none'
				})
			}
		},
		onShareAppMessage() {},
		onshow() {
			this.getsaveprice()
		},
		onLoad(options) {
			if(uni.getStorageSync('Userdetail').uid != undefined){
				this.memberId = uni.getStorageSync('Userdetail').uid
			}else{
				this.memberId = 0
			}
			var _this = this
			setTimeout(function() {
				_this.beginId = 1
			}, 900);
			console.log(options.id);
			this.storesId = options.id
			// this.storesdeloc()
			this.getstoredata()
			this.calcId = Number(options.index)
			this.changeId = Number(options.index)
			this.getlistinfo()
			this.getallcom(1)
			this.getimgcom(1)
			this.getsaveprice()
			this.comId = 0
			
		},
		methods: {
			getsaveprice() {
				http.post('/app/carmember/findDefaultCarMember.do', {}).then(res => {
					console.log(res);
					if (res.data.code == 500105) {
						this.maintainId = 0
					} else {
						this.maintainId = 1
						this.maintainCar = res.data
						this.vehicleId = this.maintainCar.vehicleId
						this.defaultId = this.maintainCar.id
						http.post(`/app/carMaintainCat/findMaintainItemsByVehicleId.do?vehicleId=${this.vehicleId}`, {}).then(res => {

							var list = res.data.slice(0, 1)
							list.forEach(r => {
								r.mcprice = null
								r.items.forEach(e => {
									e.price = null
									e.goods.forEach(s => {
										e.price += s.count * s.mgprice
										s.price = s.count * s.mgprice
									})
									r.mcprice += e.price
								})
							})
							// console.log(list)
							this.saveprice = list[0].mcprice
						})
					}
				})
			},
			getlistinfo() {
				//新的接口
				http.post(`/app/EsGoodsCat/findGoodsCatsWithoutWashAndUpLookByStoreId.do?storeId=${this.storesId}`, {}).then(
					res => {
						console.log(res)
						this.dataList = res.data
						var len = this.dataList.length
						if (len == 0) {
							this.services = ['洗车美容', '评价']
						} else {
							this.gotest(this.dataList[0].catId, 0)
						}
					})
				//新接口
				http.post(`/app/goods/findWashAndUpLookByStoreId.do?storeId=${this.storesId}&memberId=${this.memberId}`, {}).then(res => {
					console.log(res)
					this.goodslist = res.data
					var len = this.goodslist.length
					if (len == 0) {
						this.services = ['服务', '评价']
					}
				})
			},
			getallcom(pag) {
				//全部评论
				var page = pag
				http.post(
					`/app/comment/findCommentByStoreIdWithPage.do?page=${page}&rows=10&storeId=${this.storesId}&type=-1`
				).then(res => {
					console.log(res)
					this.allcomPage = res.data.isLastPage
					this.allpageNum = res.data.pageNum
					this.allcom = res.data
					if (page == 1) {
						this.allcomlist = res.data.list
						this.allcomlist.forEach((r) => {
							if (r.commembername == null) {
								r.commembername = '1788用户'
							}
							if (r.resources != null) {
								r.imgs = JSON.parse(r.resources)
							} else {
								r.imgs = null
							}
						})
						// console.log(this.allcomlist);
					} else {
						this.allcomlist = this.allcomlist.concat(res.data.list)
						this.allcomlist.forEach((r) => {
							if (r.resources != null) {
								r.imgs = JSON.parse(r.resources)
							} else {
								r.imgs = null
							}
						})
					}
				})
			},
			getimgcom(pag) {
				var page = pag
				//有图的评论
				http.post(
					`/app/comment/findCommentByStoreIdWithPage.do?page=${page}&rows=10&storeId=${this.storesId}&type=3`
				).then(res => {
					this.imgcomPage = res.data.isLastPage
					this.imgcom = res.data
					this.imgpageNum = res.data.pageNum
					if (page == 1) {
						this.imgcomlist = res.data.list
						this.imgcomlist.forEach((r) => {
							if (r.commembername == null) {
								r.commembername = '1788用户'
							}
							r.imgs = JSON.parse(r.resources)
						})
					} else {
						this.imgcomlist = this.imgcomlist.concat(res.data.list)
						this.imgcomlist.forEach((r) => {
							r.imgs = JSON.parse(r.resources)
						})
					}

				})
			},
			detailsproview(img, i) {
				var imgList = []
				var imgs = img
				imgs.forEach((r) => {
					imgList.push(r.imgurl)
				})
				var myindex = i;
				console.log(myindex)
				uni.previewImage({
					current: myindex,
					urls: imgList
				})
			},
			storesdeloc() {
				let _this = this;
				return new Promise((resolve) => {
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
									uni.setStorageSync('location', res.result.location)
									uni.setStorageSync('area', res.result)
									resolve(uni.getStorageSync('location'))
								}
							})
						}
					})
				})
			},
			getstoredata() {
				if (uni.getStorageSync('location').lat != undefined && uni.getStorageSync('location').lng != undefined) {
					var lat = uni.getStorageSync('location').lat
					var lon = uni.getStorageSync('location').lng
				} else {
					this.storesdeloc().then(res => {
						console.log(res)
						var lat = res.lat
						var lon = res.lng
					})
				}
				http.post(`/app/EsStore/findStoreByIdWithDistance.do?lat=${lat}&lon=${lon}&storeId=${this.storesId}`, {}).then(res => {
					console.log(res)
					if (res.data != null) {
						this.storedetail = res.data
						this.storedetail.kilo = ((this.storedetail.distance) / 1000).toFixed(2)
						// uni.setStorageSync('stores', this.storedetail)
						if (this.storedetail.sbuyCount == null) {
							this.storedetail.sbuyCount = 0
						}
						if (this.storedetail.comScore == null) {
							this.storedetail.comScore = 0
						}
						if (this.storedetail != []) {
							this.storedetail.Tags = JSON.parse(this.storedetail.tags)

						} else {
							this.storedetail.Tags = []
						}
					} else {
						uni.showToast({
							title: '暂无数据',
							duration: 2000,
							icon: "none"
						})
					}


				})
			},
			gotostroes(la, lo) {
				var lat = la
				var lon = lo
				console.log(la, lo)
				uni.openLocation({
					latitude: lat,
					longitude: lon,
					success: function(res) {
						console.log(res);
					}
				})
			},
			goback() {
				if (uni.getStorageSync('Userdetail').token != undefined) {
					if (this.maintainId == 0) {
						uni.navigateTo({
							url: '../carlist/carlist'
						})
					}
					if (this.maintainId == 1) {
						uni.navigateTo({
							url: `../maintain/maintain?id=${this.storesId}&ids=${this.defaultId}`
						})
					}
				} else {
					uni.redirectTo({
						url: '../login/login'
					})
				}
			},
			gotest(id, index) {
				this.tabbarId = index
				//选择的门店有哪些商品
				// let state = this.dataList[index].state
				var catId = id
				http.post(`/app/goods/findGoodsWithPageByCatId.do?catId=${catId}&storeId=${this.storesId}`, {}).then(res => {
					console.log(res)
					this.servicelist = res.data
				})
			},
			Purchase(id, ib) {
				var isbuy = ib
				if (uni.getStorageSync('Userdetail').token != undefined) {
					if (isbuy) {
						uni.showToast({
							title: '同类活动您已参加过!',
							duration: 2000,
							icon: "none"
						})
					} else {
						var ids = id
						uni.navigateTo({
							url: `../confirmation/confirmation?id=${ids}`
						})
					}
				} else {
					uni.navigateTo({
						url: '../login/login'
					})
				}

			},
			change(index) {
				this.changeId = index
			},
			gotochange(index) {
				this.activeId = index
			},
			changecom(i) {
				this.comId = i
			},
			detialTo(id) {
				var ids = id
				uni.navigateTo({
					url: `../productdetails/productdetails?id=${ids}`
				})
			},
			provideos(id) {
				var ids = id
				var that = this
				if (ids != '') {
					this.videoIds.push(ids)
				}
				var array = [];
				for (var i = 0; i < this.videoIds.length; i++) {
					if (array.indexOf(this.videoIds[i]) === -1) {
						array.push(this.videoIds[i])
					}
				}
				for (var i = 0; i < array.length; i++) {
					if (ids == array[i]) {

					} else {
						var videoContext = uni.createVideoContext(array[i], that);
						videoContext.pause();
					}
				}
			}
		}
	}
</script>

<style>
	.active {
		color: #F56B2D;
	}

	.rightborder {
		border-left: 1px solid #ccc
	}

	.coloractive {
		color: #F56B2D !important;
	}

	.leftactive {
		margin-left: 10upx;
	}

	.showpad {
		padding-bottom: 0upx !important;
	}

	.tarbar {
		background: #fff !important;
		border-bottom: 1px solid #eee;
	}

	.comactive {
		color: #F66C2D !important;
	}

	button::after {
		border: none;
	}
</style>
