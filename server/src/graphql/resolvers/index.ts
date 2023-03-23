import merge from "lodash.merge";
import { conversationResolvers } from "./conversations";
import { userResolvers } from "./users";

export const resolvers = merge({}, userResolvers, conversationResolvers);
