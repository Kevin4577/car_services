<template>
	<view>
		<view v-if="total != 0" style="padding: 20upx;box-sizing: border-box;">
			<view style="font-size: 26upx;overflow: hidden;">
				<view style="float: right;" @click="getediter()">
					编辑
				</view>
			</view>
			<checkbox-group @change="getdetail">
				<view v-for="(item,index) in collactelist" :key="index"  
				style="font-size: 26upx;color: #666;padding:30upx 20upx;border-bottom: 1px solid #eee;">
					<view style="display: flex;align-items: center;">
						<view :id='index' @click="getclick(index)" v-if="editerId == 1">
							<checkbox :value="item.id" :checked="item.checked" />
						</view>
						<view @click="getToInfo(item.cobjId)">{{item.ctitle}}</view>
					</view>
				</view>
			</checkbox-group>
		</view>
		<!--  -->
		<view style="position: fixed;bottom: 0;border-top: 1px solid #eee;width: 100%;font-size: 28upx;padding: 20upx;
		display: flex;justify-content: space-between;box-sizing: border-box;" v-if="editerId == 1 && total != 0">
			<checkbox-group>
				<checkbox :value="value" :checked="checked" @click="getalldetail()">
					全选
				</checkbox>
			</checkbox-group>
			<view style="color: #fff;background: #F56B2D;font-size: 28upx;padding: 10upx 20upx;border-radius: 100upx;" @click="alldele()">
				取消收藏
			</view>
		</view>
	</view>
</template>

<script>
	var http = require('@/api/token.js')
	export default {
		data() {
			return {
				collactelist: [],
				total: 0,
				checklength: 0,
				checked: false,
				editerId:0
			}
		},
		onShow() {
			this.getcollaction()
		},
		onLoad() {
			this.getcollaction()
		},
		methods: {
			getdetail: function(e) {
				console.log()
				this.checklength = e.detail.value.length
				if(this.checklength == this.total){
					this.checked = true
				}else{
					this.checked = false
				}
			},
			getclick(i) {
				this.collactelist[i].checked = !this.collactelist[i].checked
			},
			getalldetail() {
				if (this.checked == false) {
					this.checked = true
					this.collactelist.forEach((r) => {
						r.checked = true
					})
				} else {
					this.checked = false
					if (this.checked == false) {
						this.collactelist.forEach((r) => {
							r.checked = false
						})
					}
				}

			},
			alldele() {
				var delelist = this.collactelist.filter((r) => {
					return r.checked == true
				})
				console.log(delelist)
				http.post(`/app/EsCollection/deleteEsCollections.do`, delelist).then(res => {
					console.log(res)
					this.getcollaction()
					this.editerId = 0
				})
			},
			getcollaction() {
				http.post('/app/my/getMyCollections.do?page=1&rows=10', {}).then(res => {
					this.total = res.data.total
					this.collactelist = res.data.list
					console.log(this.collactelist)
				})
			},
			getediter(){
				this.editerId = !this.editerId
			},
			getToInfo(id) {
				var ids = id
				uni.navigateTo({
					url: `../Informationdetails/Informationdetails?id=${ids}`
				})
			},
		}
	}
</script>

<style>
</style>
