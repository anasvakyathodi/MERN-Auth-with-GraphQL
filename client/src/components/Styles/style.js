import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#4caf50",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#000",
    color: "#fff",
  },
  textField: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#000",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#000",
      },
    },
  },
  link: {
    color: "#000",
  },
  user: {
    color: "#ccc",
    marginLeft: ".5rem",
  },
  chatContainer: {
    paddingTop: "5rem",
    paddingBottom: "7rem",
  },
  inputContainer: {
    position: "fixed",
    backgroundColor: "#fff",
    zIndex: "2",
    width: "100%",
    bottom: "0",
  },
  inputWrapper: {
    display: "flex",
    justifyContent: "space-between",
    padding: "1rem 0",
  },
  inputText: {
    margin: ".5rem",
    height: "3rem",
    borderRadius: "2rem",
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "#000",
      },
    },
  },
  inputButton: {
    margin: ".5rem",
    height: "3rem",
    borderRadius: "2rem",
  },
}));
