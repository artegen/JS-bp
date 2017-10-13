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

// stop showing tick result after 6 seconds
let counter = 0;
setTimeout(
  clearInterval,
  6000,
  setInterval(counter => console.log(counter++), 1000)
);
