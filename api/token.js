var constant = require('@/config/constant.js')

function getToken() {
	return uni.getStorageSync('Userdetail').token
}

function getPromise(url, data, contentType, method) {
	// console.log(JSON.stringify(data))
	return new Promise((resolve, reject) => {
		var header = {
			'content-type': contentType,
		};
		if (uni.getStorageSync('Userdetail').token !== '') {
			header = {
				'content-type': contentType,
				'authorization': getToken()
			}
		}
		
		uni.request({
			url: constant.BASE_URL + url,
			method,
			header,
			data,
			success: function(res) {
				if (res.statusCode == 200) {
					if (res.data.code === 1) {
						uni.showLoading({
							title: '加载中'
						})
						setTimeout(function () {
						    uni.hideLoading();
						}, 500)
						resolve(res.data)
						uni.getSetting({
							success(res) {
								
							}
						})
					} else if (res.data.code === 500105) {
						uni.showToast({
						    title: '用户信息已过期,请重新登录',
						    duration: 2000,
							icon:'none'
						});
						uni.setStorageSync('defaultCar',res.data)
						if(uni.getStorageSync("Userdetail")!=""){
							uni.removeStorageSync("Userdetail")
						}
						resolve(res)
					} else {
						resolve(res.data)
					}
				} else {
					reject(res.data.msg)
				}
			},
			fail: function(err) {
				reject()
			}
		})
	}).catch(error => {
		
	})
}
const http = {
	post: function(url, data, contentType = 'application/json') {
		return getPromise(url, data, contentType, 'POST')
	},
	get: function(url, data, contentType = 'application/json') {
		return getPromise(url, data, contentType, 'GET')
	},
}
module.exports = http
