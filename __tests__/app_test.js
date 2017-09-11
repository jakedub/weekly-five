//testing
const arith = require ("../index");

describe("GET /hello", function(){
  test("Should run successfully", function(){
    return request(app) //returning the app with the below
    .get("/hello") //get request to this url
    .expect(200) //status that returns
    .expect("content-Type", "application/json; charset=utf-8") //expecting the content type JSON for the output
    .expect(function(res) {
      expect(res.body["hello"]).toBe("world"); //key of hello and the value of world. .Body is similar to body parser
    })
  })
})



const maths = require ("../maths"); //this is referring the JS file for testing purposes. Would need a module.export = {function name:function name};

test("math.js should have an add function", () => {
  expect.maths.add).toBeDefined();
})

test ("map should apply a function to every element in a list", () => {
  function timesTwo(x) {
    return x * 2;
  }
  expect(maths.map(timesTwo, [1,2,3])).toEqual([2,4,6]);
})

//maths.js

const add = (x,y) => x+y;

module.exports = {
  map: (fn, arr) => {
    const result = [];
    for (let i =0; i<arr.length; i++){
      result.push(fn(arr[i]));
    }
    return result;
  }
}


const app = require ("../index");
test("registering should add a user", () => {
  app.register({
    user: "Frank",
    password: "password"
  })
  expect(app.users).toHaveLength(1);
  expect(app.users[0].user).toEqual("Frank");
  expect(app.users[0].posts).toEqual([]);
})

function App(){

}
module.exports = {
  App: App
}
