// pages/login/login.js
let app = getApp()
import Api from '../../api/api'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    entity: {
      account: '',
      password: ''
    }
  },
  changAccount: function (e) {
    let entity = this.data.entity
    entity.account = e.detail.value
    this.setData({
      entity
    })
  },
  changPsd: function (e) {
    let entity = this.data.entity
    entity.password = e.detail.value
    this.setData({
      entity
    })
  },
  goLogin () {
    let self = this
    Api.goLogin(self.data.entity.account, self.data.entity.password, (data)=> {
      console.log('data', data)
      if (data.exist) {
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 2000
        })
        app.globalData.userInfo = data.userInfo
        console.log('app.globalData.userInfo', app.globalData.userInfo)
        wx.setStorage({
          key:"isLogin",
          data:"true"
        })
        wx.setStorage({
          key:"userInfo",
          data: JSON.stringify(data.userInfo)
        })
        wx.redirectTo({
          url: '/pages/index/index'
        })
      } else {
        wx.showToast({
          title: '登录失败',
          icon: 'error',
          duration: 2000
        })
      }      
    }, () => {
      wx.showToast({
        title: '登录失败',
        icon: 'error',
        duration: 2000
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})