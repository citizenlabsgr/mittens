import * as React from "react";
import { Exchange } from "infrastructure/chat";
import { MittensChat } from "./mittens-chat";
import { RegistrationCheck } from "components/registration-check/registration-check";

MittensChat.createGoal("registration-double-check").exchanges = [
  new Exchange(
    [
      "OK! Please edit the form, and we'll check again"
    ],
    {
      component: <RegistrationCheck />
    },
    (state, registered) => {
      if (registered) {
        MittensChat.changeState({
          goalName: "registered",
          exchange: 0
        });
      } else {
        MittensChat.changeState({
          goalName: "not-registered",
          exchange: 0
        });
      }
    }
  )
];
