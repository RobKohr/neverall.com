const joi = require('joi');

exports.schema = joi.object({
  username: joi.string().required(),
  password: joi.string().required(),
});
