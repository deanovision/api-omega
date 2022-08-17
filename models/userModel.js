const db = require("../data/db/db");
module.exports = {
  getUserById,
};

async function getUserById(user_id) {
  try {
    const user = await db("users")
      .where({ id: user_id })
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
