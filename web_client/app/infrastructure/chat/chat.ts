import * as React from "react";
import { Dialogue } from "infrastructure/chat/exchange";
import { Goal } from "infrastructure/chat/goal";
import { computed, action, observable } from "mobx";

export type GoalName = string;

export type ExchangeRef = number;

export interface ChatState {
  goalName: GoalName;
  exchange: ExchangeRef;
}

export class Chat {
  @observable history: { person: string, text: string }[] = [];
  goals: { [id in GoalName]: Goal };
  @observable state: ChatState;
  @observable dialogueFinished: boolean = false;
  @observable dialogueIncoming: boolean = true;

  constructor() {
    this.goals = {};
    this.state = { goalName: Object.keys(this.goals)[0], exchange: 0 };
  }

  createGoal(name: GoalName) {
    this.goals[name] = new Goal();
    return this.goals[name];
  }

  @action
  changeState(state: ChatState) {
    this.state = state;
    this.currentExchange.reset();
    this.dialogueFinished = false;
    this.dialogueIncoming = true;
    this.delayNextDialogue();
  }

  @computed
  get currentExchange() {
    return this.goals[this.state.goalName].getExchange(this.state.exchange);
  }

  @computed
  get inputButtons() {
    return this.currentExchange.userInput.options;
  }

  @computed
  get inputComponent() {
    return this.currentExchange.userInput.component;
  }

  handleUserInput(text: string, value: any) {
    this.history.push({ person: "user", text: text });
    this.currentExchange.stateFn(this.state, value);
  }

  @action
  incrementDialogue() {
    this.history.push({ person: "mittens", text: this.currentExchange.nextDialogue() });
  }

  peekDialogue() {
    return this.currentExchange.peekDialogue()
  }

  currentDialogue() {
    return (this.history[this.history.length - 1] || {text: ""}).text
  }

  get dialogueDelay() {
    return Math.min(5000, Math.max(1000, 50*this.currentDialogue().length));
  }

  @action
  delayNextDialogue() {
    if (!this.currentExchange.dialogueFinished) {
      setTimeout(() => {this.dialogueIncoming = true}, 400);
      setTimeout(this.updateDialogue, this.dialogueDelay);
    } else {
      const nextExchange = this.currentExchange.userInput.nextExchange
      if (nextExchange){
        this.currentExchange.stateFn(this.state, nextExchange);
      }
      setTimeout(() => {this.dialogueFinished = true}, 500);
    }
  }

  @action
  updateDialogue = () => {
    this.incrementDialogue();
    this.dialogueIncoming = false;
    this.delayNextDialogue();
  };
}
