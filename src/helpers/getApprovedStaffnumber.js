import { formatObjectToArray } from "./formatters";

const getApprovedStaffNumber = (shift_id, shifts) => {
  if (!(shift_id in shifts)) return "";
  return formatObjectToArray(shifts[shift_id].approved).length;
};

export default getApprovedStaffNumber;
