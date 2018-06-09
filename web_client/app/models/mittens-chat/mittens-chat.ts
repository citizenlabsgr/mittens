import { Chat } from "infrastructure/chat";
export const MittensChat = new Chat()


require("./registration-check");
require("./registration-double-check");
require("./not-registered");
require("./registered");
