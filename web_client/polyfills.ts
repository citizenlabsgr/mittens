// We use some js tricks that aren't in browsers yet. These
// polyfills put all browsers on the same page.

//

const polyWindow: any = window;

polyWindow.Promise = require('es6-promise-polyfill').Promise;

// Fixes a draftjs issue in IE11 & Edge; draft calls setImmediate, nto
// window.setImmediate, but MS's implementation requires `this` to be window.  
window.setImmediate = window.setImmediate.bind(window);