const express = require ("express");
const app = express ();
const bodyParser = require("body-parser");
const mustacheExpress = require("mustache-express");

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
