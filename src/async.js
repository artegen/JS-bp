/* eslint-disable no-undef, no-unused-vars */

function logInOrder(urls) {
  // fetch all the URLs in parallel
  const textPromises = urls.map(url => {
    return fetch(url).then(response => response.text());
  });

  // log them in order
  textPromises.reduce((chain, textPromise) => {
    return chain.then(() => textPromise).then(text => console.log(text));
  }, Promise.resolve());
}
// Or
async function logInOrder(urls) {
  // spawn in parallel
  const textPromises = urls.map(async url => {
    const response = await fetch(url);
    return response.text();
  });

  // await in order
  for (const textPromise of textPromises) {
    console.log(await textPromise);
  }
}

// |--------- dough ---------> |
// |---- sauce ----> |-- cheese ---> |

async function makePizza(sauceType = 'succoso') {
  // Spawn makeDough and makeSauce at "the same time"
  let doughTask = makeDough();
  let sauceTask = makeSauce(sauceType);
  // Wait for both dough and sauce to be done
  let dough = await doughTask;
  let sauce = await sauceTask;
  // consequently spawn makeCheese()
  let cheese = await makeCheese(sauce.selectCheese());

  dough.add(sauce);
  dough.add(cheese);

  return dough;
}

async function makePizza(sauceType = 'succoso') {
  let prepareDough = makeDough();
  let prepareSauce = memoize(async () => makeSauce(sauceType));
  let prepareCheese = memoize(async () => {
    return makeCheese((await prepareSauce()).selectCheese());
  });

  let [dough, sauce, cheese] = await Promise.all([
    prepareDough,
    prepareSauce(),
    prepareCheese(),
  ]);

  dough.add(sauce);
  dough.add(cheese);

  return dough;
}

async function makePizza(sauceType = 'succoso') {
  const makingDough = makeDough();

  const sauce = await makeSauce(sauceType);
  const cheese = await makeCheese(sauce.selectCheese());

  const dough = await makingDough;
  return dough.add(sauce).add(cheese);
}

async function makePizza(sauceType = 'succoso') {
  let [dough, [sauce, cheese]] = await Promise.all([
    makeDough(),
    makeToppings(sauceType),
  ]);
  return dough.add(sauce).add(cheese);
}
async function makeToppings(sauceType) {
  let sauce = await makeSauce(sauceType);
  return [sauce, await makeCheese(sauce)];
}

// rxjs
function makePizza(sauceType = 'succoso') {
  return combineLatest(
    makeDough(),
    makeSauce(sauceType).switchMap(sauce =>
      selectCheese(sauce).map(cheese => ({ cheese, sauce }))
    )
  ).map(([dough, { cheese, sauce }]) => {
    dough.add(sauce);
    dough.add(cheese);
    return dough;
  });
  // .toPromise(); if you want to expose a promise instead
}

async function printOrder(orderId) {
  const order = await fetchOrder(orderId); // Wrap in Promise.resolve
  console.log(order);
}
printOrder(1); // ↓
async function printOrder(orderId = 1) {
  const promise = Promise.resolve(fetchOrder(1));
  return promise.then(order => {
    console.log(order);
    return Promise.resolve(undefined); //implicit return
  });
}

async function findOrCreateOrder(orderId) {
  let order;
  if (await orderExists(orderId)) {
    order = await fetchOrder(orderId);
  } else {
    order = await createOrder();
  }
  return order;
}

async function getById(id) {
  try {
    return await localDB.get(id);
  } catch (err) {
    return await remoteDB.get(id);
  }
}

const findVideo = async slug => {
  await delay(500);
  return videosHash[slug];
};

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const _IMAGE_CACHE = new Map();
function getImage(path) {
  if (_IMAGE_CACHE.has(path)) {
    return Promise.resolve(_IMAGE_CACHE.get(path));
  }

  return new Promise((res, rej) => {
    const img = new Image();
    img.src = path;

    img.onload = function() {
      _IMAGE_CACHE.set(path, { img, width: img.width, height: img.height });

      res(_IMAGE_CACHE.get(path));
    };
  });
}

async function requestWithRetry(url) {
  const MAX_RETRIES = 10;
  for (let i = 0; i <= MAX_RETRIES; i++) {
    try {
      return await request(url);
    } catch (err) {
      const timeout = Math.pow(2, i);
      console.log(err.message, `Attempt ${i}. Retrying in ${timeout} ms`);
      await delay(timeout);
    }
  }
}

// stop showing tick result after 6 seconds
let counter = 0;
setTimeout(
  clearInterval,
  6000,
  setInterval(counter => console.log(counter++), 1000)
);
