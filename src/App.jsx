import "./scss/App.scss";
import React, { useEffect } from "react";

import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from "@azure/msal-react";

import Roster from "components/Roster/Roster";
import Manager from "components/Manager";

import useContextValues from "./useContextValues";
import { Route, Switch, useLocation } from "react-router-dom";

import { PageLayout } from "components/PageLayout";
import User from "components/User/User";
import Bids from "components/Bids";

export const AppContext = React.createContext();

/**
 * Renders information about the signed-in user or a button to retrieve data about the user
 */

const App = () => {
  const location = useLocation();

  const contextValues = useContextValues();
  const { isLoggedIn, currentUser, selectedUser, selectedShifts } =
    contextValues;

  useEffect(() => {
    selectedShifts.setData([]);
  }, [selectedUser.state]);

  // 8/6 - When logged in, it first sets the selected user to the current user.
  useEffect(() => {
    selectedUser.setData(currentUser.state.user_id);
  }, [currentUser.state.user_id]);

  useEffect(() => {
    console.log(isLoggedIn.state.accessToken);
  }, [isLoggedIn.state.accessToken]);

  const renderUnauthorized = () => (
    <div className={"please-sign-in"}>
      <h3>Sign in using the UHB email address.</h3>
      <p>
        If you have not recevied an invitation email, notify your manager asap.
      </p>
    </div>
  );

  return (
    <AppContext.Provider value={contextValues}>
      <div className="App">
        <PageLayout currentUser={currentUser.state}>
          {selectedUser.state ? (
            <>
              <AuthenticatedTemplate>
                <Switch location={location}>
                  <Route
                    path="/manager"
                    render={() => (
                      <Manager authority={currentUser.state.authority} />
                    )}
                  />
                  <Route
                    path="/bids"
                    render={() => (
                      <Bids authority={currentUser.state.authority} />
                    )}
                  />
                  <Route
                    path="/users"
                    render={() => (
                      <User authority={currentUser.state.authority} />
                    )}
                  />
                  <Route
                    path="/roster"
                    render={() => <Roster isManagerView={false} />}
                  />
                </Switch>
              </AuthenticatedTemplate>

              <UnauthenticatedTemplate>
                {renderUnauthorized()}
              </UnauthenticatedTemplate>
            </>
          ) : (
            <>{renderUnauthorized()}</>
          )}
        </PageLayout>
      </div>
    </AppContext.Provider>
  );
};

export default App;
