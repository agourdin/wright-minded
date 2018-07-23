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

('2018-07-21T20:42:46.976770Z');
('2018-07-22T05:24:00.145100Z');

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

export const renameProp = (
  oldProp,
  newProp,
  { [oldProp]: old, ...others }
) => ({
  [newProp]: old,
  ...others
});

export default {
  flattenObject,
  renameProp
};
