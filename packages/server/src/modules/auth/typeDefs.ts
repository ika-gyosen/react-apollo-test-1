import { gql } from "apollo-server-express";

export const typedefs = gql`
  type User {
    user: String
  }

  type AuthResult {
    result: User
  }

  type Mutation {
    login(name: String!, password: String!): AuthResult!
  }
`;
