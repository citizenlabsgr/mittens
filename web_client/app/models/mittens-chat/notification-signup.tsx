import { Exchange } from "infrastructure/chat";
import { MittensChat } from "./mittens-chat";

MittensChat.createGoal("notification-signup").exchanges = [
  new Exchange(
    [
      "[Sign up for notifications]"
    ],
    {},
    (state, val) => {}
  )
];
