import * as React from 'react';
import { go, RouteDeclaration, history } from 'router';

// Components
import { Home } from 'home/home';
import { RegistrationVerified } from 'registration-verified/registration-verified';

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
    { path: 'home', component: Home },
    { path: 'registration-verified', component: RegistrationVerified },
    { path: '/', preFilter: redirect('/home'), component: Home}
  ],
};



