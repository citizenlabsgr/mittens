import * as React from 'react';
import { go, RouteDeclaration, history } from 'router';

// Components
import { Login } from 'home/login';
import { RegistrationCheck } from 'registration-check/registration-check';
import { RegistrationVerified } from 'registration-verified/registration-verified';
import { NotRegistered } from 'not-registered/not-registered';

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
    { path: 'registration-check', component: RegistrationCheck },
    { path: 'registration-verified', component: RegistrationVerified },
    { path: 'not-registered', component: NotRegistered },
    { path: '/', preFilter: redirect('/registration-check'), component: RegistrationCheck}
  ],
};



