import React from "react";
import { Snackbar } from "@material-ui/core";

const Notification = ({ alert, handleClose }) => {
  return (
    <Snackbar
      open={alert.state}
      onClose={handleClose}
      message={alert.message}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      autoHideDuration="2000"
    />
  );
};

export default Notification;
