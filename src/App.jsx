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
import useSignIn from "hooks/useSignIn";

export const AppContext = React.createContext();

/**
 * Renders information about the signed-in user or a button to retrieve data about the user
 */

const MainContent = ({ location, renderUserSelectForm }) => {
  return (
    <div className="App">
      <AuthenticatedTemplate>
        <Switch location={location}>
          <Route path="/" exact render={() => renderUserSelectForm()} />
          <Route path="/manager" render={() => <ComputeRosterForm />} />
          <Route path="/roster" render={() => <Roster />} />
        </Switch>
      </AuthenticatedTemplate>

      <UnauthenticatedTemplate>
        <h1>Please sign in</h1>
      </UnauthenticatedTemplate>
    </div>
  );
};

const App = () => {
  const location = useLocation();

  const contextValues = useContextValues();
  const {
    isLoggedIn,
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
    // console.log(computedRoster.state);
  }, [computedRoster.state]);

  const handleUserSelect = async (e) => {
    e.preventDefault();
    selectedUser.setData(+e.target.value);
  };

  // MANGER VIEW
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
          {selectedUser.state ? (
            <MainContent
              location={location}
              renderUserSelectForm={renderUserSelectForm}
            />
          ) : (
            <h1>Please Log in</h1>
          )}
        </PageLayout>
      </div>
    </AppContext.Provider>
  );
};

export default App;
