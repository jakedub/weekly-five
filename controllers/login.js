// login as an existing snippet user

const express = require("express");
const router = express.Router();

router.post('/auth', function(req, res){
  let username = req.body.username;
  let password = req.body.password;
  console.log(req.body);
  if (users[name] === password){
    req.session.username = username
    req.session.password = password
    res.redirect('/home');
  }
  else{
    alert('A combination of username and password is incorrect')
    res.redirect('/login');
    console.log("nope");
  }
});

router.post("/", function(req, res) {
  req.session.userIndex = username.findIndex(function(user) {
    return user.username === req.body.username && user.password === req.body.password;
  });
  if (req.session.userIndex) {
    res.redirect("/all");
  } else {
    req.redirect("/home");
  }
});



module.exports = router;
