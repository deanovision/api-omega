const server = require("./index");
const request = require("supertest");

describe("api connected", () => {
  it("should return status 200 and a connected message if successful", async () => {
    const res = await request(server).get("/");
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("connected");
  });
});
