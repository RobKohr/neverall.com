import joi from "joi";

export const forum = joi.object({
  siteUrl: joi.string().trim().min(1).max(400).required(),
  siteName: joi.string().trim().min(1).max(80).required(),
});
