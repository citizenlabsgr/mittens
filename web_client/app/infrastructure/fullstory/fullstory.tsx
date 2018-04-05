declare const PRODUCTION: boolean;

declare var window: { FS: any };
var spy: (id: string, o: {}) => void

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