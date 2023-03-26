import { gql } from "@apollo/client";

const ConversationFields = `
  conversations {
    id
    participants {
      user {
        id
        username
      }
      hasSeenLatestMessage
    }
    latestMessage {
      id
      sender {
        id
        username
      }
      body
      createdAt
    }
    updatedAt
  }
`;

export const ConverstionOperations = {
  Queries: {
    conversations: gql`
      query Conversations {
        ${ConversationFields}
      }
    `,
  },
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
