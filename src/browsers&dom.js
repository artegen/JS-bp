/* eslint-disable no-undef, no-unused-vars */

// events

// cross-browser-compatible custom event
export function emit(evtType, evtData, shouldBubble = false) {
  let evt;
  if (typeof CustomEvent === 'function') {
    evt = new CustomEvent(evtType, {
      detail: evtData,
      bubbles: shouldBubble,
    });
  } else {
    evt = document.createEvent('CustomEvent');
    evt.initCustomEvent(evtType, shouldBubble, false, evtData);
  }
}
// this.root_.dispatchEvent(evt);

// DOM

const header = story =>
  [].forEach.call(document.querySelectorAll('header a'), a => {
    a.classList[
      ~a.getAttribute('href').indexOf(`/${story}`) ? 'add' : 'remove'
    ]('selected');
  });

const main = () => document.querySelector('main');
const fadeIn = value => {
  window.scrollTo(0, 0);
  main().classList.remove('opaque');
  return value;
};
app.get('/:section/:id(\\d+)', ctx => {
  const pathname = (lastClick = document.location.pathname);
  main().classList.add('opaque');
  render.header(ctx.params.section);
  fetch(lastClick + '.json')
    .then(body => body.json())
    .then(data => {
      // avoid races with latest clicked section
      if (lastClick === pathname) {
        document.title = title;
        render.main(
          Promise.all(
            data.items
              .map(render.summary)
              .concat(data.next ? render.next(data) : [])
          ).then(fadeIn)
        );
      }
    });
});

// Web APIs

const url = 'https://www.google.com/search?q=' + encodeURIComponent(text);
