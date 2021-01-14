import React, { useState } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  cache: new InMemoryCache(),
});

const App = () => {
  const [userData, setUserData] = useState({
    token: localStorage.getItem("auth-token"),
    user: localStorage.getItem("auth-name"),
  });

  const HomePage = () => (
    <Home {...{ user: userData.user, token: userData.token, setUserData }} />
  );
  const LoginPage = () => <Login {...{ setUserData }} />;
  const RegisterPage = () => <Register {...{ setUserData }} />;

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
    </ApolloProvider>
  );
};

export default App;
