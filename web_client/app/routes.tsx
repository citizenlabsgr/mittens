import * as React from 'react';
import { go, RouteDeclaration, history } from 'router';

// Components
import { Home } from 'home/home';
import { Login } from 'login/login';


import API from './api/api';

// function requireLogin() {
//   if (User.loggedIn()) return;
//   go('/login', { state: { from: history.location } });
// }

function redirect(path: string) {
  return () => {
    go(path);
  }
}

export const routes: RouteDeclaration = {
  path: '/',
  children: [
    { path: 'login', component: Login },
    { path: 'home', component: Home },
  ],
};
