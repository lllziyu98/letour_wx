// index.js
// 获取应用实例
let app = getApp()
import areaUtils from '../../utils/area-utils'
import utils from '../../utils/util'
import Api from '../../api/api'

Page({
  data: {
    base_url: app.globalData.base_url,
    userInfo: {},
    height: 0,
    search: '',
    start: 0,
    limit: 10,
    canLoad: true,
    areaList: [],
    essayList: [],
    utils: {},
    refreshing: false
  },
  goEssayDetail(e) {
    let self = this
    wx.navigateTo({
      url: '/pages/essay/essay?id=' + self.data.essayList[e.currentTarget.dataset.index].id
    })
  },
  changeSearch (e) {
    let search = e.detail.value
    this.setData({
      search
    })
  },
  getAreaList() {
    let self = this
    Api.getAreaList('', '', (data) => {
      self.setData({areaList: areaUtils.createList(data) || []})
      self.goSearch(self)
    }, () => {
      self.setData({areaList: []})
    })
  },
  goSearch(self) {
    this.setData({
      start: 0,
      canLoad: true,
      essayList: []
    })
    this.getEssayList(self)
  },
  reLoad() {
    this.setData({
      start: 0,
      canLoad: true,
      essayList: []
    })
    this.getEssayList(this)
  },
  loadList() {
    this.getEssayList(this)
  },
  getEssayList(tt) {
    let self = tt || this
    if (self.data.canLoad) {
      self.setData({refreshing: true})
      Api.getLoadEssayList(self.data.start, self.data.limit, '', self.data.search, (data) => {
        for (let i = 0; i < data.length; i++) {
          let cont = JSON.parse(decodeURIComponent(data[i].cont))
          cont = cont.replace(/<\/?.+?>/g, "")
          data[i].cont = JSON.parse(decodeURIComponent(encodeURIComponent(JSON.stringify(cont)))),
          data[i].areaName = utils.formatOptions(data[i].area_id, self.data.areaList)
        }
        console.log('getEssayList', data)
        self.setData({
          essayList: self.data.essayList.concat((data || [])),
          start: self.data.start += self.data.limit,
          canLoad: data.length === 0,
          refreshing: false
        })
        console.log('dta', self.data)
      }, () => {
        self.setData({essayList: [], refreshing: false})
      })
    }
  },
  // 事件处理函数
  onLoad() {
    let self = this
    wx.getStorage({
      key: 'isLogin',
      success(res) {
        app.globalData.isLogin = true
        wx.getStorage({
          key: 'userInfo',
          success(res) {
            app.globalData.userInfo = JSON.parse(res.data)
            console.log('app.globalData.userInfo', app.globalData.userInfo)
          }
        })
      },
      fail() {
        console.log('fail')
        app.globalData.isLogin = false
        wx.redirectTo({
          url: '/pages/login/login',
        })
      }
    })
    const query = wx.createSelectorQuery()
    query.select('.l-page-index').boundingClientRect()
    query.select('.index-top').boundingClientRect()
    query.exec((res) => {
      self.setData({height: (res[0].height - res[1].height) || 0})
    })
    self.setData({
      utils: utils
    })
    this.getAreaList()
  }
})