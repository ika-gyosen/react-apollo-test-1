import express from "express";
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import http from "http";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { schema } from "./schema";

async function startApolloServer(schema: any) {
  const app = express();
  app.use(cookieParser());
  const httpServer = http.createServer(app);
  const corsOption = {
    origin: "http://localhost:3000",
    credentials: true,
  };

  const server = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    context: ({ req, res }) => {
      const token = (req.cookies.testTokenCookie as string) || "";
      let isAuthorized = true;
      let decodedToken = null;
      jwt.verify(token, "test", (err: any, decoded: any) => {
        decodedToken = decoded;
        if (err instanceof jwt.TokenExpiredError) {
          console.error("有効期限切れ");
          isAuthorized = false;
        } else if (err instanceof jwt.JsonWebTokenError) {
          console.error("トークンが不正です。", err);
          isAuthorized = false;
        }
      });

      return { req, res, isAuthorized, decodedToken };
    },
  });
  await server.start();
  server.applyMiddleware({ app, cors: corsOption });
  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve)
  );
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

startApolloServer(schema);
