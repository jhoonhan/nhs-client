import "./scss/App.scss";
import React, { useEffect } from "react";

import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from "@azure/msal-react";

import Roster from "components/Roster/Roster";
import ComputeRosterForm from "components/ComputeRosterForm";

import useContextValues from "./useContextValues";
import { Route, Switch, useLocation } from "react-router-dom";

import { PageLayout } from "components/PageLayout";
import UserList from "components/UserList/UserList";

export const AppContext = React.createContext();

/**
 * Renders information about the signed-in user or a button to retrieve data about the user
 */

const App = () => {
  const location = useLocation();

  const contextValues = useContextValues();
  const {
    isLoggedIn,
    computedRoster,
    form,
    users,
    formData,
    currentUser,
    selectedUser,
    selectedShifts,
    unusedPriorities,
    requests,
  } = contextValues;

  useEffect(() => {
    selectedShifts.setData([]);
  }, [selectedUser.state]);

  // 8/6 - When logged in, it first sets the selected user to the current user.
  useEffect(() => {
    selectedUser.setData(currentUser.state.user_id);
  }, [currentUser.state]);

  return (
    <AppContext.Provider value={contextValues}>
      <div className="App">
        <PageLayout>
          <AuthenticatedTemplate>
            <Switch location={location}>
              <Route
                path="/manager"
                render={() => (
                  <ComputeRosterForm authority={currentUser.state.authority} />
                )}
              />
              <Route
                path="/users"
                render={() => (
                  <UserList authority={currentUser.state.authority} />
                )}
              />
              <Route
                path="/roster"
                render={() => <Roster isManagerView={false} />}
              />
            </Switch>
          </AuthenticatedTemplate>

          <UnauthenticatedTemplate>
            <div className={"please-sign-in"}>
              <h3>Sign in using the UHB email address.</h3>
              <p>
                If you have not recevied an invitation email, notify your
                manager asap.
              </p>
            </div>
          </UnauthenticatedTemplate>
        </PageLayout>
      </div>
    </AppContext.Provider>
  );
};

export default App;
