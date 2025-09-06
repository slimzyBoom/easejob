import Joi from "joi";

const registerJoi = Joi.object({
    fullname: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required()
})

export { registerJoi }