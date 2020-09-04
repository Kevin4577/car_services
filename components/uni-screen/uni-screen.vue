<template>
	<view>
		<view style="display: flex;align-items: center;border-bottom: 1px solid #eee;position: relative;
		font-size: 28upx;position: fixed;top: 0;width: 100%;">
			<view v-for="(item,index) in topchoose" :key="index" style="flex: 3;padding: 15upx 0;background: #fff;
			display: flex;align-items: center;justify-content: center;"
			 :class="index == 1?'borderactive':''" @click="chooseOption(index)">
				<view style="text-align: center;">
					{{item.value}}
				</view>
				<image src="../../static/xiala.png" style="margin-left: 10upx;width: 18upx;height: 10upx" mode=""></image>
			</view>
			<!--  -->
			<view v-if="OptionId == 1" style="position: fixed;width: 100%;height: 100%;top: 65upx">
				<view style="position: absolute;width: 100%;height: 100%;background: #666666;opacity: 0.3;top: 0;">
		
				</view>
				<view style="position: absolute;width: 100%;background: #fff;top: 0;color: #000;border-top: 1px solid #EEEEEE;">
					<view v-for="(item,index) in chooselist" :key="index" @click="getOption(item.name,index)" 
					style="border-bottom: 1px solid #EEEEEE;font-size: 28upx;padding: 20upx 10upx;">
						{{item.name}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"screen",
		props:{
			
		},
		data() {
			return {
				topchoose: [{
						value: '全部地区',
						namelist: [{
								name: '全部地区',
								id: 0
							},
							{
								name: '崇川区',
								id: 320602
							},
							{
								name: '港闸区',
								id: 320611
							},
							{
								name: '开发区',
								id: 320671
							},
							{
								name: '如皋市',
								id: 320682
							},
							{
								name: '如东县',
								id: 320623
							},
							{
								name: '通州区',
								id: 320612
							},
							{
								name: '海门市',
								id: 320684
							},
							{
								name: '海安市',
								id: 320685
							}
						]
					},
					{
						value: '全部门店',
						namelist: [{
								name: '全部门店',
								id: -1
							},
							{
								name: '洗车美容',
								id: 0
							},
							{
								name: '保养店',
								id: 2
							},
							{
								name: '综合门店',
								id: 1
							}
						]
					},
					{
						value: '距离优先',
						namelist: [
							{
								name: '默认排序',
								id: 0,
							},
							{
								name: '距离优先',
								id: 1,
							}
						]
					},
				],
				list:{},
				chooselist: [],
				OptionId: 0,
				Index: 0,
			}
		},
		methods:{
			chooseOption(i){
				if (this.OptionId == 0) {
					this.OptionId = 1
				} else {
					this.OptionId = 0
				}
				this.Index = i
				this.chooselist = this.topchoose[i].namelist
				
			},
			getOption(val,i){
				if (this.Index == 0) {
					if(this.chooselist[i].id !== 0){
						this.areacode = this.chooselist[i].id
					}else{
						this.areacode = ''
					}
				}
				if (this.Index == 1) {
					if(this.chooselist[i].id != 0){
						this.catid = this.chooselist[i].id
					}else{
						this.catid = 0
					}
				}
				if (this.Index == 2) {
					this.sortId = this.chooselist[i].id	
				}
				this.topchoose[this.Index].value = val
				this.OptionId = 0
				this.$emit("getchoose", {
					areacode:this.areacode,
					catid:this.catid,
					sortId:this.sortId
				})
			}
		}
	}
</script>

<style>
</style>
