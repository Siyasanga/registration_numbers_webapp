const express = require('express');
const flash = require('express-flash');
const session = require('express-session');
const exhbs = require('express-handlebars');
const body = require("body-parser");
const regs = require('./model');
const app =  express();
app.use(body.urlencoded({
  extended:true
}));
app.use(session({secret:"keyboard cat", cookie: { maxAge: 60000}}));
app.use(flash());
app.use(express.static("public"));
app.set("view engine","hbs");
app.engine("hbs",exhbs({
  defaultLayout:"main",
  extname:"hbs"
}));
app.get("/reg_numbers",function(req, res) {
  regs.find({},function(err, db) {
    if(err)
      console.log(err);
    res.render("home",{reg:db});
  });
});
app.post("/reg_numbers",function(req, res) {
  // console.log(req.body);
  // res.send(req.body);
  if(req.body.regNumba.length<1){
    req.flash("blank","Please enter the registration number.");
    res.redirect("/reg_numbers");
    return;
  }
  regs.findOne({regNum:req.body.regNumba},function(err,doc) {
    if (err) {
      console.log(err);
      return;
    }
    else if(doc){
      req.flash("duplicate",req.body.regNumba+" already exists in the database.");
      res.redirect("/reg_numbers");
    }
    else {

      var newPlate = new regs({regNum:req.body.regNumba});
      newPlate.save(function(err,doc) {
        if(err)
        console.log(err);
        else {
          console.log(req.body.regNumba+" successfully saved to the database.");
          req.flash("success",req.body.regNumba+" successfully saved to the database.");
          res.redirect("/reg_numbers");
        }
      });
    }
    });
});
app.get("/:filter",function(req, res) {
  var reg = req.params.filter;
  if(reg == "All")
    reg = "";
  regs.find({regNum:{$regex: reg}},function(err, db) {
    if(err)
      console.log(err);
    res.render("home",{reg:db});
  });
});
var port = process.env.PORT || 3000;
var host = process.env.HOST || "http://localhost";
app.listen(port, function() {
  console.log("Server running at "+host+":"+port+"/");
});
