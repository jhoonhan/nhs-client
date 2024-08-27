import React from "react";
import { getComputedRoster } from "../../actions";
import { AppContext } from "../../App";

const RosterSelectionForm = () => {
  const { computedRoster, isLoggedIn, formData } = React.useContext(AppContext);
  const handleRosterFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await getComputedRoster(
        isLoggedIn.state.accessToken,
        computedRoster.setData,
        {
          month: formData.state.month,
          year: formData.state.year,
        },
        0,
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
  const render = () => {
    return (
      <div className={"component"}>
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
  return render();
};

export default RosterSelectionForm;
