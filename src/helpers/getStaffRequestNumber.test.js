import getStaffRequestNumber from "helpers/getStaffRequestNumber";

describe("getStaffRequestNumber", () => {
  it("should correctly get the number of approved requests", () => {
    const shifts = {
      1: {
        approved: { 1: {}, 2: {} },
        pending: { 3: {} },
      },
    };
    const shift_id = "1";
    const status = "approved";

    const result = getStaffRequestNumber(shift_id, shifts, status);

    expect(result).toBe(2);
  });

  it("should correctly get the number of pending requests", () => {
    const shifts = {
      1: {
        approved: { 1: {}, 2: {} },
        pending: { 3: {} },
      },
    };
    const shift_id = "1";
    const status = "pending";

    const result = getStaffRequestNumber(shift_id, shifts, status);

    expect(result).toBe(1);
  });

  it("should return an empty string if shift_id does not exist in shifts", () => {
    const shifts = {};
    const shift_id = "1";
    const status = "approved";

    const result = getStaffRequestNumber(shift_id, shifts, status);

    expect(result).toBe("");
  });
});
