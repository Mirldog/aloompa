const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const app = express();
import { RootQueryType, RootMutationType } from "./resolvers/index";
import { GraphQLSchema } from "graphql";

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);
app.listen(5000, () => console.log("server running"));
