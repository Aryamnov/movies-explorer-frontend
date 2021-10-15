import React from "react";
import { Route, Redirect } from "react-router-dom";
import Preloader from "./Preloader";

function ProtectedRoute({ loggedIn, path, children, isAuthChecking }) {
  return (
    <Route path={path}>
      {isAuthChecking ? (
        <>
          <Preloader />
        </>
      ) : loggedIn ? (
        children
      ) : (
        <Redirect to="/signin" />
      )}
    </Route>
  );
}

export default ProtectedRoute;
