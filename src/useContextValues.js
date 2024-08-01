import { useState } from "react";
import useUnusedPriorities from "./hooks/useUnusedPriorities";

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
  const [selectedUser, setSelectedUser] = useState(1);
  const [selectedShifts, setSelectedShifts] = useState({});
  const [formData, setFormData] = useState({
    month: 8,
    year: 2024,
  });

  const [unusedPriorities, setUnusedPriorities] = useUnusedPriorities(
    computedRoster.requests.groupedByUser,
    selectedUser,
  );

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
