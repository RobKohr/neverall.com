const joi = require("joi");

exports.registerSchema = joi.object({
  username: joi.string().lowercase().trim().min(3).max(400).required(),
  email: joi.string().trim(),
  password: joi.string().trim().min(8).required(),
  retypePassword: joi
    .string()
    .valid(joi.ref("password"))
    .label("Retype Password"),
});

exports.loginSchema = joi.object({
  username: joi.string().required(),
  password: joi.string().required(),
});

exports.schema = joi.object({
  username: joi.string().lowercase().trim().min(3).max(400).required(),
  displayUsername: joi.string().default(joi.ref("username")),
  email: joi.string().trim(),
  password: joi.string().trim().min(8).required(),
});
