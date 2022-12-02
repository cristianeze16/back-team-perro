let router = require("express").Router();
const passport = require("../config/passport");
let { create, read, update, pullUser } = require("../controllers/reaction");
const userIsOwner = require("../middleware/userIsOwner");
const validator = require("../middleware/validator");
const Reaction = require("../models/Reaction");
const reactionSchema = require("../schemas/reaction");

router.get("/", passport.authenticate("jwt", { session: false }), read);
router.post("/", passport.authenticate("jwt", { session: false }), validator(reactionSchema), create);
router.put("/", passport.authenticate("jwt", { session: false }), update);
router.put("/:id", passport.authenticate("jwt", { session: false }), userIsOwner(Reaction), pullUser);
module.exports = router;
