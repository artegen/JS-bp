/* eslint-disable no-undef, no-unused-vars */

// void, void 0 <=> undefined

const once = fn =>
  ((first = true) => () => (first ? ((first = !first), (fn = fn())) : fn))();

const shave = (shave, f) => (...args) => f(...args.slice(0, shave)); // map(shave(1, parseInt), [0, 1.1, 2.2]); // => [0, 1, 2]

const compose = (...fns) => start =>
  fns.reduceRight((state, fn) => fn(state), start);

const pipe = (f, g) => (...args) => g(f(...args));

const pipeline = (...funcs) => value => funcs.reduce((a, b) => b(a), value);
const pipeline2 = fns => fns.reduceRight((f, g) => (...args) => f(g(...args)));

const composeAll = fns => fns.reduce((f, g) => (...args) => f(g(...args)));

const converge = (f, g, h) => (...args) => f(g(...args), h(...args));

const curry = fn => (...args) =>
  args.length >= fn.length
    ? fn(...args)
    : (...otherArgs) => curry(fn)(...args, ...otherArgs);

const curry2 = f => (...a) => (...b) => f(...a, ...b);
// You can use reduce and compose to create curry3,4 and so on.
const curry3 = compose(curry, curry);
const curry4 = reduce(compose, [curry, curry, curry]);
const curryRight = f => (...a) => (...b) => f(...b, ...a);

const prop = curry((key, obj) => obj[key]);
const upperCase = curry(str => str.toUpperCase()); // no need for curry
const formatName = compose(upperCase, prop('name'));
const person = {
  name: 'Tim'
};
console.log(formatName(person));

const partial = (f, ...args) => (...moreArgs) => f(...args, ...moreArgs);

const memoize = fn => {
  let cache = {};
  return (...args) => {
    let n = args[0];
    if (n in cache) {
      console.log('Fetching from cache', n);
      return cache[n];
    } else {
      console.log('Calculating result', n);
      let result = fn(n); // pass ...args if the rest are static
      cache[n] = result;
      return result;
    }
  };
};
const factorial = memoize(x => {
  if (x === 0) {
    return 1;
  } else {
    return x * factorial(x - 1);
  }
});

const not = fn => (...args) => !fn(...args);

const maybe = fn => (...args) => {
  if (args.length < fn.length || args.some(arg => arg == null)) return;
  return fn(...args);
};

const between = (min, max, number) =>
  number < min ? min : number > max ? max : number;

const isNull = x => x == null;
const noop = () => {};
const identity = I => I;
const isTruthy = x => !!x;
const isUnknown = value => value == null;

const putInQuotes = (str = 'Items: 3,2') =>
  replace(/\d+/g, num => `"${num}"`, str); // => Items: "3","2"

// 🔸 math
const signum = n => (n === 0 ? 0 : n > 0 ? 1 : n < 0 ? -1 : NaN);

const min = arr => Math.min(...arr);

const max = arr => Math.max(...arr);
const max2 = (a, b) => (a > b ? a : b); // Same as Math.max – but with a stable number of arguments - works: [3, 6, 9].reduce(Math.max);  // => NaN

const sum = arr => arr.reduce((a, b) => a + b);

const product = arr => arr.reduce((a, b) => a * b);
