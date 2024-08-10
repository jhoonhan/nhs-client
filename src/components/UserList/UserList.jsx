import React, { useEffect, useState } from "react";
import { fetchAllUsers } from "actions";
import { AppContext } from "App";
import { formatName } from "helpers/formatters";

import UserInvitationForm from "./UserInvitationForm";
import UserUpdateForm from "./UserUpdateForm";

const UserList = ({ authority }) => {
  const { isLoggedIn, users } = React.useContext(AppContext);
  const [selectedPageUser, setSelectedPageUser] = useState({
    user_id: 0,
    firstname: "",
    lastname: "",
    email: "",
    band: 4,
    seniority: 0,
  });
  const [triggerGetAllUser, setTriggerGetAllUser] = useState(false);

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
    // 8-10 each time update is made, it triggers the parent component to fetch all users again.
  }, [triggerGetAllUser]);

  // useEffect(() => {
  //   console.log(selectedPageUser);
  // }, [selectedPageUser]);

  const getUserData = (user_id) => {
    return users.state.find((user) => user.user_id === user_id);
  };
  const renderUsers = () => {
    // 8-10 filter out inactive users.
    const getBoxClassName = (user) => {
      const className = [];
      if (selectedPageUser.user_id === user.user_id) {
        className.push("active");
      }
      if (user.status === "inactive") {
        className.push("disabled");
      } else if (user.status === "pending") {
        className.push("pending");
      }
      return className.join(" ");
    };
    return users.state.map((user) => {
      return (
        <ul
          key={user.user_id}
          className={getBoxClassName(user)}
          onClick={() => setSelectedPageUser(getUserData(user.user_id))}
        >
          <li>
            <p>Name: {formatName(user.firstname, user.lastname, 2)}</p>
          </li>
          <li>
            <p>Email: {user.email}</p>
          </li>
          <li>
            <p>Band: {user.band}</p>
          </li>
          <li>
            <p>Id: {user.user_id}</p>
          </li>
          <li>
            <p>Status: {user.status}</p>
          </li>
          <li>
            <p>Authority: {user.authority}</p>
          </li>
        </ul>
      );
    });
  };

  const render = () => {
    if (authority < 2) return <h3>No access.</h3>;
    return (
      <div className={"page__user-list flex--v flex-gap--lg"}>
        <div>
          <h3>Users:</h3>
          <div className={"user-list__users"}>{renderUsers()}</div>
        </div>
        {
          <UserUpdateForm
            selectedFormUser={selectedPageUser}
            accessToken={isLoggedIn.state.accessToken}
            trigger={{
              state: triggerGetAllUser,
              setData: setTriggerGetAllUser,
            }}
          />
        }
        {<UserInvitationForm />}
      </div>
    );
  };

  return render();
};

export default UserList;
