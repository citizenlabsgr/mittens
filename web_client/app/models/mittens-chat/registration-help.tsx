import * as React from 'react';
import { Exchange } from "infrastructure/chat";
import { MittensChat } from "./mittens-chat";

MittensChat.createGoal("registration-help").exchanges = [
  new Exchange(
    [
      "Okay, you'd better register to vote.",
      "You can register at a voter registration event, or using this guide from secretary of state:",
      <a target="_blank" href="https://www.michigan.gov/sos/0,4670,7-127-1633_8716_8726_47669---,00.html">Registration guide</a>
    ],
    {
      nextExchange: "notification-signup"
    },
    (state, val) => {
      MittensChat.changeState({ goalName: val, exchange: 0})
    }
  )
];
