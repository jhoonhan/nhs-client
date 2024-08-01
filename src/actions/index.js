import { API_URL } from "../config";
import server from "../server";

const formatRequests = ({ requests, shifts }) => {
  // 7/30 Fix
  const groupedByShift = {};
  const groupedByUser = {};

  // First create empty object with all shift_id
  Object.keys(shifts.shifts).forEach((shift_id) => {
    if (!groupedByShift[shift_id]) {
      groupedByShift[shift_id] = {
        approved: {},
        pending: {},
        rejected: {},
      };
    }
  });

  requests.forEach((request) => {
    if (!groupedByUser[request.user_id]) {
      groupedByUser[request.user_id] = {
        approved: [],
        pending: [],
        rejected: [],
      };
    }
    if (request.status === "approved") {
      groupedByShift[request.shift_id].approved[request.user_id] = request;
      groupedByUser[request.user_id].approved.push(request);
    } else if (request.status === "pending") {
      groupedByShift[request.shift_id].pending[request.user_id] = request;
      groupedByUser[request.user_id].pending.push(request);
    } else {
      groupedByShift[request.shift_id].rejected[request.user_id] = request;
      groupedByUser[request.user_id].rejected.push(request);
    }
  });
  return { all: requests, groupedByShift, groupedByUser };
};

export const getComputedRoster = async (setData, { month, year }, compute) => {
  try {
    const res = await (
      await fetch(`${API_URL}/roster/${month}/${year}/${compute}`)
    ).json();

    let requests = {};
    if (res.status === "success" && res.data) {
      requests = formatRequests(res.data);
      compute ? setData(true) : setData({ ...res.data, requests });
    }
    return { ...res.data, requests };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/** 7/30 Feature
 * Create requests in batch by list
 * @param requestList array
 * @returns {Promise<void>}
 */
export const createRequestByList = async (requestList) => {
  try {
    const res = await server.post("/request/create-by-list", requestList);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchAllUsers = async ({ state, setData }) => {
  try {
    const res = await (await fetch(`${API_URL}/get-all-user`)).json();
    setData(res.data);
    return res;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateShift = async (shift_id, data) => {
  try {
    return await (
      await fetch(`${API_URL}/approve-shift`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ shift_id, data }),
      })
    ).json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
