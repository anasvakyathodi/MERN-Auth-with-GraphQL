import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";

const Header = ({ name, logout }) => {
  return (
    <AppBar position="fixed" color="inherit">
      <Toolbar>
        <Typography variant="button" style={{ display: "flex", flex: "1" }}>
          Hello {name ? name : ""}
        </Typography>
        <Button color="inherit" onClick={logout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
