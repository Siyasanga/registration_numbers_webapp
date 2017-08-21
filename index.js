const express = require('express');
const exhbs = require('express-handlebars');
const body = require("body-parser");
var app = new express();
app.use(body.urlencoded({
  extended:true
}));
app.use(express.static("public"));
app.set("view engine","hbs");
app.engine("hbs",exhbs({
  defaultLayout:"main",
  extname:"hbs"
}));
app.get("/",function(req, res) {
  console.log("Inside get");
  res.render("home");
});
var port = process.env.PORT || 3000;
var host = process.env.HOST || "http://localhost";
app.listen(port, function() {
  console.log("Server running at "+host+":"+port+"/");
});
app.post("/",function(req, res) {
  console.log(req.body);
  res.send(req.body);
})
