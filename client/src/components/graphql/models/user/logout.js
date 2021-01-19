import { gql } from "@apollo/client";
const USER_LOGOUT = gql`
  mutation Logout($token: String) {
    logout(token: $token) {
      message
    }
  }
`;

export default USER_LOGOUT;
