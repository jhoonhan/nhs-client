import { useState } from "react";

const useContextValues = () => {
  const [shiftStatus, setShiftStatus] = useState("open");
  const [shifts, setShifts] = useState([]);
  const [openShifts, setOpenShifts] = useState([]);
  const [closedShifts, setClosedShifts] = useState([]);
  const [computedShifts, setComputedShifts] = useState({
    allRequests: [],
    closed: [],
    conflicts: [],
    open: [],
  });
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(1);
  const [selectedShift, setSelectedShift] = useState(1);
  const [formData, setFormData] = useState({
    month: 8,
    year: 2024,
  });

  return {
    computedShifts: {
      state: computedShifts,
      setData: setComputedShifts,
    },
    users: {
      state: users,
      setData: setUsers,
    },
    selectedUser: {
      state: selectedUser,
      setData: setSelectedUser,
    },
    selectedShift: {
      state: selectedShift,
      setData: setSelectedShift,
    },
    formData: {
      state: formData,
      setData: setFormData,
    },
  };
};

export default useContextValues;
