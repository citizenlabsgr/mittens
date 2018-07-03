import * as React from "react";
import { Exchange } from "infrastructure/chat";
import { MittensChat } from "./mittens-chat";
import { Voter } from "models/voter/voter";
import { RegistrationCheck } from "pages/registration-check/registration-check";

MittensChat.createGoal("registration-check").exchanges = [
  new Exchange(
    [
      "Hi! I'm Mittens, the Citizen Lab.",
      "I'm just a dog, but I'll do my best to help you vote.",
      "It's your duty!",
      "First, let's check if you're registered to vote.",
      "Have you voted in Michigan before?"
    ],
    {
      options: [{ text: "Yes", value: true }, { text: "No", value: false }]
      // TODO text-input affirmative
    },
    (state, votedBefore) => {
      Voter.currentUser.votedBefore = votedBefore;
      MittensChat.changeState({
        goalName: state.goalName,
        exchange: (state.exchange + 1)
      });
    }
  ),

  new Exchange(
    [
      "OK! I can ask the secretary of state if you're already registered",
      "I'll need a little information about you."
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
