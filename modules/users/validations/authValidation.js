const Joi = require('joi')
const registerSchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(2)
    .max(64)
    .required(),

  password: Joi.string()
    .required(),
  // Password@123
  // .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

  repeat_password: Joi.ref('password'),

  access_token: [
    Joi.string(),
    Joi.number()
  ],

  email: Joi.string()
    .trim()
    .lowercase()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'in'] } })
})
  // .with('username', 'birth_year')
  // .xor('password', 'access_token')
  .with('password', 'repeat_password')

module.exports = { registerSchema }
