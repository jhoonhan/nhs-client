import React, { useEffect, useState } from "react";
import { computeRoster, getComputedRoster } from "../actions";
import { AppContext } from "App";
import Roster from "./Roster/Roster";
import UserSelectionForm from "./UserSelectionForm";

const ComputeRosterForm = ({ authority }) => {
  const { currentUser, formData, isLoggedIn } = React.useContext(AppContext);
  const [computed, setComputed] = useState(false);
  const [override, setOverride] = useState(0);

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

  const renderOverrideForm = () => {
    return (
      <form>
        <label>Override: </label>
        <select value={override} onChange={(e) => setOverride(e.target.value)}>
          <option value={1}>On</option>
          <option value={0}>Off</option>
        </select>
      </form>
    );
  };

  const render = () => {
    if (authority < 2) return <h2>No access.</h2>;

    return (
      <div className={"flex--v flex-gap--d"}>
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
        <UserSelectionForm authority={currentUser.state.authority} />
        {renderOverrideForm()}
        <Roster isManagerView={true} override={override} />
      </div>
    );
  };
  return render();
};

export default ComputeRosterForm;
