import React from "react";
import { Grid, Chip, Avatar, Typography, Container } from "@material-ui/core";
import useStyles from "./Styles/style";
import { GET_MESSAGES } from "./graphql/models";
import { useSubscription } from "@apollo/client";

const Chat = () => {
  const classes = useStyles();
  const { data } = useSubscription(GET_MESSAGES);
  if (!data) {
    return null;
  }
  return (
    <Container maxWidth="md" className={classes.chatContainer}>
      <Grid container spacing={2}>
        {data.messages.map(({ id, user, content }) => (
          <Grid item xs="12">
            <Chip
              variant="outlined"
              label={content}
              avatar={<Avatar>{user.charAt(0).toUpperCase()}</Avatar>}
            />
            <Typography variant="caption" className={classes.user}>
              {user}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Chat;
