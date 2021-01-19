import React from "react";
import { Grid, Chip, Typography, Container, Box } from "@material-ui/core";
import useStyles from "./Styles/style";
import { GET_MESSAGES } from "./graphql/models";
import { useSubscription } from "@apollo/client";

const Chat = (props) => {
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
            <Box
              display="flex"
              alignItems="center"
              flexDirection={props.user === user ? "row-reverse" : "row"}
            >
              <Chip variant="outlined" label={content} />
              <Typography variant="caption" className={classes.user}>
                {props.user === user || user}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Chat;
