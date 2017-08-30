function each(list, callback) {
  if (Array.isArray(list)) {
    for (let i = 0, n = array.length; i < n; i++) {
      let value = list[i]
      callback(value, i, list);
    }
  } else if (typeof list === "object") {
    for(let key in list) {
      let value = list[key]
      callback(value, key, list);
    }
  }

  return list;
}

function map(list, callback) {
  let newList = list
  if (Array.isArray(list)) {
    newList = []

    for (let i = 0, n = array.length; i < n; i++) {
      let value = list[i]
      newList.push(callback(value, i, list));
    }
  } else if (typeof list === "object") {
    newList = {}
    for(let key in list) {
      let value = list[key]
      newList = Object.assign(newList, {[key]: callback(value, key, list)})
    }
  }
  return newList;
}

function reduce(list, callback, initialValue) {
  let acumulator;
  if (Array.isArray(list)) {
    acumulator = initialValue ? initialValue : list[0];
    let i = initialValue ? 0 : 1;

    for (; i < list.length; i++) {
      acumulator = callback(acumulator, list[i], i, list)
    }
  } else if (typeof list === "object") {
    let firstKey = Object.keys(list)[0]
    acumulator = initialValue ? initialValue : list[firstKey]

    for(let key in list) {
      if(key !== firstKey) {
        acumulator = callback(acumulator, list[key], key, list)
      }
    }
  }
  return acumulator
}

function find(list, callback){
  if (Array.isArray(list)) {
    for(let i = 0; i < list.length; i++){
      if (callback(list[i])) {
        return list[i]
      }
    }
  } else if (typeof list === "object") {
    for(let key in list) {
      if (callback(list[key])){
        return list[key]
      }
    }
  }
}

function filter (list, callback) {
  let newList
  if (Array.isArray(list)) {
    newList = []
    for(let i = 0, n = list.length; i < n; i++){
      if (callback(list[i])) {
        newList.push(list[i])
      }
    }
  } else if (typeof list === "object") {
    newList = {}
    for(let key in list) {
      if (callback(list[key])){
        let value = list[key]
        newList = Object.assign(newList, {[key]: value})
      }
    }
  }
  return newList
}

// function sortBy(list, callback) {
//   if (Array.isArray(list)) {
//     for(let i = 0, n = list.length; i < n; i++){
//       callback(list[i])
//     }
//   } else if (typeof list === "object"){
//
//   }
// }


function size(list) {
  if (Array.isArray(list)) {
    return list.length
  } else if (typeof list === "object"){
    return Object.keys(list).length
  }
}

function first(array, n = 1) {
  return array.slice(0, n)
}

function last(array, n = 1) {
  return array.slice(-n)
}

function compact(array) {
  let newArray = []
  let falsy = [false, null, 0, "", undefined, NaN]
  filter(array, element => {
    if (!falsy.includes(element))
    {newArray.push(element)}
  })
    return newArray
}
