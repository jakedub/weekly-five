//see all of a user's snippets for a specific tag

const express = require("express");
const router = express.Router();


//needs for add
router.get('/tags', function(req,res){
  res.render('tags');
})
//needs for remove

module.exports = router;
