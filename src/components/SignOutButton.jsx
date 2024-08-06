import React from "react";
import { useMsal } from "@azure/msal-react";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";

/**
 * Renders a sign-out button
 */
export const SignOutButton = () => {
  const { instance } = useMsal();

  const handleLogout = (logoutType) => {
    if (logoutType === "popup") {
      instance.logoutPopup({
        postLogoutRedirectUri: "http://localhost:3000",
        mainWindowRedirectUri: "http://localhost:3000",
      });
    } else if (logoutType === "redirect") {
      instance.logoutRedirect({
        postLogoutRedirectUri: "http://localhost:3000",
      });
    }
  };

  return (
    <span className={"btn--primary"} onClick={() => handleLogout("popup")}>
      Sign Out
    </span>
  );
};
