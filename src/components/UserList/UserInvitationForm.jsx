import React, { useState } from "react";
import { inviteUser } from "../../actions";
import { useMsal } from "@azure/msal-react";

const UserInvitationForm = () => {
  const { instance, accounts } = useMsal();

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [band, setBand] = useState(4);
  const [seniority, setSeniority] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await inviteUser(accounts[0].localAccountId, {
        firstname,
        lastname,
        email,
        band,
        seniority,
      });
      if (res.status === "success") {
        alert("User invited successfully.");
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const render = () => {
    return (
      <div className={"component"}>
        <h2>Invite New User</h2>
        <form className={"two-column"} onSubmit={handleSubmit}>
          <label>Firstname:</label>
          <input
            type={"text"}
            placeholder={"First Name"}
            required={true}
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
          <label>Lastname:</label>
          <input
            type={"text"}
            placeholder={"Last Name"}
            required={true}
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
          <label>Email:</label>
          <input
            type={"email"}
            placeholder={"Email"}
            required={true}
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
            placeholder={"0"}
            required={true}
            value={seniority}
            onChange={(e) => setSeniority(e.target.value)}
          />
          <button type={"submit"} className={"btn--primary"}>
            Invite
          </button>
        </form>
      </div>
    );
  };
  return render();
};

export default UserInvitationForm;
