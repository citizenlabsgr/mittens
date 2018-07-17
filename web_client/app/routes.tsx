import * as React from 'react';
import { go, RouteDeclaration, history } from 'infrastructure/router';
import { Voter } from 'models';

// Components
import { Login } from 'pages/login/login';
import { RegistrationVerified } from 'pages/registration-verified/registration-verified';
import { NotRegistered } from 'pages/not-registered/not-registered';
import { SpinnerPage } from 'pages/spinner-page/spinner-page';

import API from 'infrastructure/api/api';
import { ChatView } from 'pages/chat-view/chat-view';
import { MittensChat } from 'models/mittens-chat/mittens-chat';


function chatRedirect(state: string) {
  return () => {
    MittensChat.changeState({ goalName: state, exchange: 0 });
    return false;
  }
}


export const routes: RouteDeclaration = {
  path: '/',
  children: [
    { path: 'chat', preFilter: chatRedirect("registration-check"), component: ChatView },
    { path: 'login', preFilter: chatRedirect("email-confirmation"), component: ChatView},
    { path: 'unsubscribed', preFilter: chatRedirect("unsubscribed"), component: ChatView},
    { path: '/', preFilter: chatRedirect("registration-check"), component: ChatView}
  ],
};
