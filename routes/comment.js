let router = require("express").Router();
const passport = require("../config/passport");
const validator = require("../middleware/validator");
const userIsOwner = require("../middleware/userIsOwner");
const schema = require("../schemas/comment");
const {read,create,update,destroy}=require("../controllers/comment")
const Comment= require("../models/Comment")
router.get("/",read)
router.post("/", passport.authenticate("jwt", { session: false }),validator(schema),create)
router.put("/:id",passport.authenticate("jwt", { session: false }),validator(schema),userIsOwner(Comment),update);
router.delete("/:id",passport.authenticate("jwt",{session:false}),userIsOwner(Comment),destroy);



module.exports = router;
