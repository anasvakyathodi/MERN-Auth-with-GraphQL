import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";

const Header = ({ name, logout }) => {
  return (
    <AppBar position="fixed" color="#000">
      <Toolbar>
        <Typography variant="h6" style={{ display: "flex", flex: "1" }}>
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
