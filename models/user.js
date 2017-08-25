const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true},
  password: { type: String, required: true},
  snippets: [{
    title: String,
    body: String,
    notes: String,
    language: String,
    tags: String
  }]
})


const User = mongoose.model("User", userSchema);
 
module.exports = User;
