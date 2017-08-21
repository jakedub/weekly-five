const express = require ("express");
const app = express ();
const bodyParser = require("body-parser");
const mustacheExpress = require("mustache-express");
const session = require("express-session");

//Controllers
const createController = require("./controllers/create_new");
const languageController = require("./controllers/language");
const listController = require ("./controllers/list");
const loginController = require ("./controllers/login");
const registerController = require ("./controllers/register");
const seeController = require ("./controllers/see_specific");
const tagController = require ("./controllers/tag");

//Combine routes
app.use("/create", createController);
app.use("/language", languageController);
app.use("/list", listController);
app.use("/login", loginController);
app.use("/register", registerController);
app.use("/see", seeController);
app.use("/tag", tagController);

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

//render login page
app.get("/", function(req,res){
  res.render("index");
})

//check sessions
app.use(function(req, res, next) {
    if (typeof req.session.users === "undefined") {
      req.session.users = [];
      req.session.userIndex = null;
    }
    next();
});

//check/start the server
app.listen(3000, function(){
  console.log("I can hear you");
})
