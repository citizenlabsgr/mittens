import * as React from 'react';
import { Exchange } from "infrastructure/chat";
import { MittensChat } from "./mittens-chat";
import { Signup } from "components/signup/signup";

MittensChat.createGoal("signed-up").exchanges = [
  new Exchange(
    [
      "Great! I'll try to let you know when you've got an election coming. Thanks for chatting!",
      "Rrraarf! Bye!"
    ],
    {
    },
    (state, registered) => {

    }
  )
];
