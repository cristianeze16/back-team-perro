const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  itineraryId: { type: mongoose.Types.ObjectId, ref: "itineraries" },
  showId: { type: mongoose.Types.ObjectId, ref: "shows" },
  name: { type: String, required: true },
  icon: { type: String, required: true },
  iconBack: { type: String, required: true },
  userId: [{ type: mongoose.Types.ObjectId, ref: "users" }],
});

const Reaction = mongoose.model('reactions', schema);
module.exports = Reaction;
