import * as React from "react";
import { Exchange } from "infrastructure/chat";
import { MittensChat } from "./mittens-chat";
import { Voter } from "models/voter/voter";
import { RegistrationCheck } from "components/registration-check/registration-check";

MittensChat.createGoal("registration-check").exchanges = [
  new Exchange(
    [
      "Yarf! Hi! I'm Mittens, the Citizen Lab.",
      "I'm just a dog, but I'll do my best to help you vote.",
      "It's your duty! Rrrrff!",
      "Let's check if you're registered to vote.",
      "I'll need a little information about you. (I promise I won't share it with anyone!)"
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
