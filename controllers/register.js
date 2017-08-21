// register as a new snippet user

const express = require("express");
const router = express.Router();

router.post("/register", function(req, res) {
    req.session.users.push({
      email: req.body.email,
      password: req.body.password,
      tags: []
    });
req.session.userIndex = req.session.users.length - 1;

res.redirect("/tag");
});


module.exports = router;
