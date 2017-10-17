/* eslint-disable no-undef, no-unused-vars */

const flattenedArray = [].concat(...twoDimensionalArray);

function findDuplicates(arr) {
  return arr.reduce((acc, x1, idx1) => {
    if (arr.some((x2, idx2) => idx1 !== idx2 && x1 === x2)) {
      acc.push(idx1);
    }
    return acc;
  }, []);
}

const compact = arr => arr.filter(identity);
const compact2 = arr => arr.filter(Boolean);

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
const map2 = (fn, array) => [].concat.apply([], array.map(fn));

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
const uniq = array =>
  array.filter(
    (value, index, self) => index === self.findIndex(other => other === value)
  );

const uniqBy = (array, iteratee = o => o.id) =>
  array.filter(
    (value, index, self) =>
      index === self.findIndex(other => iteratee(other) === iteratee(value))
  );

const without = (arr, ...values) =>
  arr.filter(el => !values.some(exclude => el === exclude));

const takeUntil = (pred, arr) =>
  arr.reduce((newArr, i) => {
    //takeWhile -> !pred(i)
    if (pred(i)) arr.length = 0;
    else newArr.push(i);
    return newArr;
  }, []);

function breakAtEmptyString(arr) {
  arr.some(function(elem) {
    if (elem.length === 0) {
      return true; // break
    }
    console.log(elem);
    // implicit: return undefined (interpreted as false)
  });
}

const range = (start, end) =>
  Array.from({ length: end - start + 1 }, (x, i) => i + start);

for (const [index, elem] of arr.entries()) {
  console.log(index + '. ' + elem);
}

const config = (() => {
  const args = process.argv.slice(2);
  return args.reduce((result, arg) => {
    const [key, value] = arg.split('=');
    result[key] = value;
    return result;
  }, {});
})();

const [, year, month, day] = /^(\d\d\d\d)-(\d\d)-(\d\d)$/.exec('2999-12-31');

/* eslint-disable */
Array.from([0,,2])
// [ 0, undefined, 2 ]
// That means that you can use Array.from() to create and fill an array:
Array.from(new Array(5), () => 'a')
// [ 'a', 'a', 'a', 'a', 'a' ]
Array.from(new Array(5), (x,i) => i)
// [ 0, 1, 2, 3, 4 ]

[6, -5, 8].find(x => x < 0)
// -5
[6, 5, 8].find(x => x < 0)
// undefined

[6, -5, 8].findIndex(x => x < 0)
// 1
[6, 5, 8].findIndex(x => x < 0)
// -1
// Both find* methods ignore holes

[NaN].indexOf(NaN)
// -1
[NaN].findIndex(y => Object.is(NaN, y))
// 0

Array.from([ 'a', 'b' ].keys())
// [ 0, 1 ]
Array.from([ 'a', 'b' ].values())
// [ 'a', 'b' ]
Array.from([ 'a', 'b' ].entries())
// [ [ 0, 'a' ],
// [ 1, 'b' ] ]

new Array(3, 11, 8)
// [ 3, 11, 8 ]
new Array(3)
// [ , , ]
new Array(3.1)
// RangeError: Invalid array length

['a', 'b', 'c'].fill(7, 1, 2)
// [ 'a', 7, 'c' ]

// deferred execution, try w/o lodash
var assets = [];
var wallet = _(assets)
  .filter(ownedBy('me'))
  .pluck('value')
  .reduce(sum);
fetch('/new/assets').then(function(data) {
  data = data.json();
  assets.push.apply(assets, data); // update assets
  wallet.value(); // returns most up-to-date value
});

// with the lazy evaluation
var result = [];
for (var i = 0; i < source.length; i++) {
  result[i] = func3(func2(func1(source[i])));
}
