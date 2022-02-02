import joi from "joi";

export  const searchSchema = joi.object({
  search: joi.string().trim().min(1).max(400).required(),
});
