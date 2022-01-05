import lodash from "lodash";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { authModule, bookModule } from "../modules";

export const schema = makeExecutableSchema({
  resolvers: lodash.merge(authModule.resolvers, bookModule.resolvers),
  typeDefs: [authModule.typedefs, bookModule.typedefs],
});
