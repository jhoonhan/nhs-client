import React, { useEffect } from "react";
import { AppContext } from "App";
import { fetchAllUsers } from "../actions";
import { formatName } from "helpers/formatters";

const UserSelectionForm = ({ authority }) => {
  const { selectedUser, isLoggedIn, users } = React.useContext(AppContext);

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        await fetchAllUsers(isLoggedIn.state.accessToken, {
          setData: users.setData,
        });
      } catch (e) {
        console.error(e);
      }
    };
    getAllUsers();
  });
  const renderDummySelectors = () => {
    return users.state.map((user) => {
      const optionValue = `${user.user_id} - ${formatName(
        user.firstname,
        user.lastname,
        2,
      )}`;
      return (
        <option key={user.user_id} value={user.user_id}>
          {optionValue}
        </option>
      );
    });

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
