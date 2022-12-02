const Reaction = require("../models/Reaction");
const Itinerary = require("../models/Itinerary");
const Show = require("../models/Show");
const { errorMessage } = require("../utils/utils");

const controller = {
  create: async (req, res) => {
    let { body } = req;
    body.userId = [];
    let { itineraryId, showId } = body;
    if (itineraryId) {
      try {
        let itinerary = await Itinerary.findOne({ _id: body.itineraryId });
        if (itinerary) {
          let newReaction = await Reaction.create(body);
          res.status(201).json({
            id: newReaction._id,
            success: true,
            message: "The reaction was created successfully",
          });
        } else {
          errorMessage(res, 400, "The itinerary associated couldn't be found");
        }
      } catch (error) {
        errorMessage(res, 400, error.message);
      }
    } else if (showId) {
      try {
        let show = await Show.findOne({ _id: body.showId });
        if (show) {
          let newReaction = await Reaction.create(body);
          res.status(201).json({
            id: newReaction._id,
            success: true,
            message: "The reaction for show was created successfully",
          });
        } else {
          errorMessage(res, 400, "The show associated couldn't be found");
        }
      } catch (error) {
        errorMessage(res, 400, error.message);
      }
    } else {
      errorMessage(res, 400, "You have to specify itineraryId or showId");
    }
  },
  read: async (req, res) => {
    let { itineraryId, showId, userId } = req.query;
    let { user } = req;
    if (itineraryId) {
      try {
        let reactions = await Reaction.find({ itineraryId }).lean();
        if (reactions.length) {
          reactions = reactions.map(reaction => {
            let reacted = reaction.userId.some(userReaction => userReaction.equals(user.id));
            return { ...reaction, userId: reaction.userId.length, reacted };
          });
          res.status(200).json({
            success: true,
            response: reactions,
            message: "Reactions from itinerary",
          });
        } else {
          res.status(200).json({
            success: false,
            response: [],
            message: "No Reactions from itinerary",
          });
        }
      } catch (error) {
        errorMessage(res, 400, error.message);
      }
    } else if (showId) {
      try {
        let reactions = await Reaction.find({ showId }).lean();
        if (reactions.length) {
          reactions = reactions.map(reaction => {
            let reacted = reaction.userId.some(userReaction => userReaction.equals(user.id));
            return { ...reaction, userId: reaction.userId.length, reacted };
          });
          res.status(200).json({
            success: true,
            response: reactions,
            message: "Reactions from show",
          });
        } else {
          res.status(200).json({
            success: false,
            response: [],
            message: "No Reactions from show",
          });
        }
      } catch (error) {
        errorMessage(res, 400, error.message);
      }
    } else if (userId) {
      try {
        let reactions = await Reaction.find({ userId }, "-userId").populate("itineraryId showId", "name photo");
        if (reactions.length) {
          res.status(200).json({
            success: true,
            response: reactions,
            message: "Reactions from user",
          });
        } else {
          res.status(404).json({
            success: false,
            message: "Couldn't find reactions for this user",
          });
        }
      } catch (error) {
        errorMessage(res, 400, error.message);
      }
    }
  },
  update: async (req, res) => {
    let { user } = req;
    let { name, itineraryId, showId } = req.query;
    if (name && itineraryId) {
      try {
        let reaction = await Reaction.findOne({ name, itineraryId });
        if (reaction) {
          if (reaction.userId.some(reactionUser => reactionUser.equals(user.id))) {
            reaction.userId.pull(user.id);
            reaction.save();
            res.status(200).json({
              success: true,
              id: reaction._id,
              message: "The user unreacted to the reaction",
            });
          } else {
            reaction.userId.push(user.id);
            reaction.save();
            res.status(200).json({
              success: true,
              id: reaction._id,
              message: "The user reacted to the reaction",
            });
          }
        } else {
          errorMessage(res, 404, "Couldn't find the reaction");
        }
      } catch (error) {
        errorMessage(res, 400, error.message);
      }
    } else if (name && showId) {
      try {
        let reaction = await Reaction.findOne({ name, showId });
        if (reaction) {
          if (reaction.userId.some(reactionUser => reactionUser.equals(user.id))) {
            reaction.userId.pull(user.id);
            reaction.save();
            res.status(200).json({
              success: true,
              id: reaction._id,
              message: "The user unreacted to the show",
            });
          } else {
            reaction.userId.push(user.id);
            reaction.save();
            res.status(200).json({
              success: true,
              id: reaction._id,
              message: "The user reacted to the show",
            });
          }
        } else {
          errorMessage(res, 404, "Couldn't find the show");
        }
      } catch (error) {
        errorMessage(res, 400, error.message);
      }
    } else {
      errorMessage(res, 400, "You need to specify the name and itineraryId or showId");
    }
  },
  pullUser: async (req, res) => {
    let { user } = req;
    let { id } = req.params;
    try {
      let reaction = await Reaction.findOneAndUpdate({ _id: id }, { $pull: { userId: user.id } }, { new: true });
      if (reaction) {
        res.status(200).json({
          success: true,
          id: reaction._id,
          message: "Reaction deleted succesfully",
        });
      } else {
        errorMessage(res, 404, "Couldn't find the reaction");
      }
    } catch (error) {
      errorMessage(res, 400, error.message);
    }
  },
};

module.exports = controller;
