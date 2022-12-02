const joi = require("joi");

const reactionSchema = joi.object({
  name: joi.string().required().messages({
    "any.required": "The field 'name' is required, please enter it",
    "string.empty": "The field 'name' mustn't be empty, please fill it",
    "string.base": "The field 'name' must be a string",
  }),
  icon: joi.string().uri().required().messages({
    "any.required": "The field 'icon' is required, please enter it",
    "string.empty": "The field 'icon' mustn't be empty, please fill it",
    "string.base": "The field 'icon' must be a string",
    "string.uri": "The field 'icon' must be an url",
  }),
  iconBack: joi.string().uri().required().messages({
    "any.required": "The field 'icon back' is required, please enter it",
    "string.empty": "The field 'icon back' mustn't be empty, please fill it",
    "string.base": "The field 'icon back' must be a string",
    "string.uri": "The field 'icon back' must be an url",
  }),
  itineraryId: joi.any(),
  showId: joi.any(),

});

module.exports = reactionSchema;
