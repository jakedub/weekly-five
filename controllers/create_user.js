// create a user
const express = require("express");
const router = express.Router();


router.get('/', function(req, res){
  res.render('createuser');
});

router.post('/', function(req, res){
  let username = req.body.username;
  let password = bcrypt.hashSync(req.body.password, 8);
  MongoClient.connect(url)
  .then(function(db){
    db.collection('users')
    .insertOne({username: username, passwordHash: password})
    .then(function(user){
      console.log(user);
    })
    db.close();
  });
});

module.exports = router;
