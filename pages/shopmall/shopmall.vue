<template>
    <view>
        <web-view :webview-styles="webviewStyles" :src='url'>
			<view style="padding: 20upx;">
				暂无信息！
			</view>
		</web-view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                webviewStyles: {
                    progress: {
                        color: '#FF3333'
                    }
                },
				url:''
            }
        },
		onLoad() {
			// this.url = 'https://www.j1788.cn/activeH-5?token=' + uni.getStorageSync('Userdetail').token
			// console.log(this.url)
		}
    }
</script>

<style>

</style>