import { Exchange } from './exchange';
import { ChatState } from 'infrastructure/chat/chat';


const exchange = new Exchange([
  "Hello",
  "I am mittens",
  "Another sentence"
], {options: []}, (state, val) => {});

describe("Exchange", () => {
  it("true", () => {
    expect(true);
  })

});
