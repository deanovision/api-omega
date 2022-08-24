const db = require("../models/postModel");
module.exports = (router) => {
  router.get("/get-all-posts/:uid", getPosts);
  router.get("/get-friends-posts/:uid", getFriendsPosts);
  router.post("/add-post", addNewPost);
  return router;
};

async function getPosts(req, res, next) {
  try {
    const { uid } = req.params;
    let posts = await db.getAllPosts(uid);
    res.status(200).json(posts);
  } catch (err) {
    err === "user has no posts"
      ? next({ status: true, code: 400 })
      : next({ status: true, code: 500 });
  }
}
async function getFriendsPosts(req, res, next) {
  try {
    const { uid } = req.params;
    let posts = await db.getFriendsPosts(uid);
    res.status(200).json(posts);
  } catch (err) {
    err === "user has no posts"
      ? next({ status: true, code: 400 })
      : next({ status: true, code: 500 });
  }
}
async function addNewPost(req, res, next) {
  try {
    const uid = req.uid;
    const { body } = req.body.post;
    let post = await db.addPost(uid, body);
    res.status(200).json(post);
  } catch (err) {
    next({ status: true, code: 500 });
  }
}
