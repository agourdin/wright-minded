export const addQueryParams = (url, params) => {
  url += '?';
  for (var param in params) {
    url += param + '=' + params[param] + '&';
  }
  url = url.slice(0, -1);
  return url;
};

export const dateTimeStringToDateString = dt => {
  let str = '';
  let months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];
  let dtarray = dt.split('T')[0].split('-');
  str += months[dtarray[1] * 1 - 1];
  str += ' ' + dtarray[2] + ', ';
  str += dtarray[0];
  return str;
};

export const flattenObject = obj => {
  var toReturn = {};

  for (var i in obj) {
    if (!obj.hasOwnProperty(i)) continue;

    if (typeof obj[i] == 'object') {
      var flatObject = flattenObject(obj[i]);
      for (var x in flatObject) {
        if (!flatObject.hasOwnProperty(x)) continue;

        toReturn[x] = flatObject[x];
      }
    } else {
      toReturn[i] = obj[i];
    }
  }
  return toReturn;
};

export const groupByKeys = (array, f) => {
  var groups = {};
  array.forEach(function(o) {
    var group = JSON.stringify(f(o));
    groups[group] = groups[group] || [];
    groups[group].push(o);
  });
  return Object.keys(groups).map(function(group) {
    return groups[group];
  });
};

export const isEmpty = obj => {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
};

export const objectMap = (object, fn) => {
  let newObject = {};
  for (var key in object) {
    if (object.hasOwnProperty(key)) {
      newObject[key] = fn(object[key]);
    }
  }
  return newObject;
};

export const objectMapToArray = (object, fn) => {
  let arr = [];
  for (var key in object) {
    if (object.hasOwnProperty(key)) {
      arr.push(fn(object[key]));
    }
  }
  return arr;
};

export const removeFromArray = (array, element) => {
  const index = array.indexOf(element);

  if (index !== -1) {
    return array.splice(index, 1);
  }
};

export const renameProp = (
  oldProp,
  newProp,
  { [oldProp]: old, ...others }
) => ({
  [newProp]: old,
  ...others
});

export default {
  addQueryParams,
  dateTimeStringToDateString,
  flattenObject,
  groupByKeys,
  isEmpty,
  objectMap,
  objectMapToArray,
  renameProp
};
