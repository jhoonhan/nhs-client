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
import ShiftBox from "components/Roster/ShiftBox";

const Calendar = ({ isManagerView, override, isBid }) => {
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
        return <ShiftBox shift={shift} override={override} />;
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
