import { gql } from "graphql-tag";

export const userTypeDefs = gql`
  scalar Date

  type User {
    id: String
    username: String
    email: String
    emailVerified: String
    image: String
  }

  type SearchedUser {
    id: String
    username: String
  }

  type Query {
    searchUsers(username: String!): [SearchedUser]
  }

  type Mutation {
    createUsername(username: String!): CreateUsernameResponse
  }

  type CreateUsernameResponse {
    success: Boolean
    error: String
  }
`;
