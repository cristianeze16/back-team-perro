const joi = require("joi");

const schema = joi.object({
  showId: joi.string().hex().length(24).required(),
  comment: joi.string().min(3).required(),
});

module.exports = schema;
