import React from "react";
import { AppContext } from "App";

const UserSelectionForm = ({ authority }) => {
  const { selectedUser } = React.useContext(AppContext);
  const renderDummySelectors = () => {
    return Array.from({ length: 14 }, (_, i) => i + 1).map((value) => (
      <option key={value} value={value}>
        {value}
      </option>
    ));
  };

  // Manager View
  const handleUserSelect = async (e) => {
    e.preventDefault();
    selectedUser.setData(+e.target.value);
  };

  const render = () => {
    if (!authority) return <></>;
    return (
      <>
        <h2>Select User</h2>
        <form>
          <select
            id="user"
            value={selectedUser.state}
            onChange={handleUserSelect}
          >
            {renderDummySelectors()}
          </select>
        </form>
      </>
    );
  };

  return render();
};

export default UserSelectionForm;
