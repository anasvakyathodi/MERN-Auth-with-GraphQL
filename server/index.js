const express = require("express");
const { createServer } = require("http");
const mongoose = require("mongoose");
const cors = require("cors");
const typeDefs = require("./graphql/schema/schema.graphql"); //GraphQL Schema
const resolvers = require("./graphql/resolvers"); //GraphQL resolvers
const { SubscriptionServer } = require("subscriptions-transport-ws");
const { execute, subscribe } = require("graphql");

const { ApolloServer, makeExecutableSchema } = require("apollo-server-express");

const app = express();

//for parsing json body from requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
const port = process.env.PORT || 5000;
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
// Setting graphql middleware

const apolloServer = new ApolloServer({
  schema,
  playground: {
    endpoint: "/graphql",
    subscriptionEndpoint: `ws://localhost:${port}/subscriptions`,
  },
});

// Bind it to port and start listening
apolloServer.applyMiddleware({
  app,
});

const server = createServer(app);

mongoose //connect to db
  .connect("mongodb://localhost:27017/graphql", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("MongoDB Connected!"))
  .catch((err) => console.log(err));

//server listen on port 5000
server.listen({ port }, () => {
  console.log("Server listening on Port 5000");
  new SubscriptionServer(
    {
      schema,
      execute,
      subscribe,
    },
    {
      server,
      path: "/subscriptions",
    }
  );
});
