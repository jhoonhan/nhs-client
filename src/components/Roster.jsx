import React, { useState, useEffect } from "react";
import { AppContext } from "../App";
import groupShifts from "helpers/groupShifts";
import { getComputedRoster } from "../actions";
import { PRIORITY_RANGE } from "../config";

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
    setGroupedByDay(groupShifts(computedRoster.state.allShifts, "day"));
    setGroupedByWeek(groupShifts(computedRoster.state.allShifts, "week"));
  }, [computedRoster.state.allShifts]);

  const validateShiftSelection = (shift, arr) => {
    // 0 = GREY | DISABLED
    // 1 = WHITE | AVAILABLE
    // 2 = BLUE | APPROVED
    // 3 = RED | REQUESTED
    shift.selectable = 1;
    const groupedShifts = computedRoster.state.requests.groupedByShift;

    if (selectedUser.state in groupedShifts[shift.shift_id].approved) {
      shift.selectable = 2;
      return;
    } else if (selectedUser.state in groupedShifts[shift.shift_id].pending) {
      shift.selectable = 3;
      return;
    }

    // Check if either user has booked in day or night shift
    for (let i = 0; i < arr.length; i++) {
      let shiftEl = arr[i];
      if (
        shiftEl.shift_id in groupedShifts &&
        (selectedUser.state in groupedShifts[shiftEl.shift_id].approved ||
          selectedUser.state in groupedShifts[shiftEl.shift_id].pending ||
          shiftEl.shift_id in selectedShifts.state)
      ) {
        if (!(shift.shift_id in selectedShifts.state)) shift.selectable = 0;
        return;
      }
    }

    // Check if previous day NIGHT when DAY selected.
    if (shift.is_day && groupedByDay[shift.day_num - 1]) {
      const prevDay = groupedByDay[shift.day_num - 1];
      if (
        prevDay.night.shift_id in groupedShifts &&
        (selectedUser.state in groupedShifts[prevDay.night.shift_id].approved ||
          selectedUser.state in groupedShifts[prevDay.night.shift_id].pending ||
          prevDay.night.shift_id in selectedShifts.state)
      ) {
        shift.selectable = 0;
        return;
      }
    }

    // Check if next day DAY when NIGHT selected.
    if (!shift.is_day && groupedByDay[shift.day_num + 1]) {
      const nextDay = groupedByDay[shift.day_num + 1];
      if (
        nextDay.day.shift_id in computedRoster.state.requests.groupedByShift &&
        (selectedUser.state in groupedShifts[nextDay.day.shift_id].approved ||
          selectedUser.state in groupedShifts[nextDay.day.shift_id].pending ||
          nextDay.day.shift_id in selectedShifts.state)
      ) {
        shift.selectable = 0;
        return;
      }
    }

    // TODO: Check if user has more than 3 shifts in a week
    const userShifts = groupedByWeek[shift.week_id].filter((shift) => {
      return shift.approvedStaffs.includes(selectedUser.state);
    });

    // Check if open or closed
    if (shift.status !== "open") {
      shift.selectable = 0;
    }

    // Check if request pending
  };

  const handleRosterFormSubmit = async (e) => {
    e.preventDefault();
    const res = await getComputedRoster(
      computedRoster.setData,
      {
        month: formData.state.month,
        year: formData.state.year,
      },
      0,
    );
    const rejectedRequests =
      res.requests.groupedByUser[selectedUser.state].rejected;

    const userRequest = res.requests.groupedByUser[selectedUser.state];

    const approvedAndPendingRequests = userRequest.approved.concat(
      userRequest.pending,
    );

    const range = Array.from({ length: PRIORITY_RANGE }, (_, i) => i + 1);
    //
    // // Map requests to an array of priority_user values
    const priorities = approvedAndPendingRequests.map(
      (request) => request.priority_user,
    );

    // Filter out those that exist in the priorities array
    const unusedPriorityList = range.filter((num) => !priorities.includes(num));

    unusedPriorities.setData(unusedPriorityList);

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
            priority: unusedPriorities.state[unusedPriorities.state.length - 1],
          },
        });
        const temp = [...unusedPriorities.state];
        temp.pop();
        unusedPriorities.setData(temp);
      } else {
        const priority = selectedShifts.state[shift_id].priority;
        unusedPriorities.setData([...unusedPriorities.state, priority]);

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
