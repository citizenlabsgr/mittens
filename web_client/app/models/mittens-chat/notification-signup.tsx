import * as React from 'react';
import { Exchange } from "infrastructure/chat";
import { MittensChat } from "./mittens-chat";
import { Signup } from "components/signup/signup";

MittensChat.createGoal("notification-signup").exchanges = [
  new Exchange(
    [
      "If you'd like me to remind you about upcoming elections, let me know your email address (I'll keep it secret and safe!)"
    ],
    {
      component: <Signup />
    },
    (state, signedup) => {
      if (signedup) {
        MittensChat.changeState({
          goalName: "signed-up",
          exchange: 0
        });
      } else {
      MittensChat.changeState({
        goalName: "declined-signup",
        exchange: 0
      });
    }
  })
];
