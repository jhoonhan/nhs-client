import "./scss/App.scss";
import React, { useEffect, useContext, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useLocation,
} from "react-router-dom";

import Roster from "components/Roster";
import ComputeRosterForm from "components/ComputeRosterForm";

import {
  fetchAllUsers,
  fetchRequestsByMonthYear,
  getComputedRoster,
} from "./actions";

import useContextValues from "./useContextValues";
import RequestForm from "./components/RequestForm";

export const AppContext = React.createContext();

function App() {
  // const location = useLocation();
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

  useEffect(() => {}, [unusedPriorities.state]);

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
      <div className="App">
        {renderUserSelectForm()}
        <br />
        <ComputeRosterForm />
        <Roster />
        <br />
        <RequestForm />
      </div>
    </AppContext.Provider>
  );
}

export default App;
