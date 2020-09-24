import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { createStore, compose } from "redux";
import { Provider } from "react-redux";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { createFirestoreInstance } from "redux-firestore";
import { rootReducer } from "./ducks/reducers";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";

const firebaseConfig = {
  apiKey: "AIzaSyATFYWrAj1Eb6iC2hLY87Lk7W1wT7E-NmA",
  authDomain: "react-to-do-app-gautam.firebaseapp.com",
  databaseURL: "https://react-to-do-app-gautam.firebaseio.com",
  projectId: "react-to-do-app-gautam",
  storageBucket: "react-to-do-app-gautam.appspot.com",
  messagingSenderId: "1063951930658",
  appId: "1:1063951930658:web:def93ce9cc22ca3c84c17b",
  measurementId: "G-17T6LK8TWX"
};

const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true,
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

const initialState = {};
const store = createStore(rootReducer, initialState);

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
};
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ReactReduxFirebaseProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
