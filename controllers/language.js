//see all of a user's snippets for a specific language

const express = require("express");
const router = express.Router();

router.get("/", function(req,res){
  res.render("language");
})


router.post("/", function(req,res){
  console.log(req.body);
  User.create({
    snippets: [{
      title: req.body.title,
      body: req.body.body,
      notes: req.body.notes,
      language: req.body.language,
      tags: req.body.tags
    }]
  })
  .then(handleSuccess)
  .catch(handleError)
  res.render("/home");
});

function handleSuccess(result) {
  console.log(result);
}

function handleError(result) {
  console.log(result);
}

module.exports = router;
