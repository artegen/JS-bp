/* eslint-disable no-undef, no-unused-vars */

// faster object iteration
for (const [key, value] of Object.entries(obj)) {
  // do
}
// with Babel transformed to
for (const key in obj) {
  if (Object.prototype.hasOwnProperty.call(obj, key)) { //safety
    const value = obj[key];
    // do
  }
}
// Only as long as there are no getters or proxies involved, and you don't care about mutation during iteration. http://benediktmeurer.de/2017/09/07/restoring-for-in-peak-performance/

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

// notice, Object.keys() is not fastest, see for..in
const entries = obj => Object.keys(obj).map(key => [key, obj[key]]);
// entries(['foo', 'bar', 'baz']); => [ [0, 'foo'], [1, 'bar'], [2, 'baz'] ]

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

const toMap = (() => {
  const convert = obj => new Map(Object.keys(obj).map(key => [key, obj[key]]));
  return obj => (obj instanceof Map ? obj : convert(obj));
})();

// Checks if an object inherits directly from null (Object.create(null);) or Object.prototype (object literal, {}).
const isPlainObject = value =>
  value &&
  typeof value === 'object' &&
  (value.__proto__ == null || value.__proto__ === Object.prototype);
// Return the [[Class]] of an object in lowercase (eg. array, date, regexp, string etc).
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
// Usually you shouldn't need all this trickery. Ex.:
// val && typeof val === 'object' && !Array.isArray(val) - the input val can be object or array (we need {}'s, not []'s)

Object.getOwnPropertyNames(Number.prototype);
// [ 'toExponential',
//   'toString',
//   'toLocaleString',
//   'toPrecision',
//   'valueOf',
//   'toJSON',
//   'constructor',
//   'toFixed'];
Object.keys(Number.prototype);
// []
// for-in will follow the inheritance chain, but not built-in Object.prototype
// check for property: ('prop' in obj.nested). obj.nested.prop - checks truthiness (of value)

var copy = Object.assign({ __proto__: obj.__proto__ }, obj);
// If you are only interested in an object’s own properties, things become simpler:
var copy2 = Object.assign({}, obj);

const source = {
  value: 'value',
  reference: /reference/,
};
const target = Object.assign({}, source); // it's shallow clone of 1 level
// target === source; // => false
// target.value === source.value; // => true
// target.reference === source.reference; // => true

function findCommonDeps(depTrees) {
  const depSet = new Set();
  // Flatten
  depTrees.forEach(depTree => {
    depTree.forEach(dep => depSet.add(dep));
  });
  // Filter
  return Array.from(depSet).filter(dep =>
    depTrees.every(depTree => depTree.includes(dep))
  );
}

// Object.assign or ...
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
