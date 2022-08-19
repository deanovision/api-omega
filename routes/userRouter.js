const db = require("../models/userModel");
const { newUserSchema, updateUserSchema } = require("../schemas");
module.exports = (router) => {
  router.post("/", addUser);
  router.get("/:user_id/all", getAllFriends);
  router.get("/:user_id", getUserById);
  router.put("/:user_id", updateUser);
  router.post("/:user_id", followUser);
  return router;
};

async function getUserById(req, res, next) {
  try {
    const { user_id } = req.params;
    let user = await db.getUserById(user_id);
    res.status(200).json({ ...user });
  } catch (err) {
    err === "user not found"
      ? next({ status: true, code: 400 })
      : next({ status: true, code: 500 });
  }
}
async function addUser(req, res, next) {
  try {
    const user = req.body;
    //validating request body against a user schema
    const isRequestValid = await newUserSchema.isValid(user);
    //if request is not valid send error
    if (!isRequestValid) {
      next({ status: true, code: 400 });
      return;
    }
    const userId = await db.addNewUser(user);
    res.status(201).json(userId);
  } catch (err) {
    next({ status: true, code: 500 });
  }
}
async function updateUser(req, res, next) {
  //If the sub in the token sent does
  //not match the sub in the request body
  //send error
  if (!req.body.sub === req.userInfo.user_id) {
    next({ status: true, code: 403 });
    return;
  }
  try {
    const user = req.body;
    //validating request body against a user schema
    const isRequestValid = await updateUserSchema.isValid(user);
    //if request is not valid send error
    if (!isRequestValid) {
      next({ status: true, code: 400 });
      return;
    }
    const updatedUser = await db.updateUser(user);
    res.status(201).json(updatedUser);
  } catch (err) {
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
  if (!req.params.user_id || req.params.user_id !== req.user_id) {
    next({ status: true, code: 400 });
    return;
  }
  try {
    let friends = await db.getAllUsers(req.params.user_id);
    res.status(201).json(friends);
  } catch (err) {
    next({ status: true, code: 500 });
  }
}
