import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";
import { Send } from "@material-ui/icons";
import useStyles from "./Styles/style";
import { useMutation } from "@apollo/client";
import { POST_MESSAGE } from "./graphql/models";

const ChatInput = ({ setAlert, user }) => {
  const classes = useStyles();
  const [content, setContent] = useState("");
  const [sendMessage] = useMutation(POST_MESSAGE);

  const handlePost = (e) => {
    e.preventDefault();
    if (content === "") {
      setAlert({ state: true, message: "No Input Added" });
    } else {
      sendMessage({ variables: { user, content } })
        .then(() => {
          setContent("");
          window.scrollTo(0, document.body.scrollHeight);
        })
        .catch(() => setAlert({ state: true, message: "Error on Message" }));
    }
  };

  return (
    <div className={classes.inputContainer}>
      <form
        className={classes.inputWrapper}
        noValidate
        autoComplete="off"
        onSubmit={handlePost}
      >
        <TextField
          id="message-input"
          fullWidth
          variant="outlined"
          placeholder="Message"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className={classes.inputText}
          autoFocus
        />
        <Button
          type="submit"
          variant="outlined"
          className={classes.inputButton}
          endIcon={<Send />}
          disabled={content.length === 0 ? true : false}
        >
          Send
        </Button>
      </form>
    </div>
  );
};

export default ChatInput;
