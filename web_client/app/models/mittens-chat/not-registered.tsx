import { Exchange } from "infrastructure/chat";
import { MittensChat } from "./mittens-chat";
import { Voter } from "models/voter/voter";

MittensChat.createGoal("not-registered").exchanges = [
  new Exchange(
    [
      "Hmm! I wasn't able to find you.",
      "Is this information right?",
      () => {
        return Voter.currentUser.registrationInputData();
      }
    ],
    { options: [{ text: "Yes", value: true }, { text: "No", value: false }] },
    (state, informationIsCorrect) => {
      if (informationIsCorrect){
        console.log("Registration information is correct")
      }
      else {
        MittensChat.changeState({ goalName: "checkRegistrationAgain", exchange: 0 });
      }
    }
  )
];
