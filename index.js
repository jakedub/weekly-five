const express = require ("express");
const app = express ();
const bodyParser = require("body-parser");
const mustacheExpress = require("mustache-express");
const session = require("express-session");
const morgan = require("morgan");
//Controllers
const createController = require("./controllers/create_new");
const languageController = require("./controllers/language");
const listController = require ("./controllers/list");
const loginController = require ("./controllers/login");
const seeController = require ("./controllers/see_specific");
const tagController = require ("./controllers/tag");
const userController = require ("./controllers/register");

//Combine routes
app.use("/create", createController);
app.use("/language", languageController);
app.use("/list", listController);
app.use("/login", loginController);
app.use("/see", seeController);
app.use("/tag", tagController);
app.use("/register", userController);

//morgan
app.use(morgan('combined'))

app.get('/', function (req, res) {
  res.send('hello, world!')
})

//Mongo
const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017/users";

//Mongoose
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/users');

const User= require("./models/user");
//Session
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));

//mustache
app.engine("mustache", mustacheExpress());
app.set("views", "./views")
app.set("view engine", "mustache");

//body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//added in someone to the database to begin
let newUsers = [{
  username: "bill",
  password: "1234",
  snippets: [{
    title: "This is a title",
    body: "Here is the body",
    notes: "I might have entered a note",
    language: "English",
    tags: "here is a tag"
  }]
  }];
//Do NOT run
// // User.create(newUsers)
// // .then(handleSuccess)
// // .catch(handleError);
//
// function handleSuccess(result){
//   console.log(result);
// };
//
// function handleError(result){
//   console.log(result);
//   console.log("This is an error");
// }

//store in session
app.get('/', function(req, res){
  let myUser = {};
  myUser.username = req.session.username
  myUser.password = req.session.password
  if (typeof req.session.username !== 'undefined'){
    res.render('index', myUser);
  }
  else{
    console.log('redirected to login!');
    res.redirect('/login');
  }
});


//render login page
app.get('/login', function(req, res){
  res.render('login');
})

//user authentication
app.post('/home', function(req, res){
  let username = req.body.username;
  let password = req.body.password;
  console.log(req.body);
  if (newUsers[username] === password){
    req.session.username = username
    req.session.password = password
    res.redirect('/home');
  }
  else{
    res.redirect('/login');
    console.log('somethings broken');
  }
});

//testing

app.get('/hello', function (req, res) {
  res.json({"hello": "world"})
})

if (require.main === "module") {
  app.listen(3000, function () {
      console.log('Express running on http://localhost:3000/.')
  });
}

module.exports = app;

app.get("/login", function(req, res){
  MongoClient.connect(url)
    .then(function(db){
      return db.collection("users").find().toArray(function(err, doc){
        // console.log(doc);
        res.render("login", {users:doc});
      });
      db.close();
    });
  });

  app.get("/completed", function(req, res){
    return User.find()
    .then(function(user){
    res.render("completed", {data: user})
    })
    });

// //render homepage
app.get("/home", function (req,res){
  res.render("all");
})

app.post("/", function (req,res){
  res.redirect("/login");
})

//should be creating
app.post("/", function(req,res){
  console.log(req.body);
  User.create({
    username: req.body.username,
    password: req.body.password,
    snippets: [{
      title: req.body.title,
      body: req.body.body,
      notes: req.body.notes,
      language: req.body.language,
      tags: req.body.tags
    }]
  })
  .then(handleSuccess)
  .catch(handleError)
  res.render("/home");
});

// app.get("/completed", function(req,res){
//   return User.find()
//   .then(function(user){
//     res.render("completed" {data:user})
//   })
// });

// //check sessions
app.use(function(req, res, next) {
    if (typeof req.session.users === "undefined") {
      req.session.users = [];
      req.session.userIndex = null;
    }
    next();
});

app.get('/login', function(req, res){
  res.render('login');
});

app.post('/login', function(req, res){
  let username = req.body.username
  let password = req.body.password
  MongoClient.connect(url)
  .then(function(db){
    db.collection('users')
    .findOne({username: username})
      .then(function(data){
        db.close()
        if(bcrypt.compareSync(password, data.passwordHash)){

          res.redirect('/home');
        } else {
          res.send('nope')
        }
      })
  })
});

app.get('/', function(req, res){
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

//check/start the server
app.listen(3000, function(){
  console.log("I can hear you");
})
