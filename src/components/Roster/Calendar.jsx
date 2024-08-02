import React, { useEffect, useState } from "react";
import { validateShiftSelection } from "./rosterValidation";
import { AppContext } from "App";
import groupShifts from "helpers/groupShifts";
import { capitalizeString, formatObjectToArray } from "helpers/formatters";
import getApprovedStaffNumber from "helpers/getApprovedStaffnumber";

const Calendar = () => {
  const {
    computedRoster,
    selectedUser,
    selectedShift,
    selectedShifts,
    unusedPriorities,
  } = React.useContext(AppContext);

  const [groupedByDay, setGroupedByDay] = useState({});

  useEffect(() => {
    setGroupedByDay(groupShifts(computedRoster.state.shifts.shifts, "day"));
  }, [computedRoster.state.shifts.shifts]);

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

  const getSelectedPriority = (shift_id) => {
    if (shift_id in selectedShifts.state) {
      return selectedShifts.state[shift_id].priority;
    }

    if (!(selectedUser.state in computedRoster.state.requests.groupedByUser))
      return "";

    const activeRequests = groupShifts(
      computedRoster.state.requests.groupedByUser[
        selectedUser.state
      ].approved.concat(
        computedRoster.state.requests.groupedByUser[selectedUser.state].pending,
      ),
      "id",
    );
    if (shift_id in activeRequests) {
      return activeRequests[shift_id].priority_user;
    }
  };

  const handleDaySelectClick = (e, { shift_id, selectable }) => {
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

  const renderSelectRadio = (shift) => {
    let status = "";

    if (shift.shift_id in selectedShifts.state) {
      status = "selected";
    }

    if (shift.selectable !== 1) {
      return "";
    }

    return (
      <span
        className={`radio-selector ${status}`}
        onClick={(e) => {
          e.stopPropagation();
          handleDaySelectClick(e, shift);
        }}
      />
    );
  };

  const renderDayBoxes = () => {
    return Object.keys(groupedByDay).map((day_num, index) => {
      const shifts = [groupedByDay[day_num].day, groupedByDay[day_num].night];
      const dayBoxes = shifts.map((shift, i, arr) => {
        validateShiftSelection(
          shift,
          arr,
          { computedRoster, selectedUser, selectedShifts },
          { groupedByDay },
        );
        return (
          <div
            key={shift.shift_id}
            className={`calendar__day__boxes__box 
                ${shiftBoxClass(shift)}
                ${shift.shift_id === selectedShift.state ? "detail" : ""}
              `}
            onClick={(e) => {
              selectedShift.setData(shift.shift_id);
            }}
          >
            <div className={"calendar__day__boxes__header"}>
              <span className={"calendar__day__boxes__header__title"}>
                {shift.is_day ? "Day" : "Night"}
              </span>
              {renderSelectRadio(shift)}
            </div>
            <div className={"calendar__day__boxes__box__info"}>
              <p>
                Staffs:{" "}
                {getApprovedStaffNumber(
                  shift.shift_id,
                  computedRoster.state.requests.groupedByShift,
                )}
                /{shift.min_staff}
              </p>
              <p>{capitalizeString(shift.status)}</p>
              <p>{getSelectedPriority(shift.shift_id)}</p>
            </div>
          </div>
        );
      });
      return (
        <div key={`${day_num}${index}`} className={"calendar__day"}>
          <h4>8/{day_num}</h4>
          <div className={"calendar__day__boxes"}>{dayBoxes}</div>
        </div>
      );
    });
  };

  const render = () => {
    return (
      <div className="calendar">
        <span>Sunday</span>
        <span>Monday</span>
        <span>Tuesday</span>
        <span>Wednesday</span>
        <span>Thursday</span>
        <span>Friday</span>
        <span>Saturday</span>
        {renderDayBoxes()}
      </div>
    );
  };

  return render();
};

export default Calendar;
