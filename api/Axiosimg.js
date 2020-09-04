
function getPromise(url, data, contentType, method) {
	// console.log(JSON.stringify(data))
	return new Promise((resolve, reject) => {
		var header = {
			'content-type': contentType,
		};
		uni.request({
			url: constant.BASE_URL + url,
			method,
			header,
			data,
			success: function(res) {
				resolve(res.data)
			},
			fail: function(err) {
				reject()
			}
		})
	}).catch(error => {
		
	})
}
const ajax = {
	post: function(url, data, contentType = 'application/json') {
		return getPromise(url, data, contentType, 'POST')
	},
	get: function(url, data, contentType = 'application/json') {
		return getPromise(url, data, contentType, 'GET')
	},
}
module.exports = ajax