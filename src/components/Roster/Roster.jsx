import React, { useState, useEffect } from "react";
import { AppContext } from "App";
import { getComputedRoster } from "actions";

import RequestForm from "../RequestForm";
import Calendar from "./Calendar";
import RosterDetail from "./RosterDetail";

const Roster = ({ isManagerView, override }) => {
  const { computedRoster, isLoggedIn, currentUser, formData } =
    React.useContext(AppContext);

  useEffect(() => {
    if (!isLoggedIn.state.accessToken || !currentUser.state) return;
    const fetchComputedRoster = async () => {
      try {
        await getComputedRoster(
          isLoggedIn.state.accessToken,
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
  }, [isLoggedIn.state.accessToken]);

  const handleRosterFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await getComputedRoster(
        isLoggedIn.state.accessToken,
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

  const renderCalendarSelectForm = () => {
    return (
      <div className={"component"}>
        <form onSubmit={handleRosterFormSubmit} className={"two-column"}>
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
          <button type="submit" className={"btn--primary"}>
            Submit
          </button>
        </form>
      </div>
    );
  };

  const render = () => {
    return (
      <>
        <div className={"page__roster component layout--two-column-detail"}>
          <h2>Calendar</h2>
          <div className={"header"}>{renderCalendarSelectForm()}</div>
          <div className={"body"}>
            <div className={"layout__main-content flex--v flex-gap--md"}>
              <Calendar isManagerView={isManagerView} override={override} />
              <RequestForm override={override} />
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
