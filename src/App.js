import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./Components/auth/Login";
import Registration from "./Components/auth/Registration";
import ErrorBoundary from "./Components/common/ErrorBoundaries";
import Home from "./Components/home/Home";
import { PrivateRoute } from "./Components/PrivateRoute";
class App extends Component {
  render() {
    return (
      <Router>
        <ErrorBoundary>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Registration} />
            <PrivateRoute path="/" component={Home} />
          </Switch>
        </ErrorBoundary>
      </Router>
    );
  }
}

export default App;
