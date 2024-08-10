import React, { useEffect, useState } from "react";
import { putMethod } from "../../actions";

const UserUpdateForm = ({ selectedFormUser, accessToken, trigger }) => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [band, setBand] = useState(4);
  const [seniority, setSeniority] = useState(0);
  const [status, setStatus] = useState("pending");

  useEffect(() => {
    setFirstname(selectedFormUser.firstname);
    setLastname(selectedFormUser.lastname);
    setEmail(selectedFormUser.email);
    setBand(selectedFormUser.band);
    setSeniority(selectedFormUser.seniority);
    setStatus(selectedFormUser.status);
  }, [selectedFormUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // 8-10 deciding authority level of users
    const authorityLevel = () => {
      // If higher than manager, do not change authority level
      if (selectedFormUser.authority >= 2) {
        return selectedFormUser.authority;
      }

      if (status === "inactive") {
        return 0;
      } else if (status === "active") {
        return 1;
      } else {
        return 0;
      }
    };

    try {
      const res = await putMethod(accessToken, "user", {
        user_id: selectedFormUser.user_id,
        firstname,
        lastname,
        email,
        band,
        seniority,
        ms_id: selectedFormUser.ms_id,
        status: status,
        authority: authorityLevel(),
      });
      // 8-10 each time update is made, it triggers the parent component to fetch all users again.
      if (res.status === "success") {
        trigger.setData(!trigger.state);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const renderForm = () => {
    if (!selectedFormUser) {
      return <p>Select user above</p>;
    } else {
      return (
        <form
          className={"user-list__invite-form"}
          onSubmit={(e) => handleSubmit(e, "update")}
        >
          <label>Firstname:</label>
          <input
            type={"text"}
            placeholder={"First Name"}
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
          <label>Lastname:</label>
          <input
            type={"text"}
            placeholder={"Last Name"}
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
          <label>Email:</label>
          <input
            type={"email"}
            placeholder={"Email"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Band:</label>
          <select value={band} onChange={(e) => setBand(e.target.value)}>
            <option value={4}>4</option>
            <option value={5}>5</option>
            <option value={6}>6</option>
            <option value={7}>7</option>
          </select>

          <label>Seniority:</label>
          <input
            type={"number"}
            placeholder={"5"}
            value={seniority}
            onChange={(e) => setSeniority(e.target.value)}
          />

          <label>Status:</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value={"active"}>active</option>
            <option value={"pending"}>pending</option>
            <option value={"inactive"}>inactive</option>
          </select>

          <button type={"submit"}>Submit</button>
        </form>
      );
    }
  };
  return (
    <div>
      <h3>Update User:</h3>
      {renderForm()}
    </div>
  );
};

export default UserUpdateForm;
