import "./scss/App.scss";
import React, { useEffect, useContext, useState } from "react";

import Roster from "components/Roster/Roster";
import ComputeRosterForm from "components/ComputeRosterForm";

import useContextValues from "./useContextValues";
import RequestForm from "./components/RequestForm";
import { Route, Switch, useLocation } from "react-router-dom";

export const AppContext = React.createContext();

function App() {
  const location = useLocation();
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
        <Switch location={location}>
          <Route path="/" exact render={() => renderUserSelectForm()} />
          <Route path="/manager" render={() => <ComputeRosterForm />} />
          <Route path="/roster" render={() => <Roster />} />
        </Switch>
      </div>
    </AppContext.Provider>
  );
}

export default App;
