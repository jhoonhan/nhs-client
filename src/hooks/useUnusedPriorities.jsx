import { useEffect, useState } from "react";
import { PRIORITY_RANGE } from "../config";

const getUnusedPriorities = (requests, selectedUser) => {
  let approvedAndPendingRequests = requests[selectedUser]?.approved.concat(
    requests[selectedUser]?.pending,
  );
  if (!approvedAndPendingRequests) {
    approvedAndPendingRequests = [];
  }

  const range = Array.from({ length: PRIORITY_RANGE }, (_, i) => i + 1);

  // Map requests to an array of priority_user values
  const priorities = approvedAndPendingRequests.map(
    (request) => request.priority_user,
  );

  // Filter out those that exist in the priorities array
  return range.filter((num) => !priorities.includes(num));
};

/** Hook to get unused priorities for a user
 * @param requests array
 * @param selectedUser int
 * @returns {[*[],(value: (((prevState: *[]) => *[]) | *[])) => void]}
 */
const useUnusedPriorities = (requests, selectedUser) => {
  const [unusedPriorities, setUnusedPriorities] = useState([]);
  useEffect(() => {
    const data = getUnusedPriorities(requests, selectedUser);
    setUnusedPriorities(data);
  }, [requests, selectedUser]);

  return [unusedPriorities, setUnusedPriorities];
};

export default useUnusedPriorities;
