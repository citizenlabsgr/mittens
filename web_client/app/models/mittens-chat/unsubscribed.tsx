import * as React from 'react';
import { Exchange } from "infrastructure/chat";
import { MittensChat } from "./mittens-chat";

MittensChat.createGoal("unsubscribed").exchanges = [
  new Exchange(
    [
      "OK. You've been unsubscribed, and will recieve no futher emails.",
    ],
    {
    },
    (state, registered) => {

    }
  )
];
