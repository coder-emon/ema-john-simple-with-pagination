import React from "react";
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../UserContext/UserContext";
import Loader from "../Loader/Loader";

const PrivateRoute = ({ children }) => {
  const { user, loader } = useContext(AuthContext);

  const location = useLocation();
  if (loader) {

    return <Loader></Loader>;
  }
  if (user && user.uid) {
    return children;
  }
  return (
    <div>
      {" "}
      <Navigate to="/login" state={{ from: location }} replace></Navigate>{" "}
    </div>
  );
};

export default PrivateRoute;
