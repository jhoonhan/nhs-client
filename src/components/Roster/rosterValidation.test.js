import {
  checkConsecutiveShiftDay,
  checkConsecutiveShiftNight,
  checkMoreThanThreeRequests,
  checkIsOpen,
} from "components/Roster/rosterValidation.js";

describe("Roster Validation", () => {
  describe("checkConsecutiveShiftDay", () => {
    it("should set shift selectable to 0 if user has a night shift on the previous day", () => {
      const shift = { shift_id: "1", is_day: true, day_num: 2 };
      const arr = [];
      const selectedUser = { state: "1" };
      const selectedShifts = { state: { 2: true } };
      const groupedByDay = { 1: { night: { shift_id: "2" } } };
      const groupedRequestByShift = { 2: { approved: { 1: true } } };

      const result = checkConsecutiveShiftDay(
        shift,
        arr,
        selectedUser,
        selectedShifts,
        groupedByDay,
        groupedRequestByShift,
      );

      expect(shift.selectable).toBe(0);
      expect(result).toBe(false);
    });

    it("should return true if user has no night shift on the previous day", () => {
      const shift = { shift_id: "1", is_day: true, day_num: 2 };
      const arr = [];
      const selectedUser = { state: "1" };
      const selectedShifts = { state: {} };
      const groupedByDay = { 1: { night: { shift_id: "2" } } };
      const groupedRequestByShift = {};

      const result = checkConsecutiveShiftDay(
        shift,
        arr,
        selectedUser,
        selectedShifts,
        groupedByDay,
        groupedRequestByShift,
      );

      expect(result).toBe(true);
    });
  });

  describe("checkConsecutiveShiftNight", () => {
    it("should set shift selectable to 0 if user has a day shift on the next day", () => {
      const shift = { shift_id: "1", is_day: false, day_num: 1 };
      const groupedByDay = { 2: { day: { shift_id: "2" } } };
      const computedRoster = {
        state: {
          requests: { groupedByShift: { 2: { approved: { 1: true } } } },
        },
      };
      const selectedUser = { state: "1" };
      const groupedRequestByShift = { 2: { approved: { 1: true } } };
      const selectedShifts = { state: { 2: true } };

      const result = checkConsecutiveShiftNight(
        shift,
        groupedByDay,
        computedRoster,
        selectedUser,
        groupedRequestByShift,
        selectedShifts,
      );

      expect(shift.selectable).toBe(0);
      expect(result).toBe(false);
    });

    it("should return true if user has no day shift on the next day", () => {
      const shift = { shift_id: "1", is_day: false, day_num: 1 };
      const groupedByDay = { 2: { day: { shift_id: "2" } } };
      const computedRoster = { state: { requests: { groupedByShift: {} } } };
      const selectedUser = { state: "1" };
      const groupedRequestByShift = {};
      const selectedShifts = { state: {} };

      const result = checkConsecutiveShiftNight(
        shift,
        groupedByDay,
        computedRoster,
        selectedUser,
        groupedRequestByShift,
        selectedShifts,
      );

      expect(result).toBe(true);
    });
  });

  describe("checkIsOpen", () => {
    it("should set shift selectable to 0 if shift is not open", () => {
      const shift = { shift_id: "1", status: "closed" };

      checkIsOpen(shift);

      expect(shift.selectable).toBe(0);
    });

    it("should not change shift selectable if shift is open", () => {
      const shift = { shift_id: "1", status: "open", selectable: 1 };

      checkIsOpen(shift);

      expect(shift.selectable).toBe(1);
    });
  });
});
