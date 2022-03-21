import Login from './module/login'
import Essay from './module/essay'
import Plan from './module/plan'

export default {
  ...Login,
  ...Essay,
  ...Plan,
  dealResponse(res, callback, errorback) {
    // console.log('dealResponse',res)
    if (res.success) {
      callback(res.data)
    } else {
      errorback(res)
    }
  }
}