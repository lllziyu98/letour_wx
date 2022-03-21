import Login from './module/login'
import Essay from './module/essay'

export default {
  ...Login,
  ...Essay,
  dealResponse(res, callback, errorback) {
    // console.log('dealResponse',res)
    if (res.success) {
      callback(res.data)
    } else {
      errorback(res)
    }
  }
}