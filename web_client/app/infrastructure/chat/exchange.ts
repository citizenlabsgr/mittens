import { observable, computed, action } from "mobx";
import { ChatState } from "infrastructure/chat/chat";


export type Dialogue = string | (() => string) | JSX.Element
export interface UserInput {
  options?: { text: string; value: any }[];
  component?: JSX.Element;
  nextExchange?: string;
  text?: (input: string) => any;
}
export type StateFunction = (state: ChatState, value: any) => ChatState | void;

export class Exchange {
  @observable dialogueIndex = 0;

  constructor(
    public mittensSays: Dialogue[],
    public userInput: UserInput,
    public stateFn: StateFunction
  ) {}

  @action
  reset() {
    this.dialogueIndex = 0;
  }

  @action
  nextDialogue() {
    var ret = this.mittensSays[this.dialogueIndex];
    if (ret instanceof Function) ret = ret();
    this.dialogueIndex += 1;
    return ret;
  }

  peekDialogue() {
    return this.mittensSays[this.dialogueIndex];
  }

  @computed
  get dialogueFinished() {
    return this.mittensSays.length <= this.dialogueIndex;
  }
}
