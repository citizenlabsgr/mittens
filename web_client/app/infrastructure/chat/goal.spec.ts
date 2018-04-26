import { Exchange } from './exchange';
import { ChatState } from 'infrastructure/chat/chat';
import { Goal } from 'infrastructure/chat/goal';


const exchange = new Exchange([], {options: []}, (state, val) => {});
const goal = new Goal([exchange]);

describe("Exchange", () => {
  describe("getExchangeByName", () => {
    it("returns exchange with the given name", () => {
      expect(goal.getExchange(0)).toBe(exchange);
    })
  });
});
