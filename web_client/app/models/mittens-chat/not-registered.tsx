import { Exchange } from "infrastructure/chat";
import { MittensChat } from "./mittens-chat";
import { Voter } from "models/voter/voter";

MittensChat.createGoal("not-registered").exchanges = [
  new Exchange(
    [
      "Hmm! I wasn't able to find you.",
      "Is this information correct? Did you use your legal name?",
      () => {
        return Voter.currentUser.registrationInputData();
      }
    ],
    { options: [{ text: "Yes", value: true }, { text: "No", value: false }] },
    (state, informationIsCorrect) => {
      if (informationIsCorrect){
        MittensChat.changeState({ goalName: "registration-help", exchange: 0})
      }
      else {
        MittensChat.changeState({ goalName: "registration-double-check", exchange: 0 });
      }
    }
  )
];
