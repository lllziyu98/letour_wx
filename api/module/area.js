import Util from '../util'

export default {
  getAreaList(area_id, level, callback, errorback) {
    let self = this
    let url = '/area'
    if (area_id && level) {
      url += '?area_id=' + area_id + '&level=' + level
    }
    let data = {}
    Util.sendGetRequest(url, data, (res) => {
      self.dealResponse(res.data, callback, errorback)
    })
  }
}