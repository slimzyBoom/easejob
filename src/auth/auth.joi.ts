import Joi from "joi";

const createUserJoi = Joi.object({
  fullname: Joi.string().required().messages({
    "any:required": "fullname is required",
  }),
  email: Joi.string().email().required().messages({
    "string:email": "must be a valid email",
    "any:required": "must provide email",
  }),
  password: Joi.string().min(8).required().messages({
    "string:min": "Password must be {#limit} or more characters long",
    "any:required": "must provide a password",
  }),
});

const loginUserJoi = Joi.object({
  email: Joi.string().email().required().messages({
    "string:email": "must be a valid email",
    "any:required": "must provide email",
  }),
  password: Joi.string().min(8).required().messages({
    "string:min": "Password must be {#limit} or more characters long",
    "any:required": "must provide a password",
  }),
});

const forgetPasswordJoi = Joi.object({
  email: Joi.string().email().required().messages({
    "string:email": "must be a valid email",
    "any:required": "must provide email",
  }),
});

const resetPasswordJoi = Joi.object({
  password: Joi.string().min(8).required().messages({
    "string:min": "Password must be {#limit} or more characters long",
    "any:required": "must provide a password",
  }),
});

export { createUserJoi, loginUserJoi, forgetPasswordJoi, resetPasswordJoi };