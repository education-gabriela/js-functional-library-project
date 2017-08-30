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
