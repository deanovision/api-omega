const db = require("../models/userModel");
module.exports = (router) => {
  router.get("/:user_id", getUserById);
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
