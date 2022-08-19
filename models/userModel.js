const db = require("../data/db");
module.exports = {
  getUserById,
  addNewUser,
  updateUser,
  followUser,
  unfollowUser,
  getAllUsers,
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
  try {
    const userId = await db("users").insert(user, "user_id");
    return userId[0];
  } catch (err) {
    throw err;
  }
}
async function updateUser(user) {
  try {
    const userId = await db("users")
      .where({ user_id: user.user_id })
      .update(user, "user_id", ["sub", "name", "user_name", "email"]);
    return userId[0];
  } catch (err) {
    throw err;
  }
}
async function followUser(user_id, friend_user_id) {
  try {
    //checking if the user is already following the friend in the database
    const isUserFollowingFriend = await db("followers")
      .where({
        user_id,
        friend_user_id,
      })
      .first();
    //if the user is not following the friend add information to database
    if (!isUserFollowingFriend) {
      let followFriendResponse = await db("followers").insert(
        { user_id: user_id, friend_user_id: friend_user_id },
        "friend_user_id"
      );
      return followFriendResponse[0];
    } else {
      throw "user already followed";
    }
  } catch (err) {
    throw 400;
  }
}
// async function followUser(user_id, friend_user_id) {
//   try {
//     const id = await db("followers").insert(
//       { user_id, friend_user_id },
//       "friend_user_id"
//     );
//     return id[0];
//   } catch (err) {
//     throw err;
//   }
// }
async function unfollowUser(user_id, friend_user_id) {
  try {
    const deletedRows = await db("followers")
      .where({ user_id: user_id, friend_user_id: friend_user_id })
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
      .rightJoin("users", "sub", "friend_user_id")
      .select("sub", "name", "user_name", "avatar_url", "last_active", "bio");
    return users;
  } catch (err) {
    throw err;
  }
}
