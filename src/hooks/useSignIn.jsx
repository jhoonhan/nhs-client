import React, { useEffect, useState } from "react";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { API_GENERAL_ACCESS } from "config";
import { fetchUserById } from "../actions";

const accessTokenRequest = {
  scopes: [API_GENERAL_ACCESS], // replace with your API's scope
};

const useSignIn = (selectedUser) => {
  const { instance, accounts } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const [accessToken, setAccessToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) return;
    const account = accounts[0];
    const ms_id = account.localAccountId;
    instance
      .acquireTokenSilent({ ...accessTokenRequest, account })
      .then(async (response) => {
        const accessToken = response.accessToken;
        setAccessToken(accessToken);
        setIsLoggedIn(true);
        // Get user_id from the db using ms_id
        await fetchUserById(response.accessToken, ms_id, 1, selectedUser);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [isAuthenticated]);

  return { accessToken, isAuthenticated, isLoggedIn };
};

export default useSignIn;
