import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HeaderNav from "./components/HeaderNav";
import PrivateRoute from "./components/PrivateRoute";
//COmponents
import Home from "./Event/Home";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import Dashboard from "./User/Dashboard";
import DashboardSeller from "./User/DashboardSellers";

const App = () => {
  return (
    <BrowserRouter>
      <HeaderNav />
      <ToastContainer position="top-center" />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute
          exact
          path="/dashboard/seller"
          component={DashboardSeller}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
