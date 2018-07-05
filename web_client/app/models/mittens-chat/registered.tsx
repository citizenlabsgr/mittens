import * as React from "react";
import { Exchange } from "infrastructure/chat";
import { MittensChat } from "./mittens-chat";

MittensChat.createGoal("registered").exchanges = [
  new Exchange(
    ["Yipp! It looks like you're registered. Good for you!"],
    {
      nextExchange: "notification-signup"
    },
    (state, val) => {
      MittensChat.changeState({
        goalName: "notification-signup",
        exchange: 0
      });
    }
  )
];
