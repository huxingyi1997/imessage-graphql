import merge from "lodash.merge";
import { conversationResolvers } from "./conversations";
import { messageResolvers } from "./messages";
import { scalarResolvers } from "./scalars";
import { userResolvers } from "./users";

export const resolvers = merge(
  {},
  userResolvers,
  conversationResolvers,
  messageResolvers,
  scalarResolvers
);
