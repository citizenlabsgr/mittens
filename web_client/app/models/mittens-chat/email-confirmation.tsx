import * as React from 'react';
import { Exchange } from "infrastructure/chat";
import { MittensChat } from "./mittens-chat";
import { Signup } from "components/signup/signup";

MittensChat.createGoal("email-confirmation").exchanges = [
  new Exchange(
    [
      "Thanks for confirming your email! I'll be sure to remind you each time it's time to vote.",
      "Bye!"
    ],
    {
    },
    (state, registered) => {

    }
  )
];
