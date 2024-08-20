import { useState } from "react";
import useUnusedPriorities from "hooks/useUnusedPriorities";
import useSignIn from "hooks/useSignIn";

const useContextValues = () => {
  const [computedRoster, setComputedRoster] = useState({
    closed: [],
    conflicts: [],
    monthData: {},
    open: [],
    requests: { all: [], groupedByShift: {}, groupedByUser: {} },
    shifts: {
      shifts: {},
      id_range: { start: 0, end: 0 },
      week_range: { start: 0, end: 0 },
    },
    userData: {},
  });
  const [users, setUsers] = useState([]);

  const [selectedUser, setSelectedUser] = useState(0);
  const [selectedShift, setSelectedShift] = useState(0);
  const [selectedShifts, setSelectedShifts] = useState([]);
  const [formData, setFormData] = useState({
    month: 8,
    year: 2024,
  });
  const [accessToken, setAccessToken] = useState(null);

  const [unusedPriorities, setUnusedPriorities] = useUnusedPriorities(
    computedRoster.requests.groupedByUser,
    selectedUser,
  );
  const isLoggedIn = useSignIn();

  return {
    isLoggedIn: {
      state: isLoggedIn,
    },
    accessToken: {
      state: accessToken,
      setData: setAccessToken,
    },
    computedRoster: {
      state: computedRoster,
      setData: setComputedRoster,
    },
    users: {
      state: users,
      setData: setUsers,
    },
    currentUser: {
      state: isLoggedIn.currentUser,
    },
    selectedUser: {
      state: selectedUser,
      setData: setSelectedUser,
    },
    selectedShift: {
      state: selectedShift,
      setData: setSelectedShift,
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
