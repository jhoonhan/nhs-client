import React, { useEffect, useState } from "react";
import { AppContext } from "../App";
import {
  createRequestByList,
  getComputedRoster,
  overrideCreateRequestByList,
} from "../actions";
import { formatRequestObj } from "../helpers/formatters";
import getShiftdate from "../helpers/getShiftDate";

const RequestForm = ({ override }) => {
  const {
    computedRoster,
    formData,
    selectedUser,
    selectedShifts,
    unusedPriorities,
    isLoggedIn,
  } = React.useContext(AppContext);

  useEffect(() => {}, []);

  const handleRequestFormSubmit = async (e) => {
    e.preventDefault();
    try {
      // 8-12 override request creation
      // A new action is necessary as rejected requests are not removed from the list
      if (!override) {
        await createRequestByList(
          isLoggedIn.state.accessToken,
          formatRequestObj(selectedShifts.state),
        );
      } else {
        await overrideCreateRequestByList(
          isLoggedIn.state.accessToken,
          formatRequestObj(selectedShifts.state),
        );
      }
      await getComputedRoster(
        isLoggedIn.state.accessToken,
        computedRoster.setData,
        {
          month: formData.state.month,
          year: formData.state.year,
        },
        0,
      );
      selectedShifts.setData([]);
    } catch (error) {
      console.error(error);
    }
  };
  const renderUnusedPriorities = () => {
    if (unusedPriorities.state.length === 0) {
      return;
    }
    return (
      <div>
        <p>Available Requests: {unusedPriorities.state.length}</p>
        <p>Available Priorities : {unusedPriorities.state.join(", ")}</p>
        <p>
          Next Priority:{" "}
          {unusedPriorities.state[unusedPriorities.state.length - 1]}
        </p>
      </div>
    );
  };

  const renderSelectedShifts = () => {
    const rows = Object.keys(selectedShifts.state).map((shift_id) => {
      return (
        <tr key={shift_id}>
          <td>
            {getShiftdate(computedRoster.state, shift_id, selectedUser.state)}
          </td>
          <td>
            <p>
              {computedRoster.state.shifts.shifts[shift_id].is_day
                ? "Day"
                : "Night"}
            </p>
          </td>
          <td>
            <p>Priority : {selectedShifts.state[shift_id].priority}</p>
          </td>
        </tr>
      );
    });
    if (rows.length === 0) {
      return <span>Select the shift by clicking the circular button.</span>;
    }

    return (
      <table className={"reqeust-form__selected-shifts__table"}>
        <thead>
          <tr className={"thead-row"}>
            <td>Date</td>
            <td>Shift Type</td>
            <td>Priority</td>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  };
  return (
    <div className={"component__request-form"}>
      <h2>Make a Request</h2>

      {renderUnusedPriorities()}
      <form onSubmit={handleRequestFormSubmit}>
        <div className={"reqeust-form__selected-shifts"}>
          {renderSelectedShifts()}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default RequestForm;
