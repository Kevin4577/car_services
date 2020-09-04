<template>
	<view>
		<view class="no-more-img">
			<image src="/static/noMore_ms.png" mode=""></image>
		</view>
		<view class="no-more-text">
			暂无砍价， 敬请期待！
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
	.no-more-img {
		margin: 262upx auto 30upx;
		width: 450upx;
		height: 304upx;
		image {
			width: 100%;
			height: 100%;
		}
	}
	.no-more-text {
		color: #999999;
		font-size: 30upx;
		margin-top: 30upx;
		text-align: center;
	}
</style>
