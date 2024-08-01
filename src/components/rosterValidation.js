import groupShifts from "../helpers/groupShifts";
import { MAX_REQUEST_PER_WEEK } from "../config";

const getCurrentWeekSelectedCount = (
  { selectedShifts, computedRoster },
  week_id,
) => {
  let count = 0;
  Object.keys(selectedShifts.state).forEach((shift_id) => {
    if (computedRoster.state.shifts.shifts[shift_id].week_id === week_id) {
      count++;
    }
  });
  return count;
};

export const validateShiftSelection = (
  shift,
  arr,
  { computedRoster, selectedUser, selectedShifts },
  { groupedByDay },
) => {
  // 0 = GREY | DISABLED
  // 1 = WHITE | AVAILABLE
  // 2 = BLUE | APPROVED
  // 3 = RED | REQUESTED
  shift.selectable = 1;
  const week_id = shift.week_id;
  const groupedRequestByShift = computedRoster.state.requests.groupedByShift;
  const groupedRequestByUser = computedRoster.state.requests.groupedByUser;

  if (selectedUser.state in groupedRequestByShift[shift.shift_id].approved) {
    shift.selectable = 2;
    return;
  } else if (
    selectedUser.state in groupedRequestByShift[shift.shift_id].pending
  ) {
    shift.selectable = 3;
    return;
  }

  // Check if either user has booked in day or night shift
  for (let i = 0; i < arr.length; i++) {
    let shiftEl = arr[i];
    if (
      shiftEl.shift_id in groupedRequestByShift &&
      (selectedUser.state in groupedRequestByShift[shiftEl.shift_id].approved ||
        selectedUser.state in groupedRequestByShift[shiftEl.shift_id].pending ||
        shiftEl.shift_id in selectedShifts.state)
    ) {
      if (!(shift.shift_id in selectedShifts.state)) shift.selectable = 0;
      return;
    }
  }

  // Check if previous day NIGHT when DAY selected.
  if (shift.is_day && groupedByDay[shift.day_num - 1]) {
    const prevDay = groupedByDay[shift.day_num - 1];
    if (
      prevDay.night.shift_id in groupedRequestByShift &&
      (selectedUser.state in
        groupedRequestByShift[prevDay.night.shift_id].approved ||
        selectedUser.state in
          groupedRequestByShift[prevDay.night.shift_id].pending ||
        prevDay.night.shift_id in selectedShifts.state)
    ) {
      shift.selectable = 0;
      return;
    }
  }

  // Check if next day DAY when NIGHT selected.
  if (!shift.is_day && groupedByDay[shift.day_num + 1]) {
    const nextDay = groupedByDay[shift.day_num + 1];
    if (
      nextDay.day.shift_id in computedRoster.state.requests.groupedByShift &&
      (selectedUser.state in
        groupedRequestByShift[nextDay.day.shift_id].approved ||
        selectedUser.state in
          groupedRequestByShift[nextDay.day.shift_id].pending ||
        nextDay.day.shift_id in selectedShifts.state)
    ) {
      shift.selectable = 0;
      return;
    }
  }

  // Check if user has more than 3 shifts in a week
  const userRequests = groupShifts(
    groupedRequestByUser[selectedUser.state].approved.concat(
      groupedRequestByUser[selectedUser.state].pending,
    ),
    "week",
  );
  let userRequestForTheWeek =
    week_id in userRequests
      ? userRequests[week_id].length +
        getCurrentWeekSelectedCount({ selectedShifts, computedRoster }, week_id)
      : getCurrentWeekSelectedCount(
          { selectedShifts, computedRoster },
          week_id,
        );
  if (userRequestForTheWeek >= MAX_REQUEST_PER_WEEK) {
    shift.selectable = 0;
    return;
  }

  // Check if open or closed
  if (shift.status !== "open") {
    shift.selectable = 0;
  }
};
