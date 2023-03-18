import * as React from 'react';
import { Exchange } from "infrastructure/chat";
import { MittensChat } from "./mittens-chat";
import { Signup } from "components/signup/signup";

MittensChat.createGoal("signed-up").exchanges = [
  new Exchange(
    [
      "Great! I just sent you an email with a confirmation link.",
      "Rrraarf! Bye!"
    ],
    {
    },
    (state, registered) => {

    }
  )
];
