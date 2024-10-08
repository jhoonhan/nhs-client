import React from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "authConfig";
import { signInUser } from "actions";
import { API_GENERAL_ACCESS } from "../config";

const accessTokenRequest = {
  scopes: [API_GENERAL_ACCESS], // replace with your API's scope
};

/**
 * Renders a drop down button with child buttons for logging in with a popup or redirect
 */
export const SignInButton = () => {
  const { instance } = useMsal();

  const handleLogin = async () => {
    try {
      const res = await instance.loginPopup(loginRequest);
      const fullnameArr = res.account.name.split(" ");
      const data = {
        ms_id: res.uniqueId,
        first_name: fullnameArr[0],
        last_name: fullnameArr[fullnameArr.length - 1],
        email: res.account.username,
        status: "active",
      };

      const tokenRes = await instance.acquireTokenSilent({
        ...accessTokenRequest,
        account: res.account,
      });
      const loginRes = await signInUser(tokenRes.accessToken, data);

      // Edge case where email address is added to AD but not to the database.
      if (loginRes.status === "fail") {
        alert(
          "Your account creation is not completed. Please sign out and contact your administrator.",
        );
        // await instance.logout();
        return;
      }

      // Set the active account
      instance.setActiveAccount(res.account);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <div className={"flex--h"}>
      <span className={"btn--primary"} onClick={() => handleLogin()}>
        Sign in
      </span>
    </div>
  );
};
