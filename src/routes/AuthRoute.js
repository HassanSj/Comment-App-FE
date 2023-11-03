import React from "react";
import { Route, Redirect } from "react-router-dom";

const AuthRoute = ({ component: Component, path, ...rest }) => {
  const isAuthenticated = localStorage.getItem("token");

  return (
    <Route
      path={path}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
      }
      {...rest}
    />
  );
};

export default AuthRoute;