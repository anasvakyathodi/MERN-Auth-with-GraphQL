import React, { useState } from "react";
import {
  Avatar,
  Button,
  TextField,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import { PersonAdd } from "@material-ui/icons";
import useStyles from "./Styles/style";
import { useMutation } from "@apollo/client";
import { useHistory, Link } from "react-router-dom";
import { USER_REGISTER } from "./graphql/models";

const Register = ({ setUserData, setAlert }) => {
  const classes = useStyles();
  const history = useHistory();
  const [register] = useMutation(USER_REGISTER);
  const initialState = {
    name: "",
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState(initialState);

  const handleUpdate = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    register({ variables: formData })
      .then((data) => {
        const { name: user, token } = data.data.createUser;
        setUserData({ user, token });
        setFormData(initialState);
        localStorage.setItem("auth-token", token);
        localStorage.setItem("auth-name", user);
        setAlert({ state: true, message: "Successfully Registered!" });
        history.replace("/");
      })
      .catch((err) => alert(err.message));
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <PersonAdd />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            className={classes.textField}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            onChange={handleUpdate}
          />
          <TextField
            className={classes.textField}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            onChange={handleUpdate}
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
            SIGN UP
          </Button>
          <Grid container>
            <Grid item>
              <Link to="/login" className={classes.link}>
                {"Already Registered? Login"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default Register;
