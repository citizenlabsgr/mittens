declare const PRODUCTION: boolean;

declare var window: { FS: any };
var spy: (id: string, o: {}) => void

// TODO maybe doit for some users, for a discount, or sommat
console.log("OK", PRODUCTION)
if (PRODUCTION) {
  require('./fullstory-snippet.js');

  spy = (id: string, object: {} = {}) => {
    window.FS.identify(id, object);
  }
} else {
  spy = (id: string, object: {} = {}) => {
    return
  }
}

export const spyOnUser = spy;