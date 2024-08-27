import {
  formatRequestObj,
  formatObjectToArray,
  capitalizeString,
  formatName,
} from "helpers/formatters.js";

describe("Formatters", () => {
  describe("formatRequestObj", () => {
    it("should correctly format request object", () => {
      const requestObj = {
        1: { user_id: "1", priority: 1 },
        2: { user_id: "2", priority: 2 },
      };

      const result = formatRequestObj(requestObj);

      expect(result).toEqual([
        { shift_id: 1, user_id: "1", priority_user: 1 },
        { shift_id: 2, user_id: "2", priority_user: 2 },
      ]);
    });
  });

  describe("formatObjectToArray", () => {
    it("should correctly format object to array", () => {
      const obj = {
        1: { id: "1", name: "test1" },
        2: { id: "2", name: "test2" },
      };

      const result = formatObjectToArray(obj);

      expect(result).toEqual([
        { id: "1", name: "test1" },
        { id: "2", name: "test2" },
      ]);
    });
  });

  describe("capitalizeString", () => {
    it("should correctly capitalize string", () => {
      const str = "test string";

      const result = capitalizeString(str);

      expect(result).toBe("Test string");
    });

    it("should return empty string if input is empty", () => {
      const str = "";

      const result = capitalizeString(str);

      expect(result).toBe("");
    });
  });

  describe("formatName", () => {
    it("should correctly format name with type 1", () => {
      const firstname = "joe";
      const lastname = "han";
      const type = 1;

      const result = formatName(firstname, lastname, type);

      expect(result).toBe("Han, J");
    });

    it("should correctly format name with type 2", () => {
      const firstname = "joe";
      const lastname = "han";
      const type = 2;

      const result = formatName(firstname, lastname, type);

      expect(result).toBe("Joe Han");
    });
  });
});
