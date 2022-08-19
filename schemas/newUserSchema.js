const yup = require("yup");

let newUserSchema = yup.object().shape({
  name: yup.string().required(),
  user_id: yup.string().required(),
  email: yup.string().email().required(),
  user_name: yup.string().required(),
  avatar_url: yup.string().url(),
  bio: yup.string(),
});

module.exports = newUserSchema;
