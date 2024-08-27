import React, { useState, useEffect } from "react";
import { AppContext } from "App";
import { getComputedRoster } from "actions";

import RequestForm from "../RequestForm";
import Calendar from "./Calendar";
import RosterDetail from "./RosterDetail";
import RosterSelectionForm from "components/Roster/RosterSelectionForm";

const Roster = ({ isManagerView, override, isBid }) => {
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

  const render = () => {
    return (
      <>
        <div className={"page__roster component layout--two-column-detail"}>
          <h2>Calendar</h2>
          <div className={"header"}>
            <RosterSelectionForm />
          </div>
          <div className={"body"}>
            <div className={"layout__main-content flex--v flex-gap--md"}>
              <Calendar
                isManagerView={isManagerView}
                override={override}
                isBid={isBid}
              />
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
