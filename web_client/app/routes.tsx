import * as React from 'react';
import { go, RouteDeclaration, history } from 'infrastructure/router';
import { Voter } from 'models';

// Components
import { Login } from 'pages/login/login';
import { RegistrationCheck } from 'pages/registration-check/registration-check';
import { RegistrationVerified } from 'pages/registration-verified/registration-verified';
import { AwaitingConfirmation } from 'pages/awaiting-confirmation/awaiting-confirmation';
import { NotRegistered } from 'pages/not-registered/not-registered';
import { SpinnerPage } from 'pages/spinner-page/spinner-page';

import API from 'infrastructure/api/api';
import { ChatView } from 'pages/chat-view/chat-view';


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
    () => {
      console.warn("Unknown user. Redirecting to login.")
      go('/login', {}, true)
    }
  );
}

export const routes: RouteDeclaration = {
  path: '/',
  children: [
    { path: 'waiting', component: SpinnerPage },
    { path: 'chat', component: ChatView },
    { path: 'registration-check', component: RegistrationCheck },

    { path: 'login', component: Login },
    { path: 'awaiting-confirmation', component: AwaitingConfirmation },

    { path: 'registration-verified', preFilter: requireLogin, component: RegistrationVerified },
    { path: 'not-registered', preFilter: requireLogin, component: NotRegistered },
    { path: '/', preFilter: checkLogin, component: RegistrationCheck}
  ],
};



