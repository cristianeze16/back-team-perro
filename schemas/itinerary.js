const joi = require("joi");

const ItinerarySchema = joi.object({
  name: joi.string().required().messages({
    "any.required": "The field 'name' is required, please enter it",
    "string.empty": "The field 'name' mustn't be empty, please fill it",
    "string.base": "The field 'name' must be a string",
  }),
  photo: joi.array().items(joi.string().uri()).length(3).required().messages({
    "any.required": "The field 'photo' is required, please enter it",
    "string.empty": "The field 'photo' mustn't be empty, please fill it",
    "array.base": "The field 'photo' must be an Array",
    "array.length": "The field 'photo' must have three elements",
    "string.uri": "The content of field 'photo' must be an url",
  }),
  price: joi.number().min(0).required().messages({
    "any.required": "The field 'price' is required, please enter it",
    "number.base": "The field 'price' must be a number",
    "number.min": "The field 'price' must be a number greater or equal to 0, please change it",
  }),
  duration: joi.number().min(0).required().messages({
    "any.required": "The field 'duration' is required, please enter it",
    "number.base": "The field 'duration' must be a number",
    "number.min": "The field 'duration' must be a number greater or equal to 0, please change it",
  }),
  description: joi.string().required().messages({
    "any.required": "The field 'description' is required, please enter it",
    "string.empty": "The field 'description' mustn't be empty, please fill it",
    "string.base": "The field 'description' must be a string",
  }),
  cityId: joi.any().required().messages({
    "any.required": "The field 'city' is required, please enter it",
  }),
});

module.exports = ItinerarySchema;
