import { API_URL } from "../config";

export const fetchShifts = async (state, setData) => {
  try {
    const res = await (await fetch(`${API_URL}/get-all-request`)).json();
    setData(res.data);
    return res;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchShiftsByMonthYear = async (
  state,
  setData,
  { month, year },
) => {
  try {
    const res = await (
      await fetch(`${API_URL}/get-computed-shift/${month}/${year}`)
    ).json();
    setData(res.data);
    return res;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

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
