/* eslint-disable no-undef, no-unused-vars */

async function getById(id) {
  try {
    return await localDB.get(id);
  } catch (err) {
    return await remoteDB.get(id);
  }
}

const findVideo = async slug => {
  await fakeDelay(500);
  return videosHash[slug];
};
const fakeDelay = ms => new Promise(res => setTimeout(res, ms));

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

// stop showing tick result after 6 seconds
let counter = 0;
setTimeout(
  clearInterval,
  6000,
  setInterval(counter => console.log(counter++), 1000)
);
