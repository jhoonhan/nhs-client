import { formatObjectToArray } from "./formatters";

const getStaffRequestNumber = (shift_id, shifts, status) => {
  if (!(shift_id in shifts)) return "";

  if (status === "approved") {
    return formatObjectToArray(shifts[shift_id].approved).length;
  } else if (status === "pending") {
    return formatObjectToArray(shifts[shift_id].pending).length;
  }
};

export default getStaffRequestNumber;
