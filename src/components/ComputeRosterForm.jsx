import React, { useState } from "react";
import { getComputedRoster } from "actions";
import { AppContext } from "../App";

const ComputeRosterForm = () => {
  const { formData, isLoggedIn } = React.useContext(AppContext);
  const [computed, setComputed] = useState(false);

  const handleRosterFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await getComputedRoster(
        isLoggedIn.state.accessToken,
        setComputed,
        {
          month: formData.state.month,
          year: formData.state.year,
        },
        1,
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
  return (
    <div className={"component"}>
      <h2>Compute Roster</h2>
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

export default ComputeRosterForm;
