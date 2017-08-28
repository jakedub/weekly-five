// login as an existing snippet user
const express = require("express");
const router = express.Router();

//test NOTE: THIS DOES NOT WORK!!!
// const request = require("supertest");
// const app = require("../index");
//
// describe("GET /hello", function () {
//   test("should return successfully", function () {
//     return request(app)
//       .get("/hello")
//       .expect(200)
//       .expect("Content-Type", "application/json; charset=utf-8")
//       .expect(function (res) {
//         expect(res.body['hello']).toBe("world");
//       });
//   })
// })



router.get('/', function(req, res){
  res.render('login');
})

// router.post('/home', function(req, res){
//   let name = req.body.username;
//   let password = req.body.password;
//   console.log(req.body);
//   if (users[name] === password){
//     req.session.username = name
//     req.session.password = password
//     res.redirect('/');
//   }
//   else{
//     res.redirect('/login');
//     console.log('nope');
//   }
// });
//
// router.get('/', function(req, res){
//   let currentUser = {};
//   currentUser.username = req.session.username
//   currentUser.password = req.session.password
//   if (typeof req.session.username !== 'undefined'){
//     res.render('login', currentUser);
//   }
//   else{
//     console.log('redirected to login!');
//     res.redirect('/login');
//   }
// });







module.exports = router;
