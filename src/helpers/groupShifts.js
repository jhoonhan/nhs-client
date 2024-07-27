const groupShifts = (shifts, by) => {
  const data = {};
  if (by === "day") {
    shifts.forEach((shift) => {
      const isDay = shift.is_day ? "day" : "night";
      if (!data[shift.day_num]) {
        data[shift.day_num] = {};
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
  }
  return data;
};

export default groupShifts;
