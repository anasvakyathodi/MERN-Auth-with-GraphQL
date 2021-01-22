import React, { useState } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import "./styles/styles.scss";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Notification from "./components/Notification";
const link = new WebSocketLink({
  uri: "ws://localhost:5000/subscriptions",
  options: {
    reconnect: true,
  },
});

const client = new ApolloClient({
  link,
  uri: "http://localhost:5000/graphql",
  cache: new InMemoryCache(),
});

const App = () => {
  const [userData, setUserData] = useState({
    token: localStorage.getItem("auth-token"),
    user: localStorage.getItem("auth-name"),
  });
  const initialState = { state: false, message: "" };
  const [alert, setAlert] = useState(initialState);
  const handleClose = () => {
    setAlert({ ...alert, state: false });
  };

  const HomePage = () => (
    <Home
      {...{ user: userData.user, token: userData.token, setUserData, setAlert }}
    />
  );
  const LoginPage = () => <Login {...{ setUserData, setAlert }} />;
  const RegisterPage = () => <Register {...{ setUserData, setAlert }} />;

  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/" component={HomePage} />
          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
      <Notification {...{ alert, handleClose }} />
    </ApolloProvider>
  );
};

export default App;
