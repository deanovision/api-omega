const knex = require("knex");
const db = require("../data/db");
const { format } = require("date-fns");
module.exports = {
  getUserById,
  addNewUser,
  updateUser,
  followUser,
  unfollowUser,
  getAllUsers,
  findUsers,
};

async function getUserById(uid) {
  // console.log(format(new Date(), "YYYY-MM-DD hh:mm:ss"));
  try {
    const user = await db("users")
      .where({ uid })
      .update({ last_active: format(new Date(), "yyyy-MM-dd hh:mm:ss") }, [
        "uid",
        "email",
        "name",
        "user_name as userName",
        "avatar_url as avatarUrl",
        "last_active",
        "bio",
      ]);
    // .select(
    //   "uid",
    //   "email",
    //   "name",
    //   "user_name",
    //   "avatar_url",
    //   "last_active",
    //   "bio"
    // )
    // .first();
    // console.log(user);
    if (user === undefined) {
      throw "user not found";
    }
    return user[0];
  } catch (err) {
    console.log(err);
    throw err;
  }
}
async function addNewUser(user) {
  try {
    const userId = await db("users").insert(user, "uid");
    return userId[0];
  } catch (err) {
    console.log(err);
    throw err;
  }
}
async function updateUser(user) {
  try {
    const userId = await db("users")
      .where({ uid: user.uid })
      .update(user, [
        "uid",
        "name",
        "user_name as userName",
        "email",
        "avatar_url as avatarUrl",
        "bio",
      ]);
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
async function findUsers(search_term) {
  try {
    const users = await db("users")
      .select("uid", "name", "user_name", "avatar_url", "email", "bio")
      .where(db.raw(` "name" ILIKE '${search_term}%'`));
    // .raw(`SELECT * FROM "users" WHERE "name" ILIKE '${search_term}'`)

    // const users = await db("users").whereILike("name", `%${search_term}%`);
    // .orWhereLike("name", `%${search_term.toUpperCase()}%`);
    // .select("uid", "name", "user_name", "avatar_url", "email", "bio");
    // console.log("users", users);
    // const userArray = Object.values(users);
    return users;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
async function unfollowUser(user_id, friend_user_id) {
  try {
    const deletedRows = await db("followers")
      .where({ user_id: user_id, friend_user_id: friend_user_id })
      .del();
    //returns number of rows deleted, will be 1 if successful
    return deletedRows;
  } catch (err) {
    throw err;
  }
}
async function getAllUsers(user_id, limit = 20, offset = 0) {
  //this function accepts a user and returns
  //a list of the users they currently follow
  try {
    const friends = await db
      .select("user_id as my_user_id")
      .limit(limit)
      .offset(offset)
      .from("followers")
      .where({ user_id })
      .rightJoin("users", "uid", "friend_user_id")
      .select("uid", "name", "user_name", "avatar_url", "last_active", "bio");

    return friends.map((friend) => {
      const { uid, name, user_name, avatar_url, last_active, bio } = friend;
      return { uid, name, user_name, avatar_url, last_active, bio };
    });
  } catch (err) {
    throw err;
  }
}
