import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
const HeaderNav = () => {
    const dispatch = useDispatch();
    const { auth } = useSelector((state) => ({ ...state }));
    const history = useHistory();

    const logout = () => {
        dispatch({
          type: "LOGOUT",
          payload: null,
        });
        window.localStorage.removeItem("auth");
        history.push("/login");
      };
  
    return (
        <div  className="navbar navbar-expand-md bg-dark sticky-top d-flex justify-content-center">
        <Link className="nav-link" to="/">
          Home
        </Link>
        {auth !== null && (
            <Link className="nav-link" to="/dashboard">
              Dashboard
            </Link>
            
        )}
  
        {auth !== null && (
          <a className="nav-link pointer" onClick={logout}>
            Logout
          </a>
        )}
  
        {auth === null && (
          <>
            <Link className="nav-link" to="/login">
              Login
            </Link>
            <Link className="nav-link" to="/register">
              Register
            </Link>
            <Link className="nav-link" to="/searchevents">Muse Locator</Link>
            <Link className="nav-link" to="/hotel-listings"> Lodging Listings</Link>
            <Link className="nav-link" to="/venuefinder">Venue Listings</Link>
          </>
        )}
      </div>
    );
  };
export default HeaderNav;