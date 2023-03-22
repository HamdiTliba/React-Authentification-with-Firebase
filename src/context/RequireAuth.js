import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";

const RequireAuth = () => {
  const { currentUser } = useAuth();
  const location = useLocation();
  if (!currentUser) {
    return <Navigate to="/login" state={{ path: location.pathname }} />;
  }
  return <div>RequireAuth</div>;
};

export default RequireAuth;
