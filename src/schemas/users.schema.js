const joi = require("joi");

exports.register = joi.object({
  displayUsername: joi.string().default(joi.ref("password")),
  username: joi.string().lowercase().trim().min(3).max(400).required(),
  email: joi.string().trim(),
  password: joi.string().trim().min(8).required(),
  retypePassword: joi
    .string()
    .valid(joi.ref("password"))
    .label("passwords don't match"),
});
