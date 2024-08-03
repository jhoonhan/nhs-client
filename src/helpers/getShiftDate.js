const getShiftdate = (computedRosterState, shift_id, user_id) => {
  const shiftObj = computedRosterState.shifts.shifts[shift_id];

  return `${shiftObj.month}/${shiftObj.day_num}/${shiftObj.year}`;
};

export default getShiftdate;
