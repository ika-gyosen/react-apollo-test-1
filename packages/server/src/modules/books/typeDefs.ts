import { gql } from "apollo-server-express";

export const typedefs = gql`
  type Book {
    title: String
    author: String
  }

  type Query {
    books: [Book]
  }
`;
