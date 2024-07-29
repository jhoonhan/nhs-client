import React, { useState } from "react";
import { computeRoster, getComputedRoster } from "../actions";
import { AppContext } from "../App";

const ComputeRosterForm = (props) => {
  const { computedRoster, formData } = React.useContext(AppContext);
  const [computed, setComputed] = useState(false);
  const renderRosterForm = () => {
    const handleRosterFormSubmit = async (e) => {
      e.preventDefault();
      try {
        await getComputedRoster(
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
      <>
        <h2>Compute Roster</h2>
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
        <div>
          <p>{`Computed: ${computed}`}</p>
        </div>
      </>
    );
  };
  return renderRosterForm();
};

export default ComputeRosterForm;
