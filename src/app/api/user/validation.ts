import Joi from "joi";

export const userSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  username: Joi.string().required().min(6).max(50),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  image: Joi.string(),
});

export const updateUserScheme = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  username: Joi.string().required().min(6).max(50),
  noTelp: Joi.string().min(13).required(),
  email: Joi.required(),
});
