const reactions = [
  {
    name: "like",
    icon: "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/facebook/65/thumbs-up-sign_1f44d.png",
    iconBack:
      "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/au-kddi/190/thumbs-up-sign_1f44d.png",
  },
  {
    name: "not-like",
    icon: "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/facebook/65/thumbs-down-sign_1f44e.png",
    iconBack:
      "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/au-kddi/190/thumbs-down-sign_1f44e.png",
  },
  {
    name: "love",
    icon: "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/twitter/322/red-heart_2764-fe0f.png",
    iconBack: "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/samsung/349/grey-heart_1fa76.png",
  },
  {
    name: "surprise",
    icon: "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/google/350/hushed-face_1f62f.png",
    iconBack:
      "https://cdn1.iconfinder.com/data/icons/emotions-crafticons/48/Emotions-smiley-emoji_shock_surprise-40-512.png",
  },
];

require("dotenv").config();
require("../../config/database");
const Reaction = require("../../models/Reaction");
const Itinerary = require("../../models/Itinerary");
const Show = require("../../models/Show");

const populate = async () => {
  let itineraries = await Itinerary.find({});
  if (itineraries.length) {
    for(let itinerary of itineraries) {
      for(let element of reactions) {
        let reaction = await Reaction.findOne({ itineraryId: itinerary._id, name: element.name });
        console.log(reaction);
        if (!reaction) {
          Reaction.create({
            itineraryId: itinerary._id,
            name: element.name,
            icon: element.icon,
            iconBack: element.iconBack,
            userId: []
          });
        }
      };
    };
  }
  
}
populate();
 
