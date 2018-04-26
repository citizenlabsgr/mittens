import * as React from "react";
import { Exchange } from "infrastructure/chat";
import { MittensChat } from "./mittens-chat";
import { Voter } from "models/voter/voter";

MittensChat.createGoal("not-registered").exchanges = [
  new Exchange(
    [
      "Hmm! I wasn't able to find you.",
      "Is this information right?",
      () => {
        return Voter.currentUser.firstName;
      }
    ],
    { options: [{ text: "Yes", value: true }, { text: "No", value: false }] },
    (state, val) => {}
  )
];
