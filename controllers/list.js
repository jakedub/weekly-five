//list all of a user's snippets

const express = require("express");
const router = express.Router();

router.get("/", function(req, res) {
  res.render("all")
});

//accept edits and new snippets. // TODO: Add code

module.exports = router;

//test
