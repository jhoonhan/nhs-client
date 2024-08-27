import getShiftdate from "helpers/getShiftdate";

describe("getShiftdate", () => {
  it("should correctly format the shift date", () => {
    const computedRosterState = {
      shifts: {
        shifts: {
          1: { month: "07", day_num: "20", year: "2022" },
        },
      },
    };
    const shift_id = "1";

    const result = getShiftdate(computedRosterState, shift_id);

    expect(result).toBe("07/20/2022");
  });
});
