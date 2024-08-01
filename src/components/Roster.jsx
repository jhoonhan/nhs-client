import React, { useState, useEffect } from "react";
import { AppContext } from "../App";
import groupShifts from "helpers/groupShifts";
import { getComputedRoster } from "../actions";
import { PRIORITY_RANGE, MAX_REQUEST_PER_WEEK } from "../config";
import { validateShiftSelection } from "./rosterValidation";

const Roster = () => {
  const {
    computedRoster,
    selectedUser,
    selectedShifts,
    formData,
    unusedPriorities,
  } = React.useContext(AppContext);
  const [groupedByDay, setGroupedByDay] = useState({});
  const [groupedByWeek, setGroupedByWeek] = useState({});

  useEffect(() => {
    setGroupedByDay(groupShifts(computedRoster.state.shifts.shifts, "day"));
    setGroupedByWeek(groupShifts(computedRoster.state.shifts.shifts, "week"));
  }, [computedRoster.state.shifts.shifts]);

  useEffect(() => {}, [computedRoster.state]);

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

  const shiftBoxClass = ({ shift_id, selectable }) => {
    if (selectable === 0) {
      return "disabled";
    } else if (selectable === 2) {
      return "approved";
    } else if (shift_id in selectedShifts.state) {
      return "selected";
    } else if (selectable === 3) {
      return "pending";
    }
  };

  const handleDayClick = ({ shift_id, selectable }) => {
    if (!(shift_id in selectedShifts.state)) {
      if (selectable !== 1 || unusedPriorities.state.length === 0) {
        return;
      }
      selectedShifts.setData({
        ...selectedShifts.state,
        [shift_id]: {
          user_id: selectedUser.state,
          week_id:
            computedRoster.state.requests.groupedByShift[shift_id].week_id,
          priority: unusedPriorities.state[unusedPriorities.state.length - 1],
        },
      });
      const temp = [...unusedPriorities.state];
      temp.pop();
      temp.sort((a, b) => a - b);
      unusedPriorities.setData(temp);
    } else {
      const priority = selectedShifts.state[shift_id].priority;
      const tempPriorities = [...unusedPriorities.state, priority];
      tempPriorities.sort((a, b) => a - b);
      unusedPriorities.setData(tempPriorities);

      const temp = { ...selectedShifts.state };
      delete temp[shift_id];
      selectedShifts.setData(temp);
    }
  };

  const getSelectedPriority = (shift_id) => {
    if (shift_id in selectedShifts.state) {
      return selectedShifts.state[shift_id].priority;
    }
    return "";
  };

  const renderCalendar = () => {
    const approvedStaffs = (shift_id) => {
      if (!(shift_id in computedRoster.state.requests.groupedByShift))
        return "";
      const approved =
        computedRoster.state.requests.groupedByShift[shift_id].approved;
      const names = Object.keys(approved).map((user_id) => {
        return approved[user_id].user_id;
      });
      return names.join(", ");
    };

    return (
      <div className="calendar">
        {Object.keys(groupedByDay).map((day_num) => {
          const shifts = [
            groupedByDay[day_num].day,
            groupedByDay[day_num].night,
          ];
          return shifts.map((shift, i, arr) => {
            validateShiftSelection(
              shift,
              arr,
              { computedRoster, selectedUser, selectedShifts },
              { groupedByDay },
            );
            return (
              <div
                key={shift.shift_id}
                className={`calendar__day 
                ${shiftBoxClass(shift)}
              `}
                onClick={(e) => handleDayClick(shift)}
              >
                <h3>
                  {shift.year}, {shift.month}/{shift.day_num}
                </h3>
                <p>Shift id: {shift.shift_id}</p>
                <p>Approved: {approvedStaffs(shift.shift_id)}</p>
                <p>Status: {shift.status}</p>
                <p>{getSelectedPriority(shift.shift_id)}</p>
                <br />
              </div>
            );
          });
        })}
      </div>
    );
  };

  const renderPriorities = () => {
    return (
      <div>
        <p>Unused Priorities : {unusedPriorities.state.join(", ")}</p>
      </div>
    );
  };
  return (
    <>
      <h2>Get Roster</h2>
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
      {renderCalendar()}
      {renderPriorities()}
    </>
  );
};

export default Roster;
