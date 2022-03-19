// index.js
// 获取应用实例
let app = getApp()

Page({
  data: {
    userInfo: {}
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad() {
    wx.getStorage({
      key: 'isLogin',
      success (res) {
        app.globalData.isLogin = true
        wx.getStorage({
          key: 'userInfo',
          success (res) {
            app.globalData.userInfo = JSON.parse(res.data)
            console.log('app.globalData.userInfo', app.globalData.userInfo)
          }
        })
      },
      fail () {
        console.log('fail')
        app.globalData.isLogin = false
        wx.redirectTo({
          url: '/pages/login/login',
        })
      }
    })
  }
})
