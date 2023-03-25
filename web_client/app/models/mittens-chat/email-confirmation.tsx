import * as React from 'react';
import { Exchange } from "infrastructure/chat";
import { MittensChat } from "./mittens-chat";
import { Signup } from "components/signup/signup";

MittensChat.createGoal("email-confirmation").exchanges = [
  new Exchange(
    [
      <span>Thanks for confirming your email! I added you to <a href="https://app.michiganelections.io">Ballot Buddies</a> so we'll get a reminder each time there's an election.</span>,
      "If you share this with more hoomans I'd be so happy.",
      "Rrraarf! Bye!"
    ],
    {
    },
    (state, registered) => {

    }
  )
];
