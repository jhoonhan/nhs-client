import React from "react";
import { AppContext } from "../App";
import groupShifts from "helpers/groupShifts";
import { fetchRosterByMonthYear } from "../actions";

const Roster = () => {
  const { computedShifts, selectedUser, selectedShift, formData } =
    React.useContext(AppContext);
  const groupedByDay = groupShifts(computedShifts.state.allRequests, "day");
  const groupedByWeek = groupShifts(computedShifts.state.allRequests, "week");

  const validateShiftSelection = (shift, arr) => {
    shift.selectable = 1;
    if (shift.approvedStaffs.includes(selectedUser.state)) {
      shift.selectable = 2;
      return;
    }
    // Check if open or closed
    if (shift.status !== "open") {
      shift.selectable = 0;
      return;
    }
    // Check if either user has booked in day or night shift
    arr.forEach((shiftEl) => {
      if (shiftEl.approvedStaffs.includes(selectedUser.state)) {
        shift.selectable = 0;
      }
    });

    // Check if previous day NIGHT when DAY selected.
    if (shift.is_day && groupedByDay[shift.day_num - 1]) {
      const prevDay = groupedByDay[shift.day_num - 1];
      if (prevDay.night.approvedStaffs.includes(selectedUser.state)) {
        shift.selectable = 0;
        return;
      }
    }

    // Check if next day DAY when NIGHT selected.
    if (!shift.is_day && groupedByDay[shift.day_num + 1]) {
      const nextDay = groupedByDay[shift.day_num + 1];
      if (nextDay.day.approvedStaffs.includes(selectedUser.state)) {
        shift.selectable = 0;
        return;
      }
    }

    // TODO: Check if user has more than 3 shifts in a week
    const userShifts = groupedByWeek[shift.week_id].filter((shift) => {
      return shift.approvedStaffs.includes(selectedUser.state);
    });
  };

  const handleRosterFormSubmit = async (e) => {
    e.preventDefault();
    await fetchRosterByMonthYear();
    try {
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

  const shiftBoxClass = (shift) => {
    if (shift.selectable === 0) {
      return "disabled";
    } else if (shift.selectable === 2) {
      return "approved";
    }
  };

  const renderCalendar = () => {
    return (
      <div className="calendar">
        {Object.keys(groupedByDay).map((day_num) => {
          const shifts = [
            groupedByDay[day_num].day,
            groupedByDay[day_num].night,
          ];
          return shifts.map((shift, i, arr) => {
            validateShiftSelection(shift, arr);
            return (
              <div
                key={shift.shift_id}
                className={`calendar__day 
                ${shiftBoxClass(shift)}
              `}
                onClick={(e) => selectedShift.setData(shift.shift_id)}
              >
                <h3>
                  {shift.year}, {shift.month}/{shift.day_num}
                </h3>
                <p>Shift id: {shift.shift_id}</p>
                <p>Approved Staffs: {shift.approvedStaffs.join(",")}</p>
                <p>Status: {shift.status}</p>
                <br />
              </div>
            );
          });
        })}
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
    </>
  );
};

export default Roster;
