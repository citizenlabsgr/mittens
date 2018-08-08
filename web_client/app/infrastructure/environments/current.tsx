declare const PRODUCTION: boolean;

if (PRODUCTION) {
  var { apiPath } = require('../environments/prod');
} else {
  var { apiPath } = require('../environments/dev');
}

var michiganElectionsApiPath = "https://michiganelections.io/api/";

export {
  apiPath,
  michiganElectionsApiPath
}