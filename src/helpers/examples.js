import { PublicClientApplication } from "@azure/msal-browser";

// Authentication on client-side example
const inviteUser4 = async () => {
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

    // const response = await axios.post(
    //   "https://graph.microsoft.com/v1.0/invitations",
    //   invitation,
    //   {
    //     headers: {
    //       Authorization: `Bearer ${accessTokenResponse.accessToken}`,
    //       "Content-Type": "application/json",
    //     },
    //   },
    // );
    // console.log(response.data);
  }
};
