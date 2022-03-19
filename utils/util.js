export default {
  createLikeList (str) {
    let list = []
    list = str.split('|')
    list = str === '' ? [] : list
    return list
  }
}