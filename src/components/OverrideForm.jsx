import React from "react";

const OverrideForm = ({ override, setOverride }) => {
  const render = () => {
    return (
      <div className={"component"}>
        <h2>Override</h2>
        <form>
          <select
            value={override}
            onChange={(e) => setOverride(e.target.value)}
          >
            <option value={1}>On</option>
            <option value={0}>Off</option>
          </select>
        </form>
      </div>
    );
  };
  return render();
};

export default OverrideForm;
