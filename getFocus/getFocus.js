const http = require('@/api/token.js')
const QQMapWX = require('@/qqsdk/qqmap-wx-jssdk.js');

function getuserinfo() {
	let _this = this;
	uni.authorize({
		scope: 'scope.userLocation',
		success() {
			uni.getLocation({
				type: 'gcj02',
				success: function(res) {
					// console.log(res)
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
							getFstore()
						},
					})
				},
				fail() {
					uni.showModal({
						title: '',
						content: '请在系统设置中打开定位服务来获取门店信息',
						confirmText: '确定',
					})
				}
			})
		},
	})
} //获取地理位置信息

function getFstore() {
	return new Promise((resolve)=>{
		var lat1 = uni.getStorageSync('location').lat
		var lng1 = uni.getStorageSync('location').lng
		var city = uni.getStorageSync('area').ad_info.city
		var storelist
		http.post(`/app/EsStore/findRecomendStores.do?lat=${lat1}&lon=${lng1}`, {}).then(res => {
			storelist = res.data
			storelist.forEach((r) => {
				if (r.comNumber == null) {
					r.comNumber = 0
				}
				if (r.comScore == null) {
					r.comScore = 0
				}
				r.kilo = ((r.distance) / 1000).toFixed(2)
		
				if (r.tags != null) {
					r.Tags = JSON.parse(r.tags)
				} else {
					r.Tags = null
				}
			})
			var data = {
				"storelist":storelist,
				"city":city
			}
			resolve(data)
		})
		
	})
}

function getbanner() {
	return new Promise((resolve, reject) => {
		http.get('/app/AaBanner/findAaBannerBytype.do', {
			type: 0
		}).then(res => {
			resolve(res)
		})
	})

} //获取首页banner

function getfocusInfo() {
	return new Promise((resolve, reject) => {
		http.post('/app/information/findHotQzInformationList.do?page=1&rows=5', {}).then(res => {

			var infolist = res.data.list //资讯信息
			infolist.forEach((item) => {
				if (item.resources != []) {
					item.resimg = JSON.parse(item.resources)
				} else {
					item.resimg = []
				}
				// console.log(item.resimg.length)
			})
			resolve(infolist)
		})
	})
}

function getfocusgoods() {
	return new Promise((resolve, reject) => {
		http.post('/app/hdCat/findHdCats', {}).then(res => {
			resolve(res)
		})
	})
}

function getoursmodel() {
	return new Promise((resolve) => {
		uni.getSystemInfo({
			success: function(res) {
				resolve(res)
			}
		})
	})
}

function getsearch() {
	uni.scanCode({
		onlyFromCamera: true,
		scanType: 'qrCode',
		success: function(res) {
			// var result = res.result
			var data = {}
			data.code = res.result
			http.post('/app/AaCode/findByCode.do', data, 'application/x-www-form-urlencoded').then(res => {
				console.log(res)
				if (res.code == 1) {
					uni.navigateTo({
						url: "../counterfeit/counterfeit"
					})
				} else {
					uni.showToast({
						title: "非正品产品",
						duration: 2000,
						icon: 'none'
					})
				}
			})
		}
	})
}
export {
	getuserinfo, //位置
	getbanner, //首页banner
	getfocusInfo, //首页资讯
	getfocusgoods, //首页活动H5的图标
	getoursmodel, //首页获取手机型号
	getsearch,//首页扫码
	getFstore
}
