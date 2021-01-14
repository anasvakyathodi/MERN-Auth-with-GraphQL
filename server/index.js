const express = require("express");
const mongoose = require("mongoose");
const typeDefs = require("./graphql/schema"); //GraphQL Schema
const resolvers = require("./graphql/resolvers"); //GraphQL resolvers
const { ApolloServer, makeExecutableSchema } = require("apollo-server-express");
const auth = require("./middlewares/auth");
// const { ApolloServer } = require("apollo-server");
const app = express();

//for parsing json body from requests
app.use(express.json());

// Setting graphql middleware
const server = new ApolloServer({
  schema: makeExecutableSchema({
    typeDefs,
    resolvers,
    playground: {
      endpoint: "/graphql",
    },
  }),
});

server.applyMiddleware({ app });

mongoose //connect to db
  .connect("mongodb://localhost:27017/graphql", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("MongoDB Connected!"))
  .catch((err) => console.log(err));

const port = process.env.PORT || 5000; //server listen on port 5000
app.listen(port, () => console.log("Server listening on Port 5000"));
