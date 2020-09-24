import React from "react";
import { useSelector } from "react-redux";
import AddTodo from "../Components/AddTodo";
import { useFirestoreConnect } from "react-redux-firebase";
import ToDoItem from "../Components/TodoItem";
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';


const useStyles = makeStyles({
  container: {
      padding: 16
  }
});

const Todos = () => {
  const { displayName, uid } = useSelector((state) => state.firebase.auth);
  useFirestoreConnect({
    collection: `users/${uid}/todos`,
    storeAs: "todos",
  });
  const todos = useSelector((state) => state.firestore.data.todos);
  console.log(todos);
  const classes = useStyles();
  return (
    <Container>
      <Typography variant="h5">Hello {displayName}</Typography>
      <Typography variant="h6">Todos</Typography>
      <AddTodo />
      <List
        style={{
          listStyleType: "none",
        }}
      >
        {todos &&
          Object.values(todos).map((todo) => (
            <ListItem>
              <ToDoItem
                title={todo.title}
                isDone={todo.isDone}
                todoID={todo.todoID}
              />
            </ListItem>
          ))}
      </List>
    </Container>
  )
};

export default Todos;
