const db = require("../data/db/db");
module.exports = {
  followUser,
  unfollowUser,
  getAllUsers,
};

async function followUser(user_id, follower_user_id) {
  try {
    const id = await db("followers").insert(
      { user_id, follower_user_id },
      "user_id"
    );
    return id[0];
  } catch (err) {
    throw err;
  }
}
async function unfollowUser(user_id, follower_user_id) {
  try {
    const deletedRows = await db("followers")
      .where({ user_id: user_id, follower_user_id: follower_user_id })
      .del();
    return deletedRows;
  } catch (err) {
    throw err;
  }
}
async function getAllUsers(user_id) {
  //this function accepts a user and returns
  //a list of the users they currently follow
  try {
    const users = await db("followers")
      .where({ user_id })
      .rightJoin("users", "sub", "follower_user_id")
      .select("sub", "name", "user_name", "avatar_url", "last_active", "bio");
    i;
    return users;
  } catch (err) {
    throw err;
  }
}
