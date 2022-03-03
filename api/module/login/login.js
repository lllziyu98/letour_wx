import Util from '../../util'

export default {
  goLogin(account, password, callback, errorback) {
    let self = this
    let url = '/login?account=' + account + '&password=' + password
    let data = {}
    Util.sendGetRequest(url, data, (res) => {
      self.dealResponse(res.data, callback, errorback)
    })
  }
}