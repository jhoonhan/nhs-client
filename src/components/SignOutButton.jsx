import React from "react";
import { useMsal } from "@azure/msal-react";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import { formatName } from "helpers/formatters";
import { AppContext } from "App";

/**
 * Renders a sign-out button
 */
export const SignOutButton = () => {
  const { instance } = useMsal();
  const { currentUser } = React.useContext(AppContext);

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
    <div className={"flex--h flex-gap--md flex-align-cc"}>
      <p>
        Welcome,{" "}
        {formatName(currentUser.state.firstname, currentUser.state.lastname, 2)}
      </p>
      <span className={"btn--primary"} onClick={() => handleLogout("popup")}>
        Sign Out
      </span>
    </div>
  );
};
