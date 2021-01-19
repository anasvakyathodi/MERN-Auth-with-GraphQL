import { gql } from "@apollo/client";

const POST_MESSAGE = gql`
  mutation sendMessage($user: String, $content: String) {
    postMessage(user: $user, content: $content)
  }
`;

export default POST_MESSAGE;
