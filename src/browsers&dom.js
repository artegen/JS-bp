/* eslint-disable no-undef, no-unused-vars, react/react-in-jsx-scope, no-unused-expressions */

// events  -----------------------------------------------------------------------------------------
// as soon as possible (deferred behavior)
document.addEventListener('DOMContentLoaded', function() {}, { once: true });

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
//fire it: elm.dispatchEvent(evtType);
// A few more details to keep track for events, refer to module - https://github.com/dgraham/delegated-events

// DOM  --------------------------------------------------------------------------------------------
// You didn't need jQuery for quite some time, http://blissfuljs.com/, http://youmightnotneedjquery.com/, etc.
// Browser quirks are not the huge problem any more, yet a framework can still simplify dom manipulations, batch reads/writes and protect from mistakes of forcing rerendering all nodes.

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
const pathname = (lastClick = document.location.pathname);
main().classList.add('opaque');
fetch(lastClick + '.json')
  .then(body => body.json())
  .then(data => {
    // avoid races with latest clicked section
    if (lastClick === pathname) {
      document.title = title;
      render(data).then(fadeIn);
    }
  });

function closest(el, selector) {
  function getMatchesProperty(HTMLElementPrototype) {
    return ['webkitMatchesSelector', 'msMatchesSelector', 'matches']
      .filter(p => p in HTMLElementPrototype)
      .pop();
  }

  const matchesSelector = getMatchesProperty(HTMLElement.prototype);

  while (el) {
    if (matchesSelector.call(el, selector)) {
      return el;
    } else {
      el = el.parentElement;
    }
  }
  return null;
}

function $$(selector, context) {
  context = context || document;
  var elements = context.querySelectorAll(selector);
  return [].slice.call(elements);
}

function toggleClassMenu() {
  var layout = document.querySelector('.layout');
  if (!layout.classList.contains('app-menu-open')) {
    layout.classList.add('app-menu-open');
  } else {
    layout.classList.remove('app-menu-open');
  }
}
var openMenu = document.querySelector('.menu-icon');
openMenu.addEventListener('click', toggleClassMenu, false);

let color = ['red', 'blue', 'yellow'][Math.round(Math.random() * 2)];

window.console = {
  log: noop,
  error: noop,
};

let names1 = Array.prototype.map.call(spans, s => s.textContent);
let names2 = Array.from(spans, s => s.textContent);

for (const item of NodeList) {
  doSomething(item);
}

// Web APIs  ---------------------------------------------------------------------------------------

const url = 'https://www.google.com/search?q=' + encodeURIComponent(text);

// Chrome dubugging: getEventListeners()

var inIframe = window.top !== window.self;

// not render-blocking
<script type="application/json" id="id">
  {json}
</script>;

;(function loop() {
  counter.value ++
  requestAnimationFrame(loop)
}())
