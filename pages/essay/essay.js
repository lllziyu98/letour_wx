// pages/essay/essay.js
let app = getApp()
import areaUtils from '../../utils/area-utils'
import utils from '../../utils/util'
import userUtils from '../../utils/user-utils'
import Api from '../../api/api'
const Form = require('../../utils/formData.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    areaList: [],
    entity: {},
    isLike: false,
    isCollect: false,
    isAtten: false,
    essayCommentList: [],
    commont: ''
  },
  changeCommont(e) {
    let commont = e.detail.value
    this.setData({
      commont
    })
  },
  pushCommon() {
    let self = this
    let formData = new Form()
    formData.append("cont", self.data.commont)
    formData.append("time", new Date())
    formData.append("essay_id", self.data.entity.id)
    formData.append("user_id", app.globalData.userInfo.id)
    let data = formData.getData();
    Api.pushComment(data.buffer, (data) => {
      self.setData({commont: ''})
      self.getCommentList(self)
    })
  },
  getAreaList() {
    let self = this
    Api.getAreaList('', '', (data) => {
      self.setData({
        areaList: areaUtils.createList(data) || []
      })
      self.getEssayDetail(self)
      self.getCommentList(self)
      self.addPageViews(self)
    }, () => {
      self.setData({
        areaList: []
      })
    })
  },
  getEssayDetail(self) {
    Api.getEssayDetail(self.data.id, (data) => {
      data.cont = JSON.parse(decodeURIComponent(data.cont))
      data.cont = data.cont.replace(/\<img/g, '<img style="width:100%;height:auto;display:block"');
      data.areaName = utils.formatOptions(data.area_id, self.data.areaList)
      console.log('getEssayDetail', data)
      self.setData({
        entity: data,
        isLike: userUtils.createLikeList(app.globalData.userInfo.like).indexOf(data.id.toString()) > -1,
        isCollect: userUtils.createLikeList(app.globalData.userInfo.collect).indexOf(data.id.toString()) > -1,
        isAtten: userUtils.createLikeList(app.globalData.userInfo.attention).indexOf(data.userid.toString()) > -1
      })
      console.log('data', self.data)
      // self.getCommentList()
      // self.loading = false
    })
  },
  getCommentList(self) {
    Api.getEssayCommentList(self.data.id, (data) => {
      console.log('getEssayCommentList', data)
      self.setData({
        essayCommentList: data || []
      })
    }, () => {
      self.setData({
        essayCommentList: []
      })
    })
  },
  addPageViews(self) {
    Api.addPageViews(self.data.id, ()=> {}, ()=> {})
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