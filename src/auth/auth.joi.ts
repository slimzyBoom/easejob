import Joi from "joi";

const createUserJoi = Joi.object({
  fullname: Joi.string().required().messages({
    "any.required": "fullname is required",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "must be a valid email",
    "any.required": "must provide email",
  }),
  password: Joi.string()
    .min(8)
    .required()
    .pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@!&+])[A-Za-z\d@!&+]{8,}$/)
    .messages({
      "string.min": "Password must be at least {#limit} characters long",
      "any.required": "Password is required",
      "string.pattern.base":
        "Password must contain at least 1 uppercase, 1 lowercase, 1 number, and 1 special character (@, !, &, +)",
    }),
});

const setRoleJoi = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "must be a valid email",
    "any.required": "must provide email",
  }),
  role: Joi.string()
    .required()
    .valid("employer", "job-seeker", "agent")
    .messages({
      "any.required": "roles are required",
      "any.only": "role not allowed",
    }),
});

const loginUserJoi = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "must be a valid email",
    "any.required": "must provide email",
  }),
  password: Joi.string().min(8).required().messages({
    "string.min": "Password must be {#limit} or more characters long",
    "any.required": "must provide a password",
  }),
});

const forgetPasswordJoi = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "must be a valid email",
    "any.required": "must provide email",
  }),
});

const resetPasswordJoi = Joi.object({
  password: Joi.string().min(8).required().messages({
    "string.min": "Password must be {#limit} or more characters long",
    "any.required": "must provide a password",
  }),
});

export {
  createUserJoi,
  loginUserJoi,
  forgetPasswordJoi,
  resetPasswordJoi,
  setRoleJoi,
};
