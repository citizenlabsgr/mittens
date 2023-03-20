import * as React from 'react';
import { Exchange } from "infrastructure/chat";
import { MittensChat } from "./mittens-chat";
import { Signup } from "components/signup/signup";

MittensChat.createGoal("email-confirmation").exchanges = [
  new Exchange(
    [
      "Thanks for confirming your email! I added you to Ballot Buddies so we'll get a reminder each time there's an election.",
      "If you share this with more hoomans I'd be so happy.",
      "Rrraarf! Bye!"
    ],
    {
    },
    (state, registered) => {

    }
  )
];
