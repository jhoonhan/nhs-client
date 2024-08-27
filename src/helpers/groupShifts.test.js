import groupShifts from "helpers/groupShifts";

describe("groupShifts", () => {
  it("should correctly group shifts by day when array is passed", () => {
    const shifts = [
      { is_day: true, day_num: "1", week_id: "1", shift_id: "1" },
      { is_day: false, day_num: "1", week_id: "1", shift_id: "2" },
    ];
    const by = "day";

    const result = groupShifts(shifts, by);

    expect(result).toEqual({
      1: { day: shifts[0], night: shifts[1] },
    });
  });

  it("should correctly group shifts by week when array is passed", () => {
    const shifts = [
      { is_day: true, day_num: "1", week_id: "1", shift_id: "1" },
      { is_day: false, day_num: "1", week_id: "1", shift_id: "2" },
    ];
    const by = "week";

    const result = groupShifts(shifts, by);

    expect(result).toEqual({
      1: shifts,
    });
  });

  it("should correctly group shifts by id when array is passed", () => {
    const shifts = [
      { is_day: true, day_num: "1", week_id: "1", shift_id: "1" },
      { is_day: false, day_num: "1", week_id: "1", shift_id: "2" },
    ];
    const by = "id";

    const result = groupShifts(shifts, by);

    expect(result).toEqual({
      1: shifts[0],
      2: shifts[1],
    });
  });

  it("should correctly group shifts by day when object is passed", () => {
    const shifts = {
      1: { is_day: true, day_num: "1", week_id: "1", shift_id: "1" },
      2: { is_day: false, day_num: "1", week_id: "1", shift_id: "2" },
    };
    const by = "day";

    const result = groupShifts(shifts, by);

    expect(result).toEqual({
      1: { day: shifts["1"], night: shifts["2"] },
    });
  });

  it("should correctly group shifts by week when object is passed", () => {
    const shifts = {
      1: { is_day: true, day_num: "1", week_id: "1", shift_id: "1" },
      2: { is_day: false, day_num: "1", week_id: "1", shift_id: "2" },
    };
    const by = "week";

    const result = groupShifts(shifts, by);

    expect(result).toEqual({
      1: [shifts["1"], shifts["2"]],
    });
  });
});
