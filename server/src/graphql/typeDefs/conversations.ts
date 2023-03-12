import { gql } from "graphql-tag";

export const ypeDefs = gql`
  scalar Date

  type User {
    id: String
    username: String
  }

  type Query {
    searchUsers(username: String!): [User]
  }

  type Mutation {
    createUsername(username: String!): CreateUsernameResponse
  }

  type CreateUsernameResponse {
    success: Boolean
    error: String
  }
`;
