import React, { useState, useEffect } from "react";
import { AppContext } from "App";
import { getComputedRoster } from "actions";

import RequestForm from "../RequestForm";
import Calendar from "./Calendar";
import RosterDetail from "./RosterDetail";

const Roster = () => {
  const {
    computedRoster,
    selectedUser,
    selectedShifts,
    formData,
    unusedPriorities,
  } = React.useContext(AppContext);

  useEffect(() => {
    const fetchComputedRoster = async () => {
      try {
        await getComputedRoster(
          computedRoster.setData,
          {
            month: formData.state.month,
            year: formData.state.year,
          },
          0,
        );
      } catch (error) {
        console.error(error);
      }
    };
    fetchComputedRoster();
  }, []);

  const handleRosterFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await getComputedRoster(
        computedRoster.setData,
        {
          month: formData.state.month,
          year: formData.state.year,
        },
        0,
      );
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  const handleRosterFormChange = (e) => {
    const { value } = e.target;
    e.target.id === "month"
      ? formData.setData({ ...formData.state, month: value })
      : formData.setData({ ...formData.state, year: value });
  };

  const renderPriorities = () => {
    return (
      <div>
        <p>Unused Priorities : {unusedPriorities.state.join(", ")}</p>
      </div>
    );
  };
  const renderCalendarSelectForm = () => {
    return (
      <form onSubmit={handleRosterFormSubmit}>
        <label htmlFor="month">Month : </label>
        <input
          type="number"
          value={formData.state.month}
          id={"month"}
          onChange={(e) => handleRosterFormChange(e)}
        />
        <label htmlFor="month">Year : </label>
        <input
          type="number"
          value={formData.state.year}
          id={"year"}
          onChange={(e) => handleRosterFormChange(e)}
        />
        <button type="submit">Submit</button>
      </form>
    );
  };

  const render = () => {
    return (
      <>
        <div className={"page__roster layout--two-column-detail"}>
          <div className={"header"}>
            <h2>Get Roster</h2>
            {renderCalendarSelectForm()}
          </div>
          <div className={"body"}>
            <div className={"layout__main-content"}>
              <Calendar />
              {renderPriorities()}
              <RequestForm />
            </div>
            <div className={"layout__detail-content"}>
              <RosterDetail />
            </div>
          </div>
        </div>
      </>
    );
  };

  return render();
};

export default Roster;
