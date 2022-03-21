// pages/plan/plan.js
let app = getApp()
import areaUtils from '../../utils/area-utils'
import utils from '../../utils/util'
import userUtils from '../../utils/user-utils'
import Api from '../../api/api'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    areaList: [],
    entity: {},
  },
  getAreaList() {
    let self = this
    Api.getAreaList('', '', (data) => {
      self.setData({
        areaList: areaUtils.createList(data) || []
      })
      self.getPlanDetail(self)
    }, () => {
      self.setData({
        areaList: []
      })
    })
  },
  getPlanDetail(self) {
    Api.getPlanDetail(self.data.id, (data) => {
      data.cont = JSON.parse(decodeURIComponent(data.cont))
      for (let i = 0; i < data.cont.length; i++) {
        data.cont[i].cont = data.cont[i].cont.replace(/\<img/g, '<img style="width:100%;height:auto;display:block"');
      }
      console.log('getPlanDetail', data)
      self.setData({
        entity: data
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('options', options)
    this.setData({
      id: options.id
    })
    this.getAreaList()
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