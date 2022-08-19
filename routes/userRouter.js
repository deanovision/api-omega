const db = require("../models/userModel");
const { newUserSchema, updateUserSchema } = require("../schemas");
module.exports = (router) => {
  router.post("/", addUser);
  router.get("/:user_id", getUserById);
  router.put("/:user_id", updateUser);
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
  if (!req.body.sub === req.userInfo.sub) {
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
