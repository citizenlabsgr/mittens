import * as React from 'react';
import { go, RouteDeclaration, history } from 'router';

// Components
import { Login } from 'login/login';
import { RegistrationCheck } from 'registration-check/registration-check';
import { RegistrationVerified } from 'registration-verified/registration-verified';
import { AwaitingConfirmation } from 'awaiting-confirmation/awaiting-confirmation';
import { NotRegistered } from 'not-registered/not-registered';

import API from './api/api';

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
    { path: 'awaiting-confirmation', component: AwaitingConfirmation },
    { path: 'not-registered', component: NotRegistered },
    { path: '/', preFilter: redirect('/registration-check'), component: RegistrationCheck}
  ],
};



