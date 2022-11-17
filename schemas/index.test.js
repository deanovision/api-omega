const { newUserSchema, updateUserSchema } = require("./index");

describe("schemas", () => {
  it("newUserSchema should return true if a user object is valid", async () => {
    const newUser = {
      name: "foo bar",
      uid: "abc123",
      email: "foo@bar.com",
      user_name: "foo7",
      avatar_url: "http://foo.png",
      bio: "sample bio",
    };
    const validateSchema = await newUserSchema.isValid(newUser);
    expect(validateSchema).toBe(true);
  });
  it("newUserSchema should return false if a user object is not valid", async () => {
    const newUser = {
      name: "foo bar",
      email: "foo@bar.com",
      user_name: "foo7",
    };
    const validateSchema = await newUserSchema.isValid(newUser);
    expect(validateSchema).toBe(false);
  });
  it("updateUserSchema should return true if a user object is valid", async () => {
    const updatedUser = {
      name: "foo bar",
      email: "foo@bar.com",
      user_name: "foo7",
      avatar_url: "http://foo.png",
      bio: "new sample bio",
    };
    const validateSchema = await updateUserSchema.isValid(updatedUser);
    expect(validateSchema).toBe(true);
  });
  it("updateUserSchema should return false if a user object is not valid", async () => {
    const updatedUser = {
      name: "foo bar",
      email: "foo",
      user_name: "foo7",
      avatar_url: "http://foo.png",
      bio: "new sample bio",
    };
    const validateSchema = await updateUserSchema.isValid(updatedUser);
    expect(validateSchema).toBe(false);
  });
});
