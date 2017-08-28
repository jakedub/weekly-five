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
      language: req.body.language,
    }]
  })
  .then(handleSuccess)
  .catch(handleError)
  res.render("/language");
});

function handleSuccess(result) {
  console.log(result);
}

function handleError(result) {
  console.log(result);
}

module.exports = router;
