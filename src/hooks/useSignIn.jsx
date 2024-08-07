import React, { useEffect, useState } from "react";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { API_GENERAL_ACCESS } from "config";
import { fetchUserById } from "../actions";

const accessTokenRequest = {
  scopes: [API_GENERAL_ACCESS], // replace with your API's scope
};

const useSignIn = (currentUser) => {
  const { instance, accounts } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const [accessToken, setAccessToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) return;
    const account = accounts[0];
    const ms_id = account.localAccountId;
    console.log(ms_id);
    instance
      .acquireTokenSilent({ ...accessTokenRequest, account })
      .then(async (response) => {
        const accessToken = response.accessToken;
        setAccessToken(accessToken);
        setIsLoggedIn(true);
        // Get user_id from the db using ms_id
        // 8/6 update. Set currentUser to have all information.
        const userData = await fetchUserById(
          response.accessToken,
          ms_id,
          1,
          currentUser,
        );
        // 8/6 - Sets currentUser to have all information
        currentUser.setData({ ...account, ...userData.data });
      })
      .catch((error) => {
        console.error(error);
      });
  }, [isAuthenticated]);

  return { accessToken, isAuthenticated, isLoggedIn };
};

export default useSignIn;
