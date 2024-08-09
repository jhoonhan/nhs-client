import React, { useEffect, useState } from "react";
import { fetchAllUsers } from "../actions";
import { AppContext } from "../App";
import { formatName } from "../helpers/formatters";

import { Client } from "@microsoft/microsoft-graph-client";
import { PublicClientApplication } from "@azure/msal-browser";
import {
  AuthCodeMSALBrowserAuthenticationProvider,
  InteractionType,
} from "@microsoft/microsoft-graph-client/authProviders/authCodeMsalBrowser";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import axios from "axios";

const msalConfig = new PublicClientApplication({
  auth: {
    clientId: "69633545-10c6-4412-b2dc-f395d7eaded7",
    authority: `https://login.microsoft.online/f5ebf3d1-9216-4ea3-94fc-cd4ffde6898a`,
    redirectUri: "http://localhost:3000",
  },
});

const UserList = ({ authority }) => {
  const { instance, accounts } = useMsal();
  const { isLoggedIn, users } = React.useContext(AppContext);

  const inviteUser2 = async () => {
    const pca = new PublicClientApplication(msalConfig);
    await pca.initialize();

    const accounts = pca.getAllAccounts();
    if (accounts.length > 0) {
      // Authenticate to get the user's account
      const authResult = await instance.acquireTokenSilent({
        scopes: ["https://graph.microsoft.com/.default"],
        account: accounts[0],
      });
      if (!authResult.account) {
        throw new Error("Could not authenticate");
      }
      const authProvider = new AuthCodeMSALBrowserAuthenticationProvider(pca, {
        account: authResult.account,
        // interactionType: InteractionType.Silent,
        scopes: ["User.Read"],
      });

      const graphClient = Client.initWithMiddleware({
        authProvider: authProvider,
      });
      console.log(graphClient);

      const invitation = {
        invitedUserEmailAddress: "hanj1112@outlook.com", // replace with the guest user's email address
        inviteRedirectUrl: "http://localhost:3000", // replace with your app's url
      };
      //
      const res = await graphClient.api("/invitations").post(invitation);
      console.log(res);
    }
  };

  const inviteUser = async () => {
    const pca = new PublicClientApplication(msalConfig);
    await pca.initialize();

    const accounts = pca.getAllAccounts();
    if (accounts.length > 0) {
      const accessTokenResponse = await instance.acquireTokenSilent({
        scopes: ["https://graph.microsoft.com/.default"],
        account: accounts[0],
      });

      const invitation = {
        invitedUserEmailAddress: "hanj1112@outlook.com", // replace with the guest user's email address
        inviteRedirectUrl: "http://localhost:3000", // replace with your app's url\
        sendInvitationMessage: true,
      };

      const response = await axios.post(
        "https://graph.microsoft.com/v1.0/invitations",
        invitation,
        {
          headers: {
            Authorization: `Bearer ${accessTokenResponse.accessToken}`,
            "Content-Type": "application/json",
          },
        },
      );
      console.log(response.data);
    }
  };

  const handleInvitationFormSubmit = async (e) => {
    e.preventDefault();
    console.log("aang letsgo");
    try {
      await inviteUser();
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        await fetchAllUsers(isLoggedIn.state.accessToken, {
          setData: users.setData,
        });
      } catch (e) {
        console.error(e);
      }
    };
    getAllUsers();
  }, []);

  const renderUsers = () => {
    return users.state.map((user) => {
      return (
        <ul key={user.user_id}>
          <li>
            <p>Name: {formatName(user.firstname, user.lastname, 2)}</p>
          </li>
          <li>
            <p>Email: {user.email}</p>
          </li>
          <li>
            <p>Band: {user.band}</p>
          </li>
          <li>
            <p>Id: {user.user_id}</p>
          </li>
        </ul>
      );
    });
  };

  const render = () => {
    if (!authority) return <h3>No Access</h3>;
    return (
      <div className={"page__user-list"}>
        <div>
          <h3>Users:</h3>
          <div className={"user-list__users"}>{renderUsers()}</div>
        </div>

        <div>
          <h3>Invite New User:</h3>
          <form
            className={"uesr-list__invite-form"}
            onSubmit={handleInvitationFormSubmit}
          >
            <label>Firstname:</label>
            <input type={"text"} placeholder={"First Name"} />
            <label>Lastname:</label>
            <input type={"text"} placeholder={"Last Name"} />
            <label>Email:</label>
            <input type={"email"} placeholder={"Email"} />
            <label>Band:</label>
            <input type={"number"} placeholder={"5"} />
            <button type={"submit"}>Invite</button>
          </form>
        </div>
      </div>
    );
  };

  return render();
};

export default UserList;
