const joi = require("joi");

exports.searchSchema = joi.object({
  search: joi.string().trim().min(1).max(400).required(),
});
