const knex = require("knex");
const db = require("../data/db");
const { format } = require("date-fns");
module.exports = {
  getAllPosts,
  addPost,
  deletePost,
  getFriendsPosts,
};

async function getAllPosts(uid, limit = 20, offset = 0) {
  try {
    const posts = await db("posts")
      .where({ user_id: uid })
      .rightJoin("users", "uid", "user_id")
      .select(
        "uid",
        "post_id as postId",
        "avatar_url as postedByAvatarUrl",
        "body",
        "name as postedBy",
        "user_name as userName",
        "posts.created_at as createdAt"
      )
      .limit(limit)
      .offset(offset)
      .orderBy("posts.created_at", "desc");
    if (posts === undefined) {
      throw "user has no posts";
    }
    return posts;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
async function getFriendsPosts(uid, limit = 40, offset = 0) {
  try {
    const posts = await db("followers")
      .where({ "followers.user_id": uid })
      .join("users", "uid", "friend_user_id")
      .join("posts", "posts.user_id", "friend_user_id")
      .select(
        "uid",
        "post_id as postId",
        "avatar_url as postedByAvatarUrl",
        "body",
        "name as postedBy",
        "user_name as userName",
        "posts.created_at as createdAt"
      )
      .limit(limit)
      .offset(offset)
      .orderBy("posts.created_at", "desc");
    if (posts === undefined) {
      throw "user has no posts";
    }
    return posts;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
async function addPost(uid, body, limit = 20, offset = 0) {
  try {
    await db("posts").insert({ user_id: uid, body });
    const posts = await db("posts")
      .where({ user_id: uid })
      .rightJoin("users", "uid", "user_id")
      .select(
        "uid",
        "post_id as postId",
        "avatar_url as postedByAvatarUrl",
        "body",
        "name as postedBy",
        "user_name as userName",
        "posts.created_at as createdAt"
      )
      .limit(limit)
      .offset(offset)
      .orderBy("posts.created_at", "desc");
    if (posts === undefined) {
      throw "user has no posts";
    }
    return posts;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
async function deletePost(uid, post_id, limit = 20, offset = 0) {
  try {
    //delete post then fetch posts from db to
    //send to the client
    await db("posts").where({ user_id: uid, post_id: post_id }).del();
    const posts = await db("posts")
      .where({ user_id: uid })
      .rightJoin("users", "uid", "user_id")
      .select(
        "uid",
        "post_id as postId",
        "avatar_url as postedByAvatarUrl",
        "body",
        "name as postedBy",
        "user_name as userName",
        "posts.created_at as createdAt"
      )
      .limit(limit)
      .offset(offset)
      .orderBy("posts.created_at", "desc");
    //returns number of deleted posts
    return posts;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
