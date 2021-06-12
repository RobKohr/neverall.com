const joi = require('joi');

exports.schema = joi.object({
  username: joi.string().min(3).max(400).required(),
  email: joi.string(),
  role: joi.string(),
});
