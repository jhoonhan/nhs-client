import "./scss/App.scss";
import React, { useEffect, useContext, useState } from "react";

import { loginRequest } from "authConfig";
import { callMsGraph } from "graph";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
} from "@azure/msal-react";
import { ProfileData } from "components/ProfileData";
import Button from "react-bootstrap/Button";
import { useIsAuthenticated } from "@azure/msal-react";

import Roster from "components/Roster/Roster";
import ComputeRosterForm from "components/ComputeRosterForm";

import useContextValues from "./useContextValues";
import { Route, Switch, useLocation } from "react-router-dom";

import { PublicClientApplication } from "@azure/msal-browser";
import { PageLayout } from "./components/PageLayout";

export const AppContext = React.createContext();

/**
 * Renders information about the signed-in user or a button to retrieve data about the user
 */

const ProfileContent = () => {
  const { instance, accounts } = useMsal();
  const [graphData, setGraphData] = useState(null);

  function RequestProfileData() {
    // Silently acquires an access token which is then attached to a request for MS Graph data
    instance
      .acquireTokenSilent({
        ...loginRequest,
        account: accounts[0],
      })
      .then((response) => {
        callMsGraph(response.accessToken).then((response) =>
          setGraphData(response),
        );
      });
  }

  return (
    <>
      <h5 className="profileContent">Welcome {accounts[0].name}</h5>
      {graphData ? (
        <ProfileData graphData={graphData} />
      ) : (
        <Button variant="secondary" onClick={RequestProfileData}>
          Request Profile
        </Button>
      )}
    </>
  );
};

const MainContent = () => {
  return (
    <div className="App">
      <AuthenticatedTemplate>
        <ProfileContent />
      </AuthenticatedTemplate>

      <UnauthenticatedTemplate>
        <h5 className="card-title">
          Please sign-in to see your profile information.
        </h5>
      </UnauthenticatedTemplate>
    </div>
  );
};

function App() {
  const location = useLocation();

  const isAuthenticated = useIsAuthenticated();

  const contextValues = useContextValues();
  const {
    computedRoster,
    form,
    users,
    formData,
    selectedUser,
    selectedShifts,
    unusedPriorities,
    requests,
  } = contextValues;

  useEffect(() => {
    selectedShifts.setData([]);
  }, [selectedUser.state]);

  useEffect(() => {
    console.log(computedRoster.state);
  }, [computedRoster.state]);

  const handleUserSelect = async (e) => {
    e.preventDefault();
    selectedUser.setData(+e.target.value);
  };

  const renderUserSelectForm = () => {
    const dummySelector = () => {
      return Array.from({ length: 14 }, (_, i) => i + 1).map((value) => (
        <option key={value} value={value}>
          {value}
        </option>
      ));
    };

    return (
      <>
        <h2>Select User</h2>
        <form>
          <select
            id="user"
            value={selectedUser.state}
            onChange={handleUserSelect}
          >
            {/*{users.state.map((user) => {*/}
            {/*  return (*/}
            {/*    <option value={user.user_id} key={user.user_id}>*/}
            {/*      {user.user_id}*/}
            {/*    </option>*/}
            {/*  );*/}
            {/*})}*/}
            {dummySelector()}
          </select>
        </form>
      </>
    );
  };

  return (
    <AppContext.Provider value={contextValues}>
      {renderUserSelectForm()}
      <div className="App">
        <PageLayout>
          <MainContent />
        </PageLayout>
        {/*<Switch location={location}>*/}
        {/*  <Route path="/" exact render={() => renderUserSelectForm()} />*/}
        {/*  <Route path="/manager" render={() => <ComputeRosterForm />} />*/}
        {/*  <Route path="/roster" render={() => <Roster />} />*/}
        {/*</Switch>*/}
      </div>
    </AppContext.Provider>
  );
}

export default App;
