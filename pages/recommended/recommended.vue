<template>
	<view style="width: 100vw;background: #eee;">
		<view>
			<image style="width: 100vw;height: 400upx;" :src="'http://qiniu.1788c.cn/recomend.png'" mode=""></image>
		</view>
		<view class="content">
			<view class="" style="padding: 40upx 0;border-bottom: 1px dashed #c0c0c0;">
				分享好友
			</view>
			<view class="" style="font-size: 12px;color: #C0C0C0;padding: 40upx 0;">
				扫描二维码或复制下载链接推荐给好友
			</view>
			<image :src="'http://qiniu.1788c.cn/recode.png'" style="width: 337upx;height: 337upx;" mode=""></image>
			
			
			<button open-type="share" class="jianbian">
					分享
			</button>
	
		</view>
	</view>	
</template>

<script>
	export default {
		
			  onShareAppMessage(res) {
			    if (res.from === 'button') {// 来自页面内分享按钮
			      console.log(res.target)
			    }
			    return {
			      title: '1788小程序',
			      path: '/pages/focus/focus'
			    }
			  }
	
	}
</script>

<style>
	.content{
		display: flex;
		flex-direction: column;
		align-items: center;
		box-sizing: border-box;
		padding: 20upx;
		background: #fff;
		height: 70vh;
	}
	.jianbian{
		margin-top: 140upx;
		width: 701upx;
		height: 100upx;
		background-image: linear-gradient(to right, #FF6B52 , #FF9455);
		border-radius: 100upx;
		text-align: center;
		line-height: 100upx;
		color: #fff;
	}
</style>
