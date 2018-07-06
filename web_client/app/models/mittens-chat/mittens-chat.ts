import { Chat } from "infrastructure/chat";
export const MittensChat = new Chat()


require("./registration-check");
require("./registration-double-check");
require("./registration-help");
require("./not-registered");
require("./registered");
require("./notification-signup");
require("./signed-up");
require("./declined-signup");

