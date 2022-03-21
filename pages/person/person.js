// pages/person/person.js
const app = getApp()
import utils from '../../utils/util'
import Api from '../../api/api'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    base_url: app.globalData.base_url,
    userInfo: {},
    num: {
      attention: 0,
      collect: 0,
      fan: 0,
      like: 0
    },
    essayList: [],
    planList: [],
    likeList: [],
    collectList: []
  },
  goEssayDetail(e) {
    let self = this
    let type = e.currentTarget.dataset.type
    if (type === 'essay') {
      wx.navigateTo({
        url: '/pages/essay/essay?id=' + self.data.essayList[e.currentTarget.dataset.index].id
      })
    } else if (type === 'plan') {
      wx.navigateTo({
        url: '/pages/plan/plan?id=' + self.data.planList[e.currentTarget.dataset.index].id
      })
    } else if (type === 'collect') {
      wx.navigateTo({
        url: '/pages/essay/essay?id=' + self.data.collectList[e.currentTarget.dataset.index].id
      })
    } else if (type === 'like') {
      wx.navigateTo({
        url: '/pages/essay/essay?id=' + self.data.likeList[e.currentTarget.dataset.index].id
      })
    }
  },
  getMyEssayList() {
    let self = this
    Api.getMyEssayList(app.globalData.userInfo.id, (data) => {
      console.log('getMyEssayList', data)
      self.setData({
        essayList: data || []
      })
      // self.essayList = data || []
    }, () => {
      self.setData({
        essayList: []
      })
      // self.essayList = []
    })
  },
  getMyPlanList() {
    let self = this
    Api.getMyPlanList(app.globalData.userInfo.id, (data) => {
      console.log('getMyPlanList', data)
      self.setData({
        planList: data.list || []
      })
      // self.essayList = data || []
    }, () => {
      self.setData({
        planList: []
      })
      // self.essayList = []
    })
  },
  getMyLikeList() {
    let self = this
    Api.getMyLikeList(app.globalData.userInfo.like, 0, (data) => {
      console.log('getMyLikeList', data)
      self.setData({
        likeList: data || []
      })
      // self.essayList = data || []
    }, () => {
      self.setData({
        likeList: []
      })
      // self.essayList = []
    })
  },
  getMyCollectList() {
    let self = this
    Api.getMyLikeList(app.globalData.userInfo.like, 1, (data) => {
      console.log('getMyCollectList', data)
      self.setData({
        collectList: data || []
      })
      // self.essayList = data || []
    }, () => {
      self.setData({
        collectList: []
      })
      // self.essayList = []
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userInfo: app.globalData.userInfo,
      num: {
        attention: utils.createLikeList(app.globalData.userInfo.attention).length || 0,
        collect: utils.createLikeList(app.globalData.userInfo.collect).length || 0,
        fan: utils.createLikeList(app.globalData.userInfo.fan).length || 0,
        like: utils.createLikeList(app.globalData.userInfo.like).length || 0
      }
    })
    console.log('123', this.data.userInfo)
    this.getMyEssayList()
    this.getMyPlanList()
    this.getMyLikeList()
    this.getMyCollectList()
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