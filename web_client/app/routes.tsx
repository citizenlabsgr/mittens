import * as React from 'react';
import { go, RouteDeclaration, history } from 'router';
import { Voter } from 'models';

// Components
import { Login } from 'login/login';
import { RegistrationCheck } from 'registration-check/registration-check';
import { RegistrationVerified } from 'registration-verified/registration-verified';
import { AwaitingConfirmation } from 'awaiting-confirmation/awaiting-confirmation';
import { NotRegistered } from 'not-registered/not-registered';
import { SpinnerPage } from 'spinner-page/spinner-page';

import API from './api/api';


function goForUserRegistration(user: Voter) {
  if (user.registered) {
    go('/registration-verified', {}, true)
  } else {
    go('/not-registered', {}, true)
  }
}

function checkLogin() {
  go('waiting', {}, true);
  Voter.fetchMe().then(
    goForUserRegistration
  ).catch(
    () => go('/registration-check', {}, true)
  );
}

function redirect(path: string) {
  return () => {
    go(path, {} , true);
  }
}

function requireLogin() {
  Voter.fetchMe().catch(
    () => go('/login', {}, true)
  );
}

export const routes: RouteDeclaration = {
  path: '/',
  children: [
    { path: 'waiting', component: SpinnerPage },

    { path: 'registration-check', component: RegistrationCheck },

    { path: 'login', component: Login },
    { path: 'awaiting-confirmation', component: AwaitingConfirmation },

    { path: 'registration-verified', preFilter: requireLogin, component: RegistrationVerified },
    { path: 'not-registered', preFilter: requireLogin, component: NotRegistered },
    { path: '/', preFilter: checkLogin, component: RegistrationCheck}
  ],
};



