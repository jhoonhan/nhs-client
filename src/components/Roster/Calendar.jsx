import React, { useEffect, useState } from "react";
import { validateShiftSelection } from "./rosterValidation";
import { AppContext } from "App";
import groupShifts from "helpers/groupShifts";
import {
  capitalizeString,
  formatName,
  formatObjectToArray,
} from "helpers/formatters";
import getStaffRequestNumber from "helpers/getStaffRequestNumber";

const Calendar = ({ isManagerView }) => {
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
      return (
        <span className={`radio-selector disabled`}>
          {getSelectedPriority(shift.shift_id)}
        </span>
      );
    }

    return (
      <span
        className={`radio-selector ${status}`}
        onClick={(e) => {
          e.stopPropagation();
          handleDaySelectClick(e, shift);
        }}
      >
        {getSelectedPriority(shift.shift_id)}
      </span>
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
            className={`calendar__day__box 
                ${shiftBoxClass(shift)}
                ${shift.shift_id === selectedShift.state ? "detail" : ""}
              `}
            onClick={(e) => {
              selectedShift.setData(shift.shift_id);
            }}
          >
            <div className={"calendar__day__boxes__header"}>
              <span className={"calendar__day__boxes__header__title"}>
                {shift.is_day ? "D" : "N"}
              </span>
              {renderSelectRadio(shift)}
            </div>
            <div className={"calendar__day__box__info flex--v flex-gap--d"}>
              <p>
                Staffs:{" "}
                {getStaffRequestNumber(
                  shift.shift_id,
                  computedRoster.state.requests.groupedByShift,
                  "approved",
                )}
                /{shift.min_staff}
              </p>
              <p>{capitalizeString(shift.status)}</p>
              {/*  Get User Request list  */}
              {renderUserRequestLists(shift.shift_id, "approved")}
              {renderUserRequestLists(shift.shift_id, "pending")}
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

  const renderUserRequestLists = (shift_id, status) => {
    if (!(shift_id in computedRoster.state.requests.groupedByShift)) return;
    const requests =
      computedRoster.state.requests.groupedByShift[shift_id][status];
    if (!requests || requests.length === 0) return "";

    return (
      <div className={"calendar__day__box__requests flex--v flex-gap--d"}>
        <h4>{status} :</h4>
        {formatObjectToArray(requests).map((request, i) => {
          return (
            <div key={i} className={`box__request flex--h ${status}`}>
              <p key={request.request_id}>
                {formatName(request.firstname, request.lastname, 1)}
              </p>
            </div>
          );
        })}
      </div>
    );
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
