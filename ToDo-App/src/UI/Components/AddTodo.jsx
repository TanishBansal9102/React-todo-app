import React,{useState} from "react";
import Input from '@material-ui/core/Input';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button'
import { useFirestore } from "react-redux-firebase";
import {useSelector} from "react-redux";

const useStyles = makeStyles({
  root: {
      marginTop: 16,
      marginBottom: 16,
      padding: 16,
      boxShadow: "0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)"
  },
  button: {
      marginTop: 16
  }
});

const AddTodo = () => {
  const [presentToDo, setPresentToDo] = useState("");
  const firestore = useFirestore();
  const { uid } = useSelector((state) => state.firebase.auth);
  console.log(useSelector((state) => state.firebase.auth));
  const handleChange = ({ currentTarget: { name, value } }) => {
    if (name === "addTodo") {
      setPresentToDo(value);
    }
  };

  const addNewTodo = (todo) => {
    
    if(todo.trim() !== "") {
      firestore
        .collection("users")
        .doc(uid)
        .collection("todos")
        .add({
          title: todo,
          isDone: false,
        })
        .then((docRef) => {
          docRef.update(
              {
                  todoID: docRef.id
              }
          );
        });
    }
    setPresentToDo("");
  
  };
  const classes = useStyles();
  return (
    <Container maxWidth="sm" className={classes.root}>
      <Grid container alignItems="center">
        <Grid item md={12}>
          <Input  onChange={handleChange} 
            name="addTodo"
            id="outlined-basic" fullWidth label="Enter Title" multiline variant="outlined" />
        </Grid>
        <Grid item md={12}>
          <Button className={classes.button}
            variant="contained" 
            color="primary" 
            onClick={event => {
              event.preventDefault();
              addNewTodo(presentToDo);
            }}>
            Add ToDo
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AddTodo;
