import {
  generateHeader,
  formatRequests,
  getComputedRoster,
  createRequestByList,
  fetchAllUsers,
  fetchUserById,
  signInUser,
  inviteUser,
  putMethod,
} from "actions/index.js";

import { API_URL } from "config";

jest.mock("../server", () => ({
  post: jest.fn(),
}));

jest.mock("../config", () => ({
  API_URL: "http://localhost:3000",
}));

global.fetch = jest.fn();

describe("Actions", () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it("generateHeader should return correct header", () => {
    const method = "GET";
    const accessToken = "12345";
    const expectedHeader = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer 12345",
      },
    };

    expect(generateHeader(method, accessToken)).toEqual(expectedHeader);
  });

  describe("formatRequests", () => {
    it("should correctly format requests", () => {
      const requests = [
        { user_id: "1", shift_id: "1", status: "approved" },
        { user_id: "1", shift_id: "2", status: "pending" },
        { user_id: "2", shift_id: "1", status: "rejected" },
      ];
      const shifts = { shifts: { 1: {}, 2: {} } };

      const result = formatRequests({ requests, shifts });

      expect(result).toEqual({
        all: requests,
        groupedByShift: {
          1: {
            approved: { 1: requests[0] },
            pending: {},
            rejected: [requests[2]],
          },
          2: { approved: {}, pending: { 1: requests[1] }, rejected: [] },
        },
        groupedByUser: {
          1: { approved: [requests[0]], pending: [requests[1]], rejected: [] },
          2: { approved: [], pending: [], rejected: [requests[2]] },
        },
      });
    });
  });

  describe("getComputedRoster", () => {
    it("should correctly get and format roster", async () => {
      const accessToken = "12345";
      const setData = jest.fn();
      const month = "07";
      const year = "2022";
      const compute = true;
      const mockResponse = {
        status: "success",
        data: {
          requests: [
            { user_id: "1", shift_id: "1", status: "approved" },
            { user_id: "1", shift_id: "2", status: "pending" },
            { user_id: "2", shift_id: "1", status: "rejected" },
          ],
          shifts: { shifts: { 1: {}, 2: {} } },
        },
      };

      fetch.mockResolvedValueOnce({
        json: () => Promise.resolve(mockResponse),
      });

      const result = await getComputedRoster(
        accessToken,
        setData,
        { month, year },
        compute,
      );

      expect(fetch).toHaveBeenCalledWith(
        `${API_URL}/roster/${month}/${year}/${compute}`,
        generateHeader("GET", accessToken),
      );
      expect(setData).toHaveBeenCalledWith(true);
      expect(result).toEqual({
        ...mockResponse.data,
        requests: formatRequests(mockResponse.data),
      });
    });
  });

  describe("fetchAllUsers", () => {
    it("should correctly fetch all users", async () => {
      const accessToken = "12345";
      const setData = jest.fn();
      const mockResponse = { status: "success", data: [{ user_id: "1" }] };

      fetch.mockResolvedValueOnce({
        json: () => Promise.resolve(mockResponse),
      });

      const result = await fetchAllUsers(accessToken, { setData });

      expect(fetch).toHaveBeenCalledWith(
        `${API_URL}/user`,
        generateHeader("GET", accessToken),
      );
      expect(setData).toHaveBeenCalledWith(mockResponse.data);
      expect(result).toEqual(mockResponse);
    });
  });

  describe("fetchUserById", () => {
    it("should correctly fetch user by id", async () => {
      const accessToken = "12345";
      const id = "1";
      const id_type = "1";
      const mockResponse = { status: "success", data: { user_id: "1" } };

      fetch.mockResolvedValueOnce({
        json: () => Promise.resolve(mockResponse),
      });

      const result = await fetchUserById(accessToken, id, id_type);

      expect(fetch).toHaveBeenCalledWith(
        `${API_URL}/user/${id_type}/${id}`,
        generateHeader("GET", accessToken),
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("signInUser", () => {
    it("should correctly sign in user", async () => {
      const accessToken = "12345";
      const data = { username: "test", password: "test" };
      const mockResponse = { status: "success", data: { user_id: "1" } };

      fetch.mockResolvedValueOnce({
        json: () => Promise.resolve(mockResponse),
      });

      const result = await signInUser(accessToken, data);

      expect(fetch).toHaveBeenCalledWith(`${API_URL}/user/login`, {
        ...generateHeader("POST", accessToken),
        body: JSON.stringify(data),
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe("inviteUser", () => {
    it("should correctly invite user", async () => {
      const accessToken = "12345";
      const data = { email: "test@test.com" };
      const mockResponse = { status: "success" };

      fetch.mockResolvedValueOnce({
        json: () => Promise.resolve(mockResponse),
      });

      const result = await inviteUser(accessToken, data);

      expect(fetch).toHaveBeenCalledWith(`${API_URL}/user/invite`, {
        ...generateHeader("POST", accessToken),
        body: JSON.stringify(data),
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe("putMethod", () => {
    it("should correctly send PUT request", async () => {
      const accessToken = "12345";
      const url = "user/1";
      const data = { email: "test@test.com" };
      const mockResponse = { status: "success" };

      fetch.mockResolvedValueOnce({
        json: () => Promise.resolve(mockResponse),
      });

      const result = await putMethod(accessToken, url, data);

      expect(fetch).toHaveBeenCalledWith(`${API_URL}/${url}`, {
        ...generateHeader("PUT", accessToken),
        body: JSON.stringify(data),
      });
      expect(result).toEqual(mockResponse);
    });
  });
});
