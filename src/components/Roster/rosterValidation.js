import groupShifts from "helpers/groupShifts";
import { MAX_REQUEST_PER_WEEK } from "config";

export const getCurrentWeekSelectedCount = (
  { selectedShifts, computedRoster },
  week_id,
) => {
  let count = 0;
  Object.keys(selectedShifts.state).forEach((shift_id) => {
    if (
      shift_id in computedRoster.state.shifts.shifts &&
      computedRoster.state.shifts.shifts[shift_id].week_id === week_id
    ) {
      count++;
    }
  });
  return count;
};

export const checkRequestStatus = (
  shift,
  groupedRequestByShift,
  selectedUser,
) => {
  if (shift.shift_id in groupedRequestByShift) {
    if (selectedUser in groupedRequestByShift[shift.shift_id].approved) {
      shift.selectable = 2;
      return false;
    } else if (selectedUser in groupedRequestByShift[shift.shift_id].pending) {
      shift.selectable = 3;
      return false;
    }
    return true;
  }
  return false;
};
export const checkSameDayRequest = (
  shift,
  arr,
  selectedUser,
  selectedShifts,
  groupedRequestByShift,
) => {
  let res = true;
  for (let i = 0; i < arr.length; i++) {
    let shiftEl = arr[i];
    if (
      shiftEl.shift_id in groupedRequestByShift &&
      (selectedUser.state in groupedRequestByShift[shiftEl.shift_id].approved ||
        selectedUser.state in groupedRequestByShift[shiftEl.shift_id].pending ||
        shiftEl.shift_id in selectedShifts.state)
    ) {
      if (!(shift.shift_id in selectedShifts.state)) shift.selectable = 0;
      res = false;
      break;
    }
  }
  return res;
};

export const checkConsecutiveShiftDay = (
  shift,
  arr,
  selectedUser,
  selectedShifts,
  groupedByDay,
  groupedRequestByShift,
) => {
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
      return false;
    }
  }
  return true;
};

export const checkConsecutiveShiftNight = (
  shift,
  groupedByDay,
  computedRoster,
  selectedUser,
  groupedRequestByShift,
  selectedShifts,
) => {
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
      return false;
    }
  }
  return true;
};

export const checkMoreThanThreeRequests = (
  shift,
  selectedUser,
  computedRoster,
  selectedShifts,
) => {
  const week_id = shift.week_id;
  const groupedRequestByUser = computedRoster.state.requests.groupedByUser;

  let userRequests = {};
  if (selectedUser.state in groupedRequestByUser) {
    userRequests = groupShifts(
      groupedRequestByUser[selectedUser.state].approved.concat(
        groupedRequestByUser[selectedUser.state].pending,
      ),
      "week",
    );
  }
  const userRequestForTheWeek =
    week_id in userRequests
      ? userRequests[week_id].length +
        getCurrentWeekSelectedCount({ selectedShifts, computedRoster }, week_id)
      : getCurrentWeekSelectedCount(
          { selectedShifts, computedRoster },
          week_id,
        );
  if (userRequestForTheWeek >= MAX_REQUEST_PER_WEEK) {
    shift.selectable = 0;
    return false;
  }
  return true;
};
export const checkIsOpen = (shift) => {
  if (shift.status !== "open") {
    shift.selectable = 0;
  }
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
  // 3 = RED | PENDING
  shift.selectable = 1;
  const groupedRequestByShift = computedRoster.state.requests.groupedByShift;

  // Check status of request
  if (!checkRequestStatus(shift, groupedRequestByShift, selectedUser.state)) {
    return;
  }
  // Check if either user has another request in the same day
  if (
    !checkSameDayRequest(
      shift,
      arr,
      selectedUser,
      selectedShifts,
      groupedRequestByShift,
    )
  ) {
    return;
  }

  // Check if previous day NIGHT when a DAY selected.
  if (
    !checkConsecutiveShiftDay(
      shift,
      arr,
      selectedUser,
      selectedShifts,
      groupedByDay,
      groupedRequestByShift,
    )
  ) {
    return;
  }

  // Check if next day DAY when a NIGHT selected.
  if (
    !checkConsecutiveShiftNight(
      shift,
      groupedByDay,
      computedRoster,
      selectedUser,
      groupedRequestByShift,
      selectedShifts,
    )
  ) {
    return;
  }

  // Check if user has more than 3 requests in a week
  if (
    !checkMoreThanThreeRequests(
      shift,
      selectedUser,
      computedRoster,
      selectedShifts,
    )
  ) {
    return;
  }
  // }

  // Check if shift is open or closed
  checkIsOpen(shift);
};
