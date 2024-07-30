import { useState } from "react";

const useContextValues = () => {
  const [shiftStatus, setShiftStatus] = useState("open");
  const [shifts, setShifts] = useState([]);
  const [openShifts, setOpenShifts] = useState([]);
  const [closedShifts, setClosedShifts] = useState([]);
  const [requests, setRequests] = useState([]);
  const [computedRoster, setComputedRoster] = useState({
    allShifts: [],
    closed: [],
    conflicts: [],
    open: [],
    requests: [],
  });
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(1);
  const [selectedShifts, setSelectedShifts] = useState({});
  const [formData, setFormData] = useState({
    month: 8,
    year: 2024,
  });
  const [currentUserData, setCurrentUserData] = useState({
    id: 0,
    name: "",
    email: "",
  });
  const [unusedPriorities, setUnusedPriorities] = useState([]);

  return {
    computedRoster: {
      state: computedRoster,
      setData: setComputedRoster,
    },
    users: {
      state: users,
      setData: setUsers,
    },
    selectedUser: {
      state: selectedUser,
      setData: setSelectedUser,
    },
    selectedShifts: {
      state: selectedShifts,
      setData: setSelectedShifts,
    },
    formData: {
      state: formData,
      setData: setFormData,
    },
    unusedPriorities: {
      state: unusedPriorities,
      setData: setUnusedPriorities,
    },
  };
};

export default useContextValues;
