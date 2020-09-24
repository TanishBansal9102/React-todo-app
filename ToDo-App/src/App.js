import React from 'react';
import logo from './logo.svg';
import './App.css';
import PrivateRoute from "./UI/Components/PrivateRoute";
import Todos from "./UI/Routes/Todos";
import SignIn from "./UI/Routes/SignIn";
import {Switch, Route} from "react-router-dom";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  toolbar: {
      textAlign: "center",
      height: 80
  },
  heading: {
      margin: "auto"
  }
});

function App() {
  const classes = useStyles();
  return (
    <div style = {{
      textAlign: "center"
    }}>
      <AppBar position="static">
            <Toolbar className={classes.toolbar}>
                <Typography className={classes.heading} variant="h5" align="center">Todo App</Typography>
            </Toolbar>
        </AppBar>
      <Switch>
        <PrivateRoute path = "/todos">
          <Todos />
        </PrivateRoute>
        <Route path = "/">
        <SignIn />
        </Route>
      </Switch>
      
    </div>
  );
}

export default App;
