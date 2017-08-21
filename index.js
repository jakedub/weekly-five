const express = require ("express");
const app = express ();
const bodyParser = require("body-parser");
const mustacheExpress = require("mustache-express");
const session = require("express-session");

//need here the sessions
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}));

//mustache
app.engine("mustache", mustacheExpress());
app.set("views", "./views")
app.set("view engine", "mustache");

//body parser
app.use(bodyParser.urlencoded({extended:true}));

//test
app.get("/hello", function(req, res){
  res.json({"hello":"world"});
});

if (require.main==="module"){
  app.listen(3000,function(){
    console.log("Server Started");
  })
}
module.export = app;


//global variable for users
let users = [];

app.get("/", function(req,res){
  res.render("index");
})


app.listen(3000, function(){
  console.log("I can hear you");
})
