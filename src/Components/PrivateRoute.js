import React from "react";
import { Redirect, Route } from "react-router-dom";
import AppLayout from "./AppLayout";

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      localStorage.getItem("user") ? (
        <AppLayout {...props}>
          {" "}
          <Component {...props} />
        </AppLayout>
      ) : (
        <Redirect
          to={{ pathname: "/login", state: { from: props.location } }}
        />
      )
    }
  />
);
