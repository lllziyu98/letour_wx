const reqURL = 'http://localhost:8888'

export default {
  sendGetRequest(url, data, callback) {
    wx.request({
      url: reqURL + url,
      method: 'GET',
      data: data,
      complete(res) {
        // console.log('sendGetRequest--complete', res)
        callback(res)
      }
    })
  }
}