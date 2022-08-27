const db = require("../data/db");

module.exports = {
  getCommentsByPostId,
  addComment,
};

async function getCommentsByPostId(post_id) {
  try {
    const comments = await db("comments")
      .where({ post_id })
      .join("users", "uid", "comments.user_id")
      .select(
        "name",
        "user_name as userName",
        "avatar_url as avatarUrl",
        "body",
        "comments.created_at as createdAt"
      )
      .orderBy("createdAt", "desc");
    return comments;
  } catch (err) {
    throw err;
  }
}
async function addComment(user_id, post_id, body) {
  console.log(body);
  try {
    await db("comments").insert({ user_id, post_id, body });
    const comments = await db("comments")
      .where({ post_id })
      .join("users", "uid", "comments.user_id")
      .select(
        "name",
        "user_name as userName",
        "avatar_url as avatarUrl",
        "body",
        "comments.created_at as createdAt"
      );
    return comments;
  } catch (err) {
    throw err;
  }
}
