import "./scss/App.scss";
import React, { useEffect, useContext, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useLocation,
} from "react-router-dom";

import Roster from "components/Roster";
import RosterForm from "components/RosterForm";

import { fetchAllUsers, fetchShifts, fetchShiftsByMonthYear } from "./actions";

import useContextValues from "./useContextValues";

export const AppContext = React.createContext();

function App() {
  // const location = useLocation();
  const contextValues = useContextValues();
  const { computedShifts, users, selectedUser, selectedShift } = contextValues;
  const [formMonth, setFormMonth] = useState(8);
  const [formYear, setFormYear] = useState(2024);
  const [formUserId, setFormUserId] = useState(1);

  useEffect(() => {
    // fetchAllUsers(users);
  }, []);

  const handleRequestFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetchShiftsByMonthYear(
        computedShifts.state,
        computedShifts.setData,
        {
          month: formMonth,
          year: formYear,
        },
      );
    } catch (error) {
      console.error(error);
    }
  };
  const handleRequestFormChange = (e) => {
    const { value } = e.target;
    e.target.id === "userId" && setFormUserId(value);
  };

  const handleUserSelect = async (e) => {
    e.preventDefault();
    selectedUser.setData(+e.target.value);
  };

  const renderRequestForm = () => {
    return (
      <>
        <h2>Make a Request</h2>
        <form onSubmit={handleRequestFormSubmit}>
          <label htmlFor="userId">User Id : {selectedUser.state}</label>
          <br />
          <label htmlFor="shiftId">Shift Id : {selectedShift.state}</label>
          <br />
          <button type="submit">Submit</button>
        </form>
      </>
    );
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
        {/*    write me a five option dropdown */}

        {renderUserSelectForm()}

        <br />
        <RosterForm />
        <Roster />
        <br />
        {renderRequestForm()}
      </div>
    </AppContext.Provider>
  );
}

export default App;
