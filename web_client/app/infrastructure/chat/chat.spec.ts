import { Exchange } from "./exchange";
import { Chat, ChatState } from "./chat";

const chat = new Chat();

const question = new Exchange(
  ["Hello", "I am mittens", "Do you like me?"],
  { options: [] },
  (state, val) => {
    if (val) {
      chat.changeState({goalName: "yay", exchange: 0})
    } else {
      chat.changeState({goalName: "aww", exchange: 0})
    }
  }
);

const yay = new Exchange(
  ["I'm so glad you like me!"],
  { options: [] },
  (state, val) => {}
);

const aww = new Exchange(
  ["That's mean. I don't like you either."],
  { options: [] },
  (state, val) => {}
);

chat.createGoal("MyGoal").exchanges = [question];
chat.createGoal("yay").exchanges = [yay];
chat.createGoal("aww").exchanges = [aww];

describe("Chat", () => {
  beforeEach(() => {
    chat.history = [];
    chat.changeState({ goalName: "MyGoal", exchange: 0 });
  });

  describe("history", () => {
    it("Gains dialogue as time passes", () => {
      expect(chat.history.slice()).toEqual([]);
      chat.incrementDialogue();
      expect(chat.history.slice()).toEqual([{ person: "mittens", text: "Hello" }]);
    });
  });

  describe("handleUserInput", () => {
    it("Changes state by calling exchanges' state fn", () => {
      expect(chat.history.slice()).toEqual([]);
      chat.incrementDialogue();
      chat.incrementDialogue();
      chat.incrementDialogue();
      chat.handleUserInput("Yes", true);
      expect(chat.state.goalName).toEqual("yay");
      chat.incrementDialogue();
      expect(chat.history.slice()).toEqual([
        {person: "mittens", text: "Hello"},
        {person: "mittens", text: "I am mittens"},
        {person: "mittens", text: "Do you like me?"},
        {person: "user", text: "Yes"},
        {person: "mittens", text: "I'm so glad you like me!"}
      ]);
    });

    it("Changes state by calling exchanges' state fn", () => {
      expect(chat.history.slice()).toEqual([]);
      chat.incrementDialogue();
      chat.incrementDialogue();
      chat.incrementDialogue();
      chat.handleUserInput("Nope I don't", false);
      expect(chat.state.goalName).toEqual("aww");
      chat.incrementDialogue();
      expect(chat.history.slice()).toEqual([
        {person: "mittens", text: "Hello"},
        {person: "mittens", text: "I am mittens"},
        {person: "mittens", text: "Do you like me?"},
        {person: "user", text: "Nope I don't"},
        {person: "mittens", text: "That's mean. I don't like you either."}
      ]);
    });
  });
});
