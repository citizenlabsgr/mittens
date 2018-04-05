// We use some js tricks that aren't in browsers yet. These
// polyfills put all browsers on the same page.

const polyWindow: any = window;

polyWindow.Promise = require('es6-promise-polyfill').Promise;
