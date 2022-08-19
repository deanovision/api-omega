const yup = require("yup");

let updateUserSchema = yup.object().shape({
  name: yup.string(),
  email: yup.string().email(),
  user_name: yup.string(),
  avatar_url: yup.string().url(),
  bio: yup.string(),
});

module.exports = updateUserSchema;
