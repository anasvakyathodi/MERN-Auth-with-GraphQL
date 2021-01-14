import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Container } from "@material-ui/core";
import Header from "./Layout/Header";
import { makeStyles } from "@material-ui/core/styles";
import { useMutation, gql } from "@apollo/client";
const USER_LOGOUT = gql`
  mutation Logout($token: String) {
    logout(token: $token) {
      message
    }
  }
`;

const useStyles = makeStyles({
  root: {
    padding: "0",
  },
});
const Home = ({ token, user }) => {
  const history = useHistory();
  const [logout] = useMutation(USER_LOGOUT);
  const classes = useStyles();

  const handleLogout = () => {
    logout({ variables: { token } })
      .then((data) => {
        console.log(data);
        localStorage.removeItem("auth-token");
        localStorage.removeItem("auth-name");
        history.replace("/login");
        alert("Successfully Logged Out!");
      })
      .catch((err) => {
        alert("An Error Occured!");
        console.log(err);
      });
  };

  useEffect(() => {
    const cachedToken = localStorage.getItem("auth-token");
    if (!cachedToken) {
      return history.push("/login");
    }
  }, [history]);

  return (
    <Container maxWidth="xl" className={classes.root}>
      <Header name={user} logout={handleLogout} />
    </Container>
  );
};

export default Home;
