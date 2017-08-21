const mongoose = require('mongoose');
mongoose.model("regdb",{
  regNum:String
})
var mongoURL = process.env.MONGO_DB_URL || "mongodb://localhost/regdb";
mongoose.connect(mongoURL,function(err,result) {
  if(error)
    console.log(err);
  else
    console.log("Database Connenction Established!");
});
var regNumModel = mongoose.model("plate",{
  regNum:String
});
module.exports = regNumModel;
