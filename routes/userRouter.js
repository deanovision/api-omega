const db = require("../models/userModel");
const { newUserSchema, updateUserSchema } = require("../schemas");
module.exports = (router) => {
  router.post("/add", addUser);
  router.get("/find/:search_term", findUsers);
  router.get("/get-all-friends/:uid/", getAllFriends);
  router.get("/get-profile/:uid", getUserById);
  router.put("/update-profile/:uid", updateUser);
  router.post("/follow-user/:uid", followUser);
  return router;
};

async function getUserById(req, res, next) {
  // console.log("UID", req.query.uid);
  try {
    const { uid } = req.params;
    let user = await db.getUserById(uid);
    res.status(200).json({ ...user });
  } catch (err) {
    err === "user not found"
      ? next({ status: true, code: 400 })
      : next({ status: true, code: 500 });
  }
}
async function findUsers(req, res, next) {
  try {
    const { search_term } = req.params;
    let users = await db.findUsers(search_term);
    res.status(200).json(users);
  } catch (err) {
    err === "user not found"
      ? next({ status: true, code: 400 })
      : next({ status: true, code: 500 });
  }
}
async function addUser(req, res, next) {
  try {
    const user = { ...req.body.user, uid: req.uid };
    //validating request body against a user schema
    const isRequestValid = await newUserSchema.isValid(user);
    //if request is not valid send error
    if (!isRequestValid) {
      next({ status: true, code: 400 });
      return;
    }
    const userId = await db.addNewUser({ ...user, uid: req.uid });
    res.status(201).json(userId);
  } catch (err) {
    // console.log(err);
    next({ status: true, code: 500 });
  }
}
async function updateUser(req, res, next) {
  //If the uid in the token sent does
  //not match the uid in the request params
  //send error
  if (!req.params.uid === req.uid) {
    next({ status: true, code: 403 });
    return;
  }
  try {
    const user = req.body.user;
    //validating request body against a user schema
    const isRequestValid = await updateUserSchema.isValid(user);
    //if request is not valid send error
    if (!isRequestValid) {
      next({ status: true, code: 400 });
      return;
    }
    const updatedUser = await db.updateUser({ ...user, uid: req.uid });
    res.status(201).json(updatedUser);
  } catch (err) {
    console.log(err);
    next({ status: true, code: 500 });
  }
}
async function followUser(req, res, next) {
  if (!req.body.user_id || !req.body.friend_user_id) {
    next({ status: true, code: 400 });
    return;
  }
  const { user_id, friend_user_id } = req.body;
  try {
    let result = await db.followUser(user_id, friend_user_id);
    res.status(201).json(result);
  } catch (err) {
    //checking to see if the error was thrown by a function with
    //an error code if so use that code for the errorhandle middleware
    //otherwise use a generic 500 error
    next({ status: true, code: typeof err === "number" ? err : 500 });
  }
}
async function getAllFriends(req, res, next) {
  // console.log(req.headers);
  if (!req.params.uid || req.params.uid !== req.uid) {
    next({ status: true, code: 400 });
    return;
  }
  try {
    let friends = await db.getAllUsers(req.params.uid);
    res.status(201).json(friends);
  } catch (err) {
    next({ status: true, code: 500 });
  }
}
