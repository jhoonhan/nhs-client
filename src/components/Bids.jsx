import React, { useEffect, useState } from "react";
import { AppContext } from "App";
import Roster from "./Roster/Roster";
import UserSelectionForm from "./UserSelectionForm";
import OverrideForm from "components/OverrideForm";
import ComputeRosterForm from "components/ComputeRosterForm";

const Bids = ({ authority }) => {
  const { currentUser } = React.useContext(AppContext);
  const [override, setOverride] = useState(0);

  const render = () => {
    if (authority < 2) return <h2>No access.</h2>;

    return (
      <div className={"flex--v flex-gap--md"}>
        <div className={"flex--h flex-gap--md"}>
          <OverrideForm override={override} setOverride={setOverride} />
        </div>
        <Roster isManagerView={true} override={override} isBid={true} />
      </div>
    );
  };
  return render();
};

export default Bids;
