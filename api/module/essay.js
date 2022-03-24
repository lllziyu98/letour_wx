import Util from '../util'

export default {
  getMyEssayList(id, callback, errorback) {
    let self = this
    let url = '/essay/list?userid=' + id
    let data = {}
    Util.sendGetRequest(url, data, (res) => {
      self.dealResponse(res.data, callback, errorback)
    })
  },
  getLoadEssayList(start, limit, area_id, search, callback, errorback) {
    let self = this
    let url = '/essay/load/list?limit=' + limit + '&start=' + start
    if (area_id) {
      url+= '&area_id=' + area_id
    }
    if (search) {
      url+= '&search=' + search
    }
    let data = {}
    Util.sendGetRequest(url, data, (res) => {
      self.dealResponse(res.data, callback, errorback)
    })
  },
  getEssayDetail(id, callback, errorback) {
    let self = this
    let url = '/essay/detail?id=' + id
    let data = {}
    Util.sendGetRequest(url, data, (res) => {
      self.dealResponse(res.data, callback, errorback)
    })
  },
  getEssayCommentList(id, callback, errorback) {
    let self = this
    let url = '/comment/list?essay_id=' + id
    let data = {}
    Util.sendGetRequest(url, data, (res) => {
      self.dealResponse(res.data, callback, errorback)
    })
  },
  pushComment (formData, callback, errorCallback) {
    let self = this
    let url = '/comment/push'
    Util.sendPutRequest(url, formData, (res) => {
      self.dealResponse(res.data, callback, errorback)
    })
  },
  addPageViews(id, callback, errorback) {
    let self = this
    let url = '/essay/add/pageviews?id=' + id
    let data = {}
    Util.sendGetRequest(url, data, (res) => {
      self.dealResponse(res.data, callback, errorback)
    })
  }
}