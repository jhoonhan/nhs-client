import { API_URL } from "../config";

export const fetchComputedRosterByMonthYear = async (
  state,
  setData,
  { month, year },
  compute,
) => {
  try {
    const res = await (
      await fetch(`${API_URL}/roster/${month}/${year}/${compute}`)
    ).json();
    setData(res.data);
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
