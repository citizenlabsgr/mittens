import { Exchange } from "infrastructure/chat";
import { MittensChat } from "./mittens-chat";

MittensChat.createGoal("registration-help").exchanges = [
  new Exchange(
    [
      "Okay, let's get you registered.",
      "Here's a link to the Secretary of State to get you started:\n"
      + "https://www.michigan.gov/sos/0,4670,7-127-1633_8716_8726_47669---,00.html",
    ],
    {
      nextExchange: "notification-signup"
    },
    (state, val) => {
      MittensChat.changeState({ goalName: val, exchange: 0})
    }
  )
];
