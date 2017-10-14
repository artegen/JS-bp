/* eslint-disable no-undef, no-unused-vars */

const obj = {
  ...(cond ? { a: 1 } : {}),
  b: 2,
};

const omit = (props, obj) =>
  props.reduce(
    (newObj, val) => (({ [val]: dropped, ...rest }) => rest)(newObj),
    obj
  );

const pick = (properties, object) =>
  Object.assign({}, ...properties.map(key => ({ [key]: object[key] })));

const entries = obj => Object.keys(obj).map(key => [key, obj[key]]);
entries(['foo', 'bar', 'baz']); // => [ [0, 'foo'], [1, 'bar'], [2, 'baz'] ]

function sortByTimeDesc(a, b) {
  return b.time - a.time;
}
function cacheObjToSortedArray(obj) {
  var arr = Object.keys(obj).map(function(id) {
    return obj[id];
  });
  arr.sort(sortByTimeDesc);
  return arr;
}

const findKey = (fn, obj) => Object.keys(obj).find(k => fn(obj[k]));

const getValAtPath = (path, obj) =>
  path.split('.').reduce((acc, current) => acc && acc[current], obj);

const getValues = obj => Object.keys(obj).map(key => obj[key]);

const merge = (() => {
  const extend = Object.assign
    ? Object.assign
    : (target, ...sources) => {
        sources.forEach(source =>
          Object.keys(source).forEach(prop => (target[prop] = source[prop]))
        );
        return target;
      };
  return (...objects) => extend(...objects);
})();

const toMap = (() => {
  const convert = obj => new Map(Object.keys(obj).map(key => [key, obj[key]]));
  return obj => (obj instanceof Map ? obj : convert(obj));
})();

// Checks if an object inherits directly from null or Object.prototype – like an object literal ({...}) does.
const isPlainObject = value =>
  value &&
  typeof value === 'object' &&
  (value.__proto__ == null || value.__proto__ === Object.prototype);
// Return the [[Class]] of an object in lowercase (eg. array, date, regexp, string etc)
// Or give up and use a module, https://github.com/chaijs/type-detect
function getType(value) {
  let type = typeof value;
  //undefined !== 'object'
  if (type === 'object') {
    return value
      ? ({}.toString.call(value).slice(8, -1) || '').toLowerCase()
      : 'null';
  }
  return type;
}
// if (type == 'number' && isNaN(value)) return 'nan';

const source = {
  value: 'value',
  reference: /reference/,
};
const target = Object.assign({}, source); // it's shallow clone of 1 level
// target === source; // => false
// target.value === source.value; // => true
// target.reference === source.reference; // => true
