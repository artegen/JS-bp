/* eslint-disable no-undef, no-unused-vars */

const range = (start, end) =>
  Array.from({ length: end - start + 1 }, (x, i) => i + start);

for (const [index, elem] of arr.entries()) {
  console.log(index + '. ' + elem);
}

const [, year, month, day] = /^(\d\d\d\d)-(\d\d)-(\d\d)$/.exec('2999-12-31');

const flattenedArray = [].concat(...twoDimensionalArray);

function findDuplicates(arr) {
  return arr.reduce((acc, x1, idx1) => {
    if (arr.some((x2, idx2) => idx1 !== idx2 && x1 === x2)) {
      acc.push(idx1);
    }
    return acc;
  }, []);
}

const config = (() => {
  const args = process.argv.slice(2);
  return args.reduce((result, arg) => {
    const [key, value] = arg.split('=');
    result[key] = value;
    return result;
  }, {});
})();

const compact = arr => arr.filter(identity);
const compact = arr => arr.filter(Boolean);

const contains = (() =>
  Array.prototype.includes
    ? (arr, value) => arr.includes(value)
    : (arr, value) => arr.some(el => el === value))();

const difference = (arr, ...others) => {
  var combined = [].concat(...others);
  return arr.filter(el => !combined.some(exclude => el === exclude));
};

const intersection = (...arrays) =>
  [...Set([].concat(...arrays))].filter(toFind =>
    arrays.every(arr => arr.some(el => el === toFind))
  );

const head = arr => arr[0];

const initial = arr => arr.slice(0, -1);

const last = arr => (arr.slice(-1)[0] = array => array[array.length - 1]);

const drop = (n, array) => array.slice(Math.max(n, 0), Infinity);

const tail = arr => arr.slice(1);

const map = (fn, arr) =>
  arr.reduce((acc, item, index, arr) => {
    return acc.concat(fn(item, index, arr));
  }, []);
const map = (fn, array) => [].concat.apply([], array.map(fn));

const sortedIndex = (arr, value) =>
  [value]
    .concat(arr)
    .sort()
    .indexOf(value);

// array-like objects (objects with a length property and indexed elements - not POJO, [...{}] => typeError, strings - are ok) or
// iterable objects (objects where you can get its elements, such as Map and Set).
const toArray = (() =>
  Array.from ? Array.from : iterable => [].slice.call(iterable))();
const nodesListToArray = obj => {
  // obj === Element
  if (obj.nodeType) {
    return [obj];
  }
  if (Array.isArray(obj)) {
    return obj;
  }
  return [...obj];
};
const castArray = value => (Array.isArray(value) ? value.slice(0) : [value]);

const union = (...arrays) => [...Set([].concat(...arrays))];

const unique = arr => [...Set(arr)];

const without = (arr, ...values) =>
  arr.filter(el => !values.some(exclude => el === exclude));
