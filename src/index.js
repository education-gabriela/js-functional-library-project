function each(list, callback) {
    if (Array.isArray(list)) {
        for (let i = 0, n = list.length; i < n; i++) {
            let value = list[i];
            callback(value, i, list);
        }
    } else if (typeof list === "object") {
        for (let key in list) {
            let value = list[key];
            callback(value, key, list);
        }
    }

    return list;
}

function map(list, callback) {
    let newList = list;
    if (Array.isArray(list)) {
        newList = [];

        for (let i = 0, n = list.length; i < n; i++) {
            let value = list[i]
            newList.push(callback(value, i, list));
        }
    } else if (typeof list === "object") {
        newList = {};
        for (let key in list) {
            let value = list[key];
            newList = Object.assign(newList, {[key]: callback(value, key, list)});
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
            acumulator = callback(acumulator, list[i], i, list);
        }
    } else if (typeof list === "object") {
        let firstKey = Object.keys(list)[0]
        acumulator = initialValue ? initialValue : list[firstKey];

        for (let key in list) {
            if (key !== firstKey) {
                acumulator = callback(acumulator, list[key], key, list);
            }
        }
    }
    return acumulator
}

function find(list, callback) {
    if (Array.isArray(list)) {
        for (let i = 0; i < list.length; i++) {
            if (callback(list[i])) {
                return list[i];
            }
        }
    } else if (typeof list === "object") {
        for (let key in list) {
            if (callback(list[key])) {
                return list[key];
            }
        }
    }
}

function filter(list, callback) {
    let newList;
    if (Array.isArray(list)) {
        newList = [];
        for (let i = 0, n = list.length; i < n; i++) {
            if (callback(list[i])) {
                newList.push(list[i]);
            }
        }
    } else if (typeof list === "object") {
        newList = {};
        for (let key in list) {
            if (callback(list[key])) {
                let value = list[key]
                newList = Object.assign(newList, {[key]: value});
            }
        }
    }
    return newList
}

function size(list) {
    if (Array.isArray(list)) {
        return list.length;
    } else if (typeof list === "object") {
        return Object.keys(list).length;
    }
}

function first(array, n = 1) {
    return array.slice(0, n)
}

function last(array, n = 1) {
    return array.slice(-n)
}

function compact(array) {
    let newArray = [];
    let falsy = [false, null, 0, "", undefined, NaN];
    filter(array, element => {
        if (!falsy.includes(element)) {
            newArray.push(element);
        }
    });
    return newArray;
}

function uniq(list, isSorted) {
    let newArray = [];
    if (isSorted) {
        let lastElement = list[0];
        newArray.push(lastElement);
        for (i = 1; i < list.length; i++) {
            let element = list[i];
            if (element !== lastElement) {
                newArray.push(element);
                lastElement = element;
            }
        }
    } else {
        for (i = 0; i < list.length; i++) {
            let element = list[i];
            if (!newArray.includes(element)) {
                newArray.push(element);
            }
        }
    }
    return newArray;
}

function keys(object) {
    let arrayOfKeys = [];
    for (let key in object) {
        arrayOfKeys.push(key);
    }
    return arrayOfKeys;
}

function values(object) {
    let arrayOfValues = [];
    for (let key in object) {
        arrayOfValues.push(object[key]);
    }
    return arrayOfValues;
}

function sortArrayBy(list, callback) {
    let listToBeSorted = map(list, callback);
    let size = list.length;
    let newList = list.slice(0);
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < (size - i - 1); j++) {
            if (listToBeSorted[j] > listToBeSorted[j + 1]) {

                let item = newList[j];
                let sorted = listToBeSorted[j];
                newList[j] = newList[j + 1];
                newList[j + 1] = item;
                listToBeSorted[j] = listToBeSorted[j + 1];
                listToBeSorted[j + 1] = sorted;
            }
        }
    }

    return newList;
}

function sortObjectBy(arrayObject, key) {
    let newObjectArray = [];
    let listToBeSorted = sortBy(map(arrayObject, element => element[key]), item => item);
    each(listToBeSorted, keyValue => {
        each(arrayObject, object => {
            if(object[key] === keyValue) {
                newObjectArray.push(object);
            }
        });
    });
    return newObjectArray;
}

function sortBy(list, callback) {
    let firstElement = list[0];
    if(typeof firstElement === "object") {
        return sortObjectBy(list, callback);
    } else {
        return sortArrayBy(list, callback)
    }
}

let fi = (function () {
    return {
        each: each,
        map: map,
        reduce: reduce,
        find: find,
        filter: filter,
        sortBy: sortBy,
        size: size,
        first: first,
        last: last,
        compact: compact,
        uniq: uniq,
        keys: keys,
        values: values,
        functions: functions
    }
})()

function functions(module) {
    return keys(module);
}
