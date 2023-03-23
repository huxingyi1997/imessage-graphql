import { gql } from "@apollo/client";

export const ConverstionOperations = {
  Queries: {},
  Mutations: {
    createConversation: gql`
      mutation CreatConversation($participantIds: [String]!) {
        createConversation(participantIds: $participantIds) {
          conversationId
        }
      }
    `,
  },
};
