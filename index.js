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
const seeController = require ("./controllers/see_specific");
const tagController = require ("./controllers/tag");
const userController = require ("./controllers/create_user");

//Combine routes
app.use("/create", createController);
app.use("/language", languageController);
app.use("/list", listController);
app.use("/login", loginController);
app.use("/see", seeController);
app.use("/tag", tagController);
app.use("/user", userController);

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
app.use(bodyParser.urlencoded({extended:true}));

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
//
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
//
// // //test
app.get("/hello", function(req, res){
  res.json({"hello":"world"});
});

if (require.main==="module"){
  app.listen(3000,function(){
    console.log("Server Started");
  })
}
module.export = app;

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

// //render all for the homepage. Requires login. Todo: Needs a requirement for logging in
app.get("/home", function (req,res){
  res.render("all");
})

app.post("/", function (req,res){
  res.redirect("/login");
})

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

app.get("/registration", function(req,res){
  res.render("create")
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

app.get('/create/user', function(req, res){
  res.render('createuser');
});


app.post("/create/user", function(req,res){
  let username = req.body.username;
  let password = bcrypt.hashSync(req.body.password, 8);
  MongoClient.connect(url)
  .then(function(db){
    db.collection("users")
    .insertOne({username: username, passwordHash: password})
    .then(function(user){
      console.log(user);
    })
    db.close();
  })
});

//check/start the server
app.listen(3000, function(){
  console.log("I can hear you");
})
