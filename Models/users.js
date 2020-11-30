const mongoose= require("mongoose");
var usersSchema=mongoose.Schema({
    Name  : String,
    Email :String,
    Password :String,   
   });

const UsersDB=mongoose.model("usersdb",usersSchema);
module.exports= UsersDB;