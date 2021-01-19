import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Container } from "@material-ui/core";
import Header from "./Layout/Header";
import Chat from "./Chat";
import ChatInput from "./ChatInput";
import { makeStyles } from "@material-ui/core/styles";
import { useMutation } from "@apollo/client";
import { USER_LOGOUT } from "./graphql/models";

const useStyles = makeStyles({
  root: {
    padding: "0",
  },
});
const Home = ({ token, user, setAlert }) => {
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
        setAlert({ state: true, message: "Successfully Logged Out!" });
      })
      .catch((err) => {
        setAlert({ state: true, message: "An Error Occured!" });
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
      <Chat />
      <ChatInput {...{ setAlert, user }} />
    </Container>
  );
};

export default Home;
