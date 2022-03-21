import Util from '../util'

export default {
  getMyEssayList(id, callback, errorback) {
    let self = this
    let url = '/essay/list?userid=' + id
    let data = {}
    Util.sendGetRequest(url, data, (res) => {
      self.dealResponse(res.data, callback, errorback)
    })
  }
}