const knex = require("knex");
const db = require("../data/db");
const { format } = require("date-fns");
module.exports = {
  getAllPosts,
  addPost,
  deletePost,
};

async function getAllPosts(uid, limit = 20, offset = 0) {
  try {
    const posts = await db("posts")
      .where({ user_id: uid })
      .limit(limit)
      .offset(offset)
      .orderBy("created_at", "desc");
    if (posts === undefined) {
      throw "user has no posts";
    }
    return posts;
  } catch (err) {
    throw err;
  }
}
async function addPost(uid, post) {
  try {
    const postId = await db("posts").insert({ user_id: uid, body: post.body }, [
      "post_id",
    ]);
    return postId[0];
  } catch (err) {
    throw err;
  }
}
async function deletePost(uid, post_id) {
  try {
    const deletedPost = await db("posts")
      .where({ user_id: uid, post_id: post_id })
      .del();
    //returns number of deleted posts
    return deletedPost;
  } catch (err) {
    throw err;
  }
}
