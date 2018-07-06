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
    go('/chat', {}, true)
    return true;
  }
}

function maybeSetChatState(state: string) {
  return () => {
    console.log(MittensChat.state.goalName)
    if (!MittensChat.state.goalName) {
      MittensChat.changeState({ goalName: state, exchange: 0 });
    }
    return false;
  }
}

export const routes: RouteDeclaration = {
  path: '/',
  children: [
    { path: 'waiting', component: SpinnerPage },
    { path: 'chat', preFilter: maybeSetChatState("registration-check"), component: ChatView },
    { path: 'login', preFilter: chatRedirect("email-confirmation"), component: SpinnerPage},
    { path: '/', preFilter: chatRedirect("registration-check"), component: SpinnerPage}
  ],
};
