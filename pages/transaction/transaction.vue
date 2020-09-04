<template>
	<view style="background: #eee;padding: 20upx 0;margin-bottom: 80upx;">
		<view style="background: #FFFFFF;padding: 20upx;box-sizing: border-box;">
			<view style="margin-top: 20upx;display: flex;justify-content: space-between;align-items: center;font-size: 24upx;">
				<view style="display: flex;align-items: center;">
					<image style="width: 48upx;height: 48upx;border-radius: 100%;"  :src="tranlist.memberImgurl" mode=""></image>
					<view style="margin-left: 10upx;">{{tranlist.memberName}}</view>
				</view>
			</view>
			<view style="padding: 20upx 0;">
				<view style="font-size: 34upx;font-weight: bold;padding: 10upx 0;">
					{{tranlist.title}}
				</view>
				<view style="color: #D60808;font-size: 24upx;padding: 10upx 0;">
					交易价：￥{{tranlist.price}}
				</view>
				<view style="font-size: 28upx;padding: 10upx 0;line-height: 60upx;">
					<view class="">
						{{tranlist.content}}
					</view>
					<p>有意者电话联系：{{tranlist.phone}}（{{tranlist.linkName}}先生）</p>
					
				</view>
			</view>
			<view style="padding: 20upx 0;">
				<view v-for="(item,index) in tranlist.resources"  :key="index">
					<image v-if="item.ttype == 0" style="width: 680upx;height: 420upx;" :src="item.imgUrl"></image>
					<video v-if="item.ttype == 1" style="width: 680upx;height: 420upx;" :src="item.videoUrl"></video>
					<!-- <image v-if="item.ttype == 0" style="width: 680upx;height: 420upx;" :src="item.imgUrl"></image> -->
				</view>
				
			</view>
		</view>
		<view style="background: #FFFFFF;padding: 20upx;box-sizing: border-box;margin-top: 10upx;padding-bottom: 50upx;">
			<view>
				<view style="display: flex;" v-for="(item,index) in commentlist" :key="index">
					<image :src="item.memberImgurl" mode="" style="width: 78upx;height: 78upx;border-radius:100upx ;"></image>
					<view style="flex: 1;padding: 0 30upx;">
						<view style="display: flex;align-items: center;width: 100%;justify-content: space-between;">
							<view>
								<view style="font-size: 28upx;">
									{{item.memberName}}
								</view>
								<view style="font-size: 22upx;margin-top: 10upx;">
									{{item.createTime}}
								</view>
							</view>
							<view class="" style="font-size: 24upx;" @click="getReply(item.tcid,item.memberName)">
								回复
							</view>
						</view>
						<view style="font-size: 24upx;padding: 10upx 0;">
							{{item.content}}
						</view>
						<view style="background: #EEEEEE;padding: 20upx;" v-if="item.childs.length != 0">
							<view v-for="(ite,inde) in item.childs" :key="inde" style="font-size: 24upx;padding: 5upx 0;">
								{{ite.memberName}}回复:{{ite.content}}
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view v-if="pid == 0" style="width: 100%;height: 133upx;position: fixed;bottom: 0;display: flex;justify-content: space-between;
			align-items: center;background: #FFFFFF;padding: 0 30upx;box-sizing: border-box;border-top: 1px solid #EEEEEE;">
			<view style="width: 540upx;height: 52upx;border-radius: 30upx;border: 1px solid #999;display: flex;justify-content: center;">
		
				<input type="text" :value="contant" placeholder="写评论" style="width: 480upx;height: 100%;font-size: 26upx;line-height: 52upx;"
				 @blur="getcontant" />
			</view>
			<view style="width: 88upx;height: 38upx;border-radius: 50upx;font-size: 24upx;
				background: #F66C2D;text-align: center;line-height: 38upx;color: #FFFFFF;"
			 @click="getvalue()">评论</view>
		</view>
		<view v-if="pid != 0" style="width: 100%;height: 133upx;position: fixed;bottom: 0;display: flex;justify-content: space-between;
			align-items: center;background: #FFFFFF;padding: 0 30upx;box-sizing: border-box;border-top: 1px solid #EEEEEE;">
			<view style="width: 540upx;height: 52upx;border-radius: 30upx;border: 1px solid #999;display: flex;justify-content: center;">
				<input type="text" :value="contant" placeholder="写回复" style="width: 480upx;height: 100%;font-size: 26upx;line-height: 52upx;"
				 @blur="getcontant" />
			</view>
			<view style="width: 88upx;height: 38upx;border-radius: 50upx;font-size: 24upx;
				background: #F66C2D;text-align: center;line-height: 38upx;color: #FFFFFF;"
			 @click="getvalue()">回复</view>
		</view>
	</view>
	
</template>

<script>
	var http = require('@/api/token.js')
	export default {
		data(){
			return{
				tranlist:[],
				trancontant:'',
				transationId:0,
				commentlist:[],
				contant:'',
				pid:0,
				tid:0
			}
		},
		onLoad(options) {
			console.log(options.id)
			var tranceId = options.id
			this.transationId = options.id
			http.post(`/app/EsTransaction/findEsTransaction.do?id=${this.transationId}`,{}).then(res => {
				console.log(res)
				this.tranlist = res.data
			})
			this.getcomshow()
		},
		methods:{
			changPid() {
				this.pid = 0
			},
			getvalue() {
				if (this.pid == 0) {
					if (this.contant != '') {
						
						var data = {
							"content": this.contant,
							"tid": this.transationId,
							"pid": 0,
						}
						http.post('/app/EsTransactionComment/addEsTransactionComment.do', data, 'application/x-www-form-urlencoded').then(
							res => {
								console.log(res)
								if (res.code == 1) {
									this.getcomshow()
									this.contant = ''
								}
							})
					}
			
				} else {
					if (this.contant != '') {
						var data = {
							"content": this.contant,
							"pid": this.pid,
							"tid": this.transationId
						}
						http.post('/app/EsTransactionComment/addEsTransactionComment.do', data, 'application/x-www-form-urlencoded').then(
							res => {
								console.log(res)
								if (res.code == 1) {
									this.getcomshow()
									this.contant = ''
								}
							})
					}
			
				}
			
			},
			getcomshow(){
				http.post(`/app/EsTransactionComment/findEsTransactionCommentsByTransationId.do?page=0&rows=0&transationId=${this.transationId}`,{}).then(res =>{
					console.log(res.data.list)//个人交易最外级的评论
					this.commentlist = res.data.list
				})
			},
			getcontant: function(e) {
				
				this.contant = e.detail.value
			},
			getReply(id, name) {
				console.log(id)
				this.pid = id
			},
		}
	}
</script>

<style>
</style>
