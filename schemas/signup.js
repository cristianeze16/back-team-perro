const joi = require("joi");

const schemaSignUp = joi.object({
  name: joi.string().required().messages({
    "any.required": "The field 'name' is required, please enter it",
    "string.empty": "The field 'name' mustn't be empty, please fill it",
    "string.base": "The field 'name' must be a string",
  }),
  lastName: joi.string().required().messages({
    "any.required": "The field 'last name' is required, please enter it",
    "string.empty": "The field 'last name' mustn't be empty, please fill it",
    "string.base": "The field 'last name' must be a string",
  }),

  role: joi.string().valid("user", "admin").required().messages({
    "any.required": "The field 'role' is required, please enter it",
    "any.only": "The field 'role' must be a valid role",
    "string.empty": "The field 'role' mustn't be empty, please fill it",
    "string.base": "The field 'role' must be a string",
  }),
  email: joi.string().email().required().messages({
    "any.required": "The field 'email' is required, please enter it",
    "string.email": "The field 'email' must be a valid email address",
    "string.empty": "The field 'email' mustn't be empty, please fill it",
    "string.base": "The field 'email' must be a string",
  }),
  photo: joi.string().uri().required().messages({
    "any.required": "The field 'photo' is required, please enter it",
    "string.empty": "The field 'photo' mustn't be empty, please fill it",
    "string.base": "The field 'photo' must be a string",
    "string.uri": "The field 'photo' must be an url",
  }),
  age: joi.number().integer().min(0).required().messages({
    "any.required": "The field 'age' is required, please enter it",
    "number.base": "The field 'age' must be a number",
    "number.integer": "The field 'age' must be an integer, please change it",
    "number.min": "The field 'age' must be a number greater or equal to 0, please change it",
  }),
  password: joi.string().required().messages({
    "any.required": "The field 'password' is required, please enter it",
    "string.empty": "The field 'password' mustn't be empty, please fill it",
    "string.base": "The field 'password' must be a string",
  }),
});

module.exports = schemaSignUp;
