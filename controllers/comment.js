const Comment = require("../models/Comment");

const controller = {
  read: async (req, res) => {
    let { showId } = req.query;
    console.log(req.user);

    try {
      let comment = await Comment.find({ showId })
        .sort({ updatedAt: -1 })
        .populate({ path: "userId", select: "name" });
      if (comment) {
        res.status(200).json({
          response: comment,
          success: true,
          messsage: "comments found successfully",
        });
      } else {
        res.status(404).json({
          success: false,
          message: "comments not found",
        });
      }
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },

  create: async (req, res) => {
    let { user, body } = req;
    console.log(req.user.id);
    try {
      let new_comment = await Comment.create({
        showId: body.showId,
        comment: body.comment,
        userId: user.id,
        photo: user.photo,
      });
      console.log(new_comment);
      res.status(201).json({
        response: new_comment,
        success: true,
        messsage: "comment created successfully",
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },
  update: async (req, res) => {
    let { id } = req.params;
    let update = req.body;

    try {
      let comment = await Comment.findOneAndUpdate({ _id: id }, update, {
        new: true,
      });

      if (comment) {
        res.status(200).json({
          id: comment._id,
          success: true,
          messsage: "comment updated successfully",
        });
      } else {
        res.status(404).json({
          success: false,
          message: "comment not found",
        });
      }
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },
  destroy: async (req, res) => {
    let { id } = req.params;
    try {
      let comment = await Comment.findOneAndDelete({ _id: id });
      if (comment) {
        res.status(200).json({
          id: comment._id,
          success: true,
          messsage: "comment deleted successfully",
        });
      } else {
        res.status(404).json({
          success: false,
          message: "comment not found",
        });
      }
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },




};

module.exports = controller;
