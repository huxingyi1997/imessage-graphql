import { gql } from "graphql-tag";

export const messageTypeDefs = gql`
  type Message {
    id: String
    sender: User
    body: String
    createdAt: Date
  }
`;
