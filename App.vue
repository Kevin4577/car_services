<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		globalData: {
			id: null
		}
	}
</script>

<style>
	/*每个页面公共css */
	/* checkbox的样式修改 */
	uni-checkbox .uni-checkbox-input {
		border-radius: 50% !important;
		color: #ffffff !important;
	}

	uni-checkbox .uni-checkbox-input.uni-checkbox-input-checked {
		color: #fff;
		background: #47AB0F;
	}

	/* .uni-checkbox-input.uni-checkbox-input-checked {
			width: 30upx !important;
			height: 30upx !important;
		} */

	checkbox .wx-checkbox-input {
		border-radius: 50% !important;
		color: #ffffff !important;
		width: 35upx !important;
		height: 35upx !important;
	}

	checkbox .wx-checkbox-input.wx-checkbox-input-checked {
		color: #fff;
		background: #47AB0F;

	}

	/* .wx-checkbox-input.wx-checkbox-input-checked {
			
		} */
		uni-rich-text img{
			max-width: 100% !important;
		}
</style>
