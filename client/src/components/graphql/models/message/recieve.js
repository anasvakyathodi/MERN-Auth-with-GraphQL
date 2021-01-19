import { gql } from "@apollo/client";

const GET_MESSAGES = gql`
  subscription {
    messages {
      id
      user
      content
    }
  }
`;

export default GET_MESSAGES;
