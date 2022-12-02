const { notOwnerResponse, documentNotFound } = require("../config/responses");

const userIsOwner = model => [
  async (req, res, next) => {
    let document = await model.findOne({ _id: req.params.id, userId: req.user.id });
    if (document) {
      return next();
    }
    return notOwnerResponse(req, res);
  },
];

module.exports = userIsOwner;
