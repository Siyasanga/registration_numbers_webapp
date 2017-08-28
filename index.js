const express = require('express');
const exhbs = require('express-handlebars');
const body = require("body-parser");
const regs = require('./model');
const flash = require('express-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const app =  express();
app.use(cookieParser());
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
  }
  regs.findeOne({regNum:req.body.reg},function(err,doc) {
    if(err){
      var newPlate = new regs({regNum:req.body.reg});
      newPlate.save(function(err,doc) {
        if(err)
          console.log(err);
        else {
            console.log(req.body.reg+" successfully saved to the database.");
            req.flash("success",req.body.reg+" successfully saved to the database.");
            res.redirect("/reg_numbers");
        }
      });
    }
    });
});
app.get("/:filter",function(req, res) {
  var reg = req.params.filter;
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
