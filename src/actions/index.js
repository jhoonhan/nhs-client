import { API_URL } from "../config";
import server from "../server";

const generateHeader = (method, accessToken) => {
  return {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };
};
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
        rejected: [],
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
      groupedByShift[request.shift_id].rejected.push(request);
      groupedByUser[request.user_id].rejected.push(request);
    }
  });
  return { all: requests, groupedByShift, groupedByUser };
};

export const getComputedRoster = async (
  accessToken,
  setData,
  { month, year },
  compute,
) => {
  try {
    const res = await (
      await fetch(
        `${API_URL}/roster/${month}/${year}/${compute}`,
        generateHeader("GET", accessToken),
      )
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
 * @param accessToken string
 * @param requestList array
 * @param override boolean
 * @returns {Promise<void>}
 */
export const createRequestByList = async (
  accessToken,
  requestList,
  override,
) => {
  try {
    const res = await server.post(
      `/request/${override ? "1" : "0"}`,
      requestList,
      generateHeader("POST", accessToken),
    );
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchAllUsers = async (accessToken, { setData }) => {
  try {
    const res = await (
      await fetch(`${API_URL}/user`, generateHeader("GET", accessToken))
    ).json();
    setData(res.data);
    return res;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/** 8/5 Update
 * Fetch user by id and id_type
 * @param accessToken string
 * @param id
 * @param id_type int
 * @param state
 * @param setData
 * @returns {Promise<any>}
 */
export const fetchUserById = async (accessToken, id, id_type, { setData }) => {
  try {
    const res = await (
      await fetch(
        `${API_URL}/user/${id_type}/${id}`,
        generateHeader("GET", accessToken),
      )
    ).json();
    if (!res.data) throw new Error("No user found");
    setData(res.data);
    return res;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const loginUser = async (accessToken, data) => {
  try {
    return await (
      await fetch(`${API_URL}/user/login`, {
        ...generateHeader("POST", accessToken),
        body: JSON.stringify(data),
      })
    ).json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const inviteUser = async (accessToken, data) => {
  try {
    return await (
      await fetch(`${API_URL}/user/invite`, {
        ...generateHeader("POST", accessToken),
        body: JSON.stringify(data),
      })
    ).json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const putMethod = async (accessToken, url, data) => {
  try {
    return await (
      await fetch(`${API_URL}/${url}`, {
        ...generateHeader("PUT", accessToken),
        body: JSON.stringify(data),
      })
    ).json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
