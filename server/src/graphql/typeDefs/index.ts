import { conversationTypeDefs } from "./conversations";
import { messageTypeDefs } from "./messages";
import { userTypeDefs } from "./users";

export const typeDefs = [userTypeDefs, conversationTypeDefs, messageTypeDefs];
