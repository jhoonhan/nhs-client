/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import React, { useEffect } from "react";
import Navbar from "react-bootstrap/Navbar";

import { useIsAuthenticated } from "@azure/msal-react";
import { SignInButton } from "./SignInButton";
import { SignOutButton } from "./SignOutButton";

/**
 * Renders the navbar component with a sign-in or sign-out button depending on whether or not a user is authenticated
 * @param props
 */
export const PageLayout = ({ currentUser, children }) => {
  const isAuthenticated = useIsAuthenticated();

  const renderMenuItems = () => {
    return (
      <nav className={"home__menu flex--h flex-gap--lg flex-align-cc"}>
        {currentUser.authority >= 2 && <a href={"manager"}>manager</a>}
        {currentUser.authority >= 2 && <a href={"users"}>users</a>}
        {currentUser.authority === 1 && <a href={"roster"}>roster</a>}
      </nav>
    );
  };

  return (
    <>
      <div className="navbar-collapse">
        {renderMenuItems()}
        <div className={"nav__sign-buttons"}>
          {isAuthenticated ? <SignOutButton /> : <SignInButton />}
        </div>
      </div>

      <div className="profileContent">{children}</div>
    </>
  );
};
