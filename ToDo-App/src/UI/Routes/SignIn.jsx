import React from "react";
import { useFirebase } from "react-redux-firebase";
import { useHistory } from "react-router-dom";
import { Container ,Typography, Button } from "@material-ui/core";

const SignIn = () => {
  const firebase = useFirebase();

  const signInWithGoogle = () => {
    firebase
      .login({
        provider: "google",
        type: "popup",
      })
      .then(() => {
        history.push("/todos");
      });
  };

  const history = useHistory();
  return (
    <Container>
      <Typography variant="h3">Sign In</Typography>

      <Button variant="contained" color="primary"
        onClick={(event) => {
          event.preventDefault();
          signInWithGoogle();
        }}
      >
        Sign In with Google
      </Button>
    </Container>
  );
};

export default SignIn;
