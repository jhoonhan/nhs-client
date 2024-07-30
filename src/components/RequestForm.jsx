import React, { useState } from "react";
import { AppContext } from "../App";
import { createRequestByList } from "../actions";
import { formatRequestObj } from "../helpers/formatters";

const RequestForm = () => {
  const { selectedUser, selectedShifts } = React.useContext(AppContext);

  const handleRequestFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await createRequestByList(
        formatRequestObj(selectedShifts.state),
      );
    } catch (error) {
      console.error(error);
    }
  };

  const renderSelectedShifts = () => {
    return Object.keys(selectedShifts.state).map((shift_id) => {
      return (
        <ul key={shift_id}>
          <li>Shift Id :{shift_id}</li>
          <li>Priority : {selectedShifts.state[shift_id].priority}</li>
        </ul>
      );
    });
  };
  return (
    <>
      <h2>Make a Request</h2>
      <form onSubmit={handleRequestFormSubmit}>
        <label htmlFor="userId">User Id : {selectedUser.state}</label>
        <br />
        <br />
        <div>{renderSelectedShifts()}</div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default RequestForm;
