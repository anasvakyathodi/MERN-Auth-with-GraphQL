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
  type LogoutResponse {
    message: String
  }

  type Message {
    id: ID!
    user: String!
    content: String!
  }

  type Query {
    users: [User!]
    messages: [Message!]
  }

  type Mutation {
    createUser(email: String, password: String, name: String): User
    login(email: String, password: String): User
    logout(token: String): LogoutResponse
    postMessage(user: String, content: String): ID!
  }

  type Subscription {
    messages: [Message!]
  }
`;

module.exports = schema;
