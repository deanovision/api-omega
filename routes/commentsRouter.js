const db = require("../models/commentsModel");
module.exports = (router) => {
  router.post("/add-comment/:post_id", addComment);
  router.get("/get-comments/:post_id", getCommentsByPostId);
  return router;
};
async function addComment(req, res, next) {
  try {
    const user_id = req.uid;
    const { body } = req.body.comment;
    const { post_id } = req.params;
    let commentList = await db.addComment(user_id, post_id, body);
    res.status(201).json(commentList);
  } catch (err) {
    console.log(err);
    next({ status: true, code: 500 });
  }
}
async function getCommentsByPostId(req, res, next) {
  try {
    const { post_id } = req.params;
    const comments = await db.getCommentsByPostId(post_id);
    res.status(200).json(comments);
  } catch (err) {
    console.log(err);
    next({ status: true, code: 500 });
  }
}
