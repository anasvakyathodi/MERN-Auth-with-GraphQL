const { gql } = require("apollo-server-express");

const schema = gql`
  type Token {
    _id: ID
    token: String
  }
  type User {
    _id: ID!
    email: String!
    password: String!
    name: String!
    tokens: [Token]
    token: String
  }
  type Message {
    message: String
  }
  type Query {
    users: [User!]
  }

  type Mutation {
    createUser(email: String, password: String, name: String): User
    login(email: String, password: String): User
    logout(token: String): Message
  }
`;

module.exports = schema;
