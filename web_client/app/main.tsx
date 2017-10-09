import { AppContainer } from 'react-hot-loader';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from 'app-component';

function render() {
  let App = require('app-component').App;
  const container = document.getElementById('container');
  ReactDOM.render(
    <AppContainer>
      <App />
    </AppContainer>,
    container);
}

document.addEventListener("DOMContentLoaded", function(event) {
  render();
});

// Sloppy way to allow module.hot
declare var module: any;

if (module.hot) {
  module.hot.accept('app-component', () => {
    try {
      render()
    } catch (e) {
      console.exception(e);
    }
  });
}
