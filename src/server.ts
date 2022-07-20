const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { GraphQLSchema } = require("graphql");

const { RootQueryType } = require("./resolvers/queries");
const { RootMutationType } = require("./resolvers/mutations");

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
});
const app = express();
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);
app.listen(5000, () => console.log("server running"));
