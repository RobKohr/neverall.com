import { Values } from "components/forms/Form";
import joi from "joi";

export interface CreateForumValues extends Values {
  siteUrl: string;
  name: string;
  shortName: string;
}

export const createForumDefaults: CreateForumValues = {
  siteUrl: "",
  name: "",
  shortName: "",
};

export const forum = joi.object({
  siteUrl: joi.string().trim().min(1).max(400).required(),
  siteName: joi.string().trim().min(1).max(80).required(),
});
