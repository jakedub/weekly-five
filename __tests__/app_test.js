//testing
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
