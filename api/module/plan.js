import Util from '../util'

export default {
  getMyPlanList(id, callback, errorback) {
    let self = this
    let url = '/plan/list?userid=' + id
    let data = {}
    Util.sendGetRequest(url, data, (res) => {
      self.dealResponse(res.data, callback, errorback)
    })
  },
  getPlanDetail(id, callback, errorback) {
    let self = this
    let url = '/plan/detail?id=' + id
    let data = {}
    Util.sendGetRequest(url, data, (res) => {
      self.dealResponse(res.data, callback, errorback)
    })
  },
}