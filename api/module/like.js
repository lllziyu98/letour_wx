import Util from '../util'

export default {
  getMyLikeList(like, type, callback, errorback) {
    let self = this
    let url = ''
    if (type === 0) {
      url = '/user/like?like=' + like
    } else if (type === 1) {
      url = '/user/like?collect=' + like
    }
    let data = {}
    Util.sendGetRequest(url, data, (res) => {
      self.dealResponse(res.data, callback, errorback)
    })
  }
}