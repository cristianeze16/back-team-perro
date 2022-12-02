let router = require("express").Router();
let auths = require("./auths");
let cities = require("./cities");
let hotels = require("./hotels");
let itineraries = require("./itineraries");
let shows = require("./shows");
let reactions = require("./reactions")
let comment= require("./comment");

router.use("/api/auth", auths);
router.use("/api/cities", cities);
router.use("/api/hotels", hotels);
router.use("/api/itineraries", itineraries);
router.use("/api/shows", shows);
router.use("/api/reactions", reactions)

router.use("/api/comments",comment);
module.exports = router;
