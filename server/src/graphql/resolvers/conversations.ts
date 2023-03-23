import { GraphQLContext } from "../../util/types";

export const conversationResolvers = {
  Mutation: {
    createConversation: async (
      _: any,
      args: { participantIds: Array<string> },
      context: GraphQLContext
    ) => {
      console.log("INSIDE Create Conversation", args);
    },
  },
};
