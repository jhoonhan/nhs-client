const groupShifts = (shifts, by) => {
  const data = {};
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
  return data;
};

export default groupShifts;
