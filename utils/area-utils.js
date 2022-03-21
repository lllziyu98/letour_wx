export default {
  createCascadeList (list) {
    list = JSON.parse(JSON.stringify(list))
    let list1 = []
    let list2 = []
    let list3 = []
    for (let i = 0; i < list.length; i++) {
      if (Number(list[i].level) < 2) {
        let item = {
          value: list[i].area_id,
          label: list[i].area_name
        }
        list1.push(item)
      }
    }
    for (let i = 0; i < list.length; i++) {
      if (Number(list[i].level) === 2) {
        let item = {
          value: list[i].area_id,
          label: list[i].area_name,
          parent_id: list[i].parent_id
        }
        list2.push(item)
      }
    }
    for (let i = 0; i < list.length; i++) {
      if (Number(list[i].level) === 3) {
        let item = {
          value: list[i].area_id,
          label: list[i].area_name,
          parent_id: list[i].parent_id
        }
        list3.push(item)
      }
    }
    for (let i = 0; i < list1.length; i++) {
      for (let j = 0; j < list2.length; j++) {
        for (let n = 0; n < list3.length; n++) {
          if (list3[n].parent_id === list2[j].value) {
            if (typeof list2[j].children === 'undefined') {
              list2[j].children = []
            }
            list2[j].children.push(list3[n])
          }
        }
        if (list2[j].parent_id === list1[i].value) {
          if (typeof list1[i].children === 'undefined') {
            list1[i].children = []
          }
          list1[i].children.push(list2[j])
        }
      }
    }
    return list1
  },
  createList (list) {
    let areaList = []
    list = JSON.parse(JSON.stringify(list))
    for (let i = 0; i < list.length; i++) {
      let item = {
        value: list[i].area_id,
        parent_id: list[i].parent_id,
        level: list[i].level,
        label: list[i].merger_name
      }
      areaList.push(item)
    }
    return areaList
  },
  createLevel2List (list) {
    let areaList = []
    list = JSON.parse(JSON.stringify(list))
    for (let i = 0; i < list.length; i++) {
      if (Number(list[i].level) === 1) {
        let item = {
          value: list[i].area_id,
          label: list[i].area_name,
          children: []
        }
        for (let j = 0; j < list.length; j++) {
          if (Number(list[j].level) === 2 && list[j].parent_id === list[i].area_id) {
            let item2 = {
              value: list[j].area_id,
              label: list[j].area_name
            }
            item.children.push(item2)
          }
        }
        areaList.push(item)
      }
    }
    return areaList
  }
}
