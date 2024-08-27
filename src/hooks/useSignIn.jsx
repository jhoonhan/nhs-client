import React, { useEffect, useState } from "react";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { API_GENERAL_ACCESS } from "config";
import { fetchUserById } from "../actions";

const accessTokenRequest = {
  scopes: [API_GENERAL_ACCESS], // replace with your API's scope
};

/**
 * Generate access token and set user information to currentUser
 *
 * @returns {{isLoggedIn: boolean, isAuthenticated: boolean, accessToken: unknown}}
 */
const useSignIn = () => {
  const { instance, accounts } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const [accessToken, setAccessToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    user_id: 0,
    ms_id: 0,
    email: "",
    first_name: "",
    last_name: "",
    authority: 0,
  });

  useEffect(() => {
    if (!isAuthenticated) return;
    const account = accounts[0];
    const ms_id = account.localAccountId;

    if (!accessToken) {
      instance
        .acquireTokenSilent({ ...accessTokenRequest, account })
        .then(async (response) => {
          const accessToken = response.accessToken;
          setAccessToken(accessToken);
          setIsLoggedIn(true);
          // Get user_id from the db using ms_id
          const userData = await fetchUserById(response.accessToken, ms_id, 1);
          // 8/6 - Sets currentUser to have all information
          setCurrentUser({ ...account, ...userData.data });
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [isAuthenticated]);

  return { accessToken, isAuthenticated, isLoggedIn, currentUser };
};

export default useSignIn;
