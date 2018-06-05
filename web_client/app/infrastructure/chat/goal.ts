import { Exchange } from "./exchange";
import { ExchangeRef } from "./chat";

export class Goal {
  constructor(public exchanges: Exchange[] = []) {}

  getExchange(ref: ExchangeRef) {
    return this.exchanges[ref];
  }
}
