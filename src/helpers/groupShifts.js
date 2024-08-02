/** Group shifts by day or week
 *
 * @param shifts array
 * @param by string
 * @returns {{}}
 */
const groupShifts = (shifts, by) => {
  const data = {};

  // when array is passed
  if (Array.isArray(shifts)) {
    if (by === "day") {
      shifts.forEach((shift) => {
        const isDay = shift.is_day ? "day" : "night";
        if (!data[shift.day_num]) {
          data[shift.day_num] = { day: {}, night: {} };
        }
        data[shift.day_num][isDay] = shift;
      });
    } else if (by === "week") {
      shifts.forEach((shift) => {
        if (!data[shift.week_id]) {
          data[shift.week_id] = [];
        }
        data[shift.week_id].push(shift);
      });
    } else if (by === "id") {
      shifts.forEach((shift) => {
        if (!data[shift.shift_id]) {
          data[shift.shift_id] = {};
        }
        data[shift.shift_id] = shift;
      });
    }
  } else {
    // When object is passed
    if (by === "day") {
      Object.keys(shifts).forEach((shift_id) => {
        const isDay = shifts[shift_id].is_day ? "day" : "night";
        if (!data[shifts[shift_id].day_num]) {
          data[shifts[shift_id].day_num] = {};
        }
        data[shifts[shift_id].day_num][isDay] = shifts[shift_id];
      });
    } else if (by === "week") {
      Object.keys(shifts).forEach((shift_id) => {
        if (!data[shifts[shift_id].week_id]) {
          data[shifts[shift_id].week_id] = [];
        }
        data[shifts[shift_id].week_id].push(shifts[shift_id]);
      });
    }
  }

  return data;
};

export default groupShifts;
