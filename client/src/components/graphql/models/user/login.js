import { gql } from "@apollo/client";
const USER_LOGIN = gql`
  mutation Login($email: String, $password: String) {
    login(email: $email, password: $password) {
      name
      token
    }
  }
`;

export default USER_LOGIN;
