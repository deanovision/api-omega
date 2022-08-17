const db = require("../models/userModel");

module.exports = (router) => {
  router.get("/:user_id", getUserById);
  return router;
};

async function getUserById(req, res) {
  try {
    const { user_id } = req.params;
    let user = await db.getUserById(user_id);
    res.status(200).json({ ...user });
  } catch (err) {
    err === "user not found"
      ? res.status(400).json({ err })
      : res.status(500).json({ err });
  }
}
