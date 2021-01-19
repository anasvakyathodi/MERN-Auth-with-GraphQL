import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import {
  Avatar,
  Button,
  TextField,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import { VerifiedUser } from "@material-ui/icons";
import useStyles from "./Styles/style";
import { useHistory, Link } from "react-router-dom";
import { USER_LOGIN } from "./graphql/models";

const SignIn = ({ setUserData, setAlert }) => {
  const history = useHistory();
  const classes = useStyles();
  const [login] = useMutation(USER_LOGIN);
  const initialState = { email: "", password: "" };
  const [formData, setFormData] = useState(initialState);

  const handleUpdate = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login({
      variables: formData,
    })
      .then((data) => {
        const { name: user, token } = data.data.login;
        setUserData({ user, token });
        setFormData(initialState);
        localStorage.setItem("auth-token", token);
        localStorage.setItem("auth-name", user);
        setAlert({ state: true, message: "Successfully LoggedIn!" });
        history.replace("/");
      })
      .catch((err) => {
        setAlert({ state: true, message: err.message });
        console.log(err.message);
      });
  };
  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <VerifiedUser />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            className={classes.textField}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            onChange={handleUpdate}
            label="Email Address"
            name="email"
          />
          <TextField
            className={classes.textField}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            onChange={handleUpdate}
            label="Password"
            type="password"
            id="password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link to="/register" className={classes.link}>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default SignIn;
