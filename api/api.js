import Login from './module/login/login'

export default {
  ...Login,
  dealResponse(res, callback, errorback) {
    // console.log('dealResponse',res)
    if (res.success) {
      callback(res.data)
    } else {
      errorback(res)
    }
  }
}