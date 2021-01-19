import { gql } from "@apollo/client";

const USER_REGISTER = gql`
  mutation CreateUser($email: String, $password: String, $name: String) {
    createUser(email: $email, password: $password, name: $name) {
      name
      token
    }
  }
`;

export default USER_REGISTER;
