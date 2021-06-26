import React, { useContext, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Button } from "antd";
import { Login } from "./screen/login/login.component";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { DashBoard } from "./screen/manager-console/dashboard.component";
import { RegisterComponent } from "./screen/register/register.component";
import { Home } from "./screen/home/home.component";
import { ActionType, UserContext } from "./store/store";

function App() {
  const { state, dispatch } = useContext(UserContext);

  useEffect(() => {
    console.log("Loading...");

    dispatch({ type: ActionType.LoadState });
  }, []);

  return (
    <Router>
      <Switch>
        <Route path="/manager">
          <DashBoard />
        </Route>
        <Route path="/register">
          <RegisterComponent />
        </Route>
        <Route path="/login" exact>
          <Login />
        </Route>
        <Route path="/">
          <Home />
        </Route>
        <Route>
          <div>Not found</div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
