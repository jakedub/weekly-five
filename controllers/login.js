// login as an existing snippet user

const express = require("express");
const router = express.Router();

router.post("/login", function(req, res) {
  req.session.userIndex = users.findIndex(function(user) {
    return user.email === req.body.email && user.password === req.body.password;
  });
  if (req.session.userIndex) {
    res.redirect("/list");
  } else {
    req.redirect("/");
  }
});


module.exports = router;
