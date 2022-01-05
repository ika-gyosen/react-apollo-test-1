import jwt from "jsonwebtoken";
import authCheck from "../../auth/";
export const resolvers = {
  Query: {
    /* @ts-ignore */
    books: (root, args, context, info) => {
      authCheck({ isAuthorized: context.isAuthorized });
      return [
        { title: "book1", author: "author1" },
        { title: "book2", author: "author2" },
      ];
    },
  },
};
