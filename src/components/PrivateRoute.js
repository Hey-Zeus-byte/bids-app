import React from "react";
import {Route, Navigate} from "react-router-dom";
import {useAuth} from "../utils/AuthContext";

export default function PrivateRoute({component: Component, ...rest}) {
  //take whatever other properties were defined on component and collect them into a new object assigned to the variable we name ...rest.
  const {currentUser} = useAuth();

  return (
    <Route
      {...rest}
      render={(props) => {
        return currentUser ? <Component {...props} /> : <Navigate to="/" />; // user should go to appropriate route if not return to login page
      }}
    ></Route>
  );
}
