import jwt from "jsonwebtoken";

export const resolvers = {
  Mutation: {
    /*@ts-ignore*/
    login: async (root, { name, password }, context) => {
      const { res } = context;
      if (name === "user" && password === "test") {
        const token = jwt.sign({ user: name }, "test", { expiresIn: "1h" });
        res.cookie("testTokenCookie", token, { httpOnly: true });
        return { result: { user: name } };
      } else {
        return { result: { user: null } };
      }
    },
  },
};
