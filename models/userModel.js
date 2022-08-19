const db = require("../data/db/db");
module.exports = {
  getUserById,
  addNewUser,
  updateUser,
};

async function getUserById(user_id) {
  try {
    const user = await db("users")
      .where({ sub: user_id })
      .select("sub", "user_name", "avatar_url", "last_active", "bio")
      .first();
    if (user === undefined) {
      throw "user not found";
    }
    return user;
  } catch (err) {
    throw err;
  }
}
async function addNewUser(user) {
  console.log(user);
  try {
    const userId = await db("users").insert(user, "sub");
    return userId[0];
  } catch (err) {
    throw err;
  }
}
async function updateUser(user) {
  try {
    const userId = await db("users")
      .where({ sub: user.sub })
      .update(user, "sub", ["sub", "name", "user_name", "email"]);
    return userId[0];
  } catch (err) {
    throw err;
  }
}
