import { gql } from "graphql-tag";

export const conversationTypeDefs = gql`
  type Mutation {
    createConversation(participantIds: [String]): CreateConversationResponse
  }

  type CreateConversationResponse {
    conversationId: String
  }
`;
