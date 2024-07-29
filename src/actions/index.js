import { API_URL } from "../config";

export const getComputedRoster = async (setData, { month, year }, compute) => {
  try {
    const res = await (
      await fetch(`${API_URL}/roster/${month}/${year}/${compute}`)
    ).json();

    if (res.status === "success" && res.data) {
      compute ? setData(true) : setData(res.data);
    }
    return res;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchRosterByMonthYear = (month, year) => {};

export const createRequest = async (shift_id, user_id, priority_user) => {};

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

export const fetchRequestsByMonthYear = async (setData, { month, year }) => {
  try {
    const res = await (
      await fetch(`${API_URL}/request-date/${month}/${year}`)
    ).json();
    const resObj = {};
    if (res.status === "success" && res.data) {
      res.data[0].forEach((request) => {
        if (!resObj[request.shift_id]) {
          resObj[request.shift_id] = { approved: {}, pending: {} };
        }

        if (request.status === "approved") {
          resObj[request.shift_id].approved[request.user_id] = request;
        } else {
          resObj[request.shift_id].pending[request.user_id] = request;
        }
      });
      setData(resObj);
    }
    return resObj;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
