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
    selectedShift,
    requests,
  } = contextValues;
  const [formMonth, setFormMonth] = useState(8);
  const [formYear, setFormYear] = useState(2024);
  const [formUserId, setFormUserId] = useState(1);
  const [computed, setComputed] = useState(false);

  useEffect(() => {
    // fetchAllUsers(users);
    fetchRequestsByMonthYear(requests.setData, {
      month: formData.state.month,
      year: formData.state.year,
    });
  }, []);

  const handleRequestFormSubmit = async (e) => {
    // e.preventDefault();
    // try {
    //   await computeRoster(
    //     setComputed,
    //     {
    //       month: formMonth,
    //       year: formYear,
    //     },
    //     1,
    //   );
    // } catch (error) {
    //   console.error(error);
    // }
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
        {renderUserSelectForm()}
        <br />
        <ComputeRosterForm />
        <Roster />
        <br />
        {renderRequestForm()}
      </div>
    </AppContext.Provider>
  );
}

export default App;
