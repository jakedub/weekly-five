//see a specific snippet and edit

const express = require("express");
const router = express.Router();

router.get("/single", function(req, res) {
  MongoClient.connect(url, function(err ,db) {
    User.findOne({username: req.params.username}).then(function(docs) {
      console.log(docs);
      res.render("single_update", docs);
    });
    db.close();
  });
});

router.post("/:username/single", function(req, res) {
  MongoClient.connect(url, function(err, db) {
    console.log("Editing?");
    User.updateOne({username: req.params.username}, {set: {snippets: req.body.snippets}}, {$push: {tags: req.body.tags}})
    .then(function() {
      console.log("Successful");
      res.redirect("/home");
      db.close();
    });
  });
});



module.exports = router;
