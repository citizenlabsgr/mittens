declare const PRODUCTION: boolean;

if (PRODUCTION) {
  var { apiPath } = require('../environments/prod');
} else {
  var { apiPath } = require('../environments/dev');
}

export {
  apiPath
}