import React from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HeaderNav from "./components/Navigation/HeaderNav";
import PrivateRoute from "./components/Navigation/PrivateRoute";
//COmponents
import NewHotel from "./hotels/NewHotel";
import Home from "./LandingPage/Home";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import StripeSuccess from "./Stripe/StripeSuccess";
import StripeCancel from "./Stripe/StripeCancel";
import Dashboard from "./User/Dashboard";
import EditHotel from "./hotels/EditHotel";
import HotelListings from "./components/Hotels/HotelListings";
import DashboardSeller from "./User/DashboardSellers";
import SearchEvents from "./components/SearchPage/SearchEvents";
import StripeCallback from "./Stripe/StripeCallback";
import ViewHotel from "./components/Hotels/ViewHotel";
import Chat from "./components/Chat/chat";

const App = () => {
  return (
    <BrowserRouter>
      <HeaderNav />
      <ToastContainer position="top-center" />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/searchevents" component={SearchEvents} />
        <Route exact path="/hotel-listings" component={HotelListings} />
        <PrivateRoute exact path="/chat" component={Chat} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute
          exact
          path="/dashboard/seller"
          component={DashboardSeller}
        />
        <PrivateRoute exact path="/hotels/new" component={NewHotel} />
        <PrivateRoute
          exact
          path="/stripe/callback"
          component={StripeCallback}
        />
        <PrivateRoute exact path="/hotel/edit/:hotelId" component={EditHotel} />
        <Route exact path="/hotel/:hotelId" component={ViewHotel} />
        <PrivateRoute
          exact
          path="/stripe/success/:hotelId"
          component={StripeSuccess}
        />
        <PrivateRoute exact path="/stripe/cancel" component={StripeCancel} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
