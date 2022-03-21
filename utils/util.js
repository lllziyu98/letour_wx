export default {
  createLikeList (str) {
    let list = []
    list = str.split('|')
    list = str === '' ? [] : list
    return list
  },
  formatOptions (value, options) {
    let collection = options
    for (let i = 0; i < collection.length; i++) {
      let item = collection[i]
      if (Number(value) === Number(item.value)) {
        return item.label
      }
    }
    return value
  }
}