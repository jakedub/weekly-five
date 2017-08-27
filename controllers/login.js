// login as an existing snippet user
const express = require("express");
const router = express.Router();

//test


router.get('/', function(req, res){
  let currentUser = {};
  currentUser.username = req.session.username
  currentUser.password = req.session.password
  if (typeof req.session.username !== 'undefined'){
    res.render('login', currentUser);
  }
  else{
    console.log('redirected to login!');
    res.redirect('/login');
  }
});

router.get('/', function(req, res){
  res.render('login');
})

router.post('/home', function(req, res){
  let name = req.body.username;
  let password = req.body.password;
  console.log(req.body);
  if (users[name] === password){
    req.session.username = name
    req.session.password = password
    res.redirect('/');
  }
  else{
    res.redirect('/login');
    console.log('nope');
  }
});







module.exports = router;
