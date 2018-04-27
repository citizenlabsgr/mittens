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
    this.delayNextDialogue();
  }

  @computed
  get currentExchange() {
    return this.goals[this.state.goalName].getExchange(this.state.exchange);
  }

  handleUserInput(text: string, value: any) {
    this.history.push({ person: "user", text: text });
    this.currentExchange.stateFn(this.state, value);
  }

  @action
  incrementDialogue() {
    if (!this.currentExchange.dialogueFinished) {
      this.history.push({ person: "mittens", text: this.currentExchange.nextDialogue() });
    }
  }

  peekDialogue() {
    return this.currentExchange.peekDialogue()
  }

  get dialogueDelay() {
    return Math.min(5000, Math.max(750, 40*this.peekDialogue().length));
  }

  @action
  delayNextDialogue() {
    if (!this.currentExchange.dialogueFinished) {
      setTimeout(this.updateDialogue, this.dialogueDelay);
    } else {
      setTimeout(() => {this.dialogueFinished = true}, 500);
    }
  }

  @action
  updateDialogue = () => {
    this.incrementDialogue();
    this.delayNextDialogue();
  };
}
