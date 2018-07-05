import * as React from 'react';
import { Exchange } from "infrastructure/chat";
import { MittensChat } from "./mittens-chat";
import { Signup } from "components/signup/signup";

MittensChat.createGoal("declined-signup").exchanges = [
  new Exchange(
    [
      "OK. If you ever change your mind, feel free to come back! Thanks for chatting!",
      "Rrraarf! Bye!"
    ],
    {
    },
    (state, registered) => {

    }
  )
];
