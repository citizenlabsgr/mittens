declare const PRODUCTION: boolean;

if (PRODUCTION) {
  var { apiPath, stripeKey, cablePath } = require('../environments/prod');
} else {
  var { apiPath, stripeKey, cablePath } = require('../environments/dev');
}

export {
  apiPath,
  stripeKey,
  cablePath
}