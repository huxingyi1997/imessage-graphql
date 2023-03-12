import merge from "lodash.merge";
import { userResolvers } from "./users";

export const resolvers = merge({}, userResolvers);
