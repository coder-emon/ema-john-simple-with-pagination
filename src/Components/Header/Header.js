import React, { useContext } from "react";
import "./Header.css";
import logo from "../../images/Logo.svg";
import { NavLink } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { AuthContext } from "../../UserContext/UserContext";
const Header = () => {
  const { user, LogOut } = useContext(AuthContext);
  return (
    <div className="header">
      <div className="header-left">
        <NavLink to="/">
          <img src={logo} alt="" />
        </NavLink>
      </div>
      <div className="header-right">
        {user?.displayName ? user?.displayName : user?.email}
        <NavLink to="/orders">Orders</NavLink>
        <NavLink to="/">Order Review</NavLink>
        <NavLink to="/inventory">Manage Inventory</NavLink>
        <NavLink to="/signup">Register</NavLink>
        {user?.uid ? (
          <NavLink to="/" onClick={LogOut}>
            Logout
          </NavLink>
        ) : (
          <NavLink to="/login">Login</NavLink>
        )}
      </div>
    </div>
  );
};

export default Header;
