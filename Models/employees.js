const mongoose= require("mongoose");
var employeesSchema=mongoose.Schema({
    Name  : String,
    Email :String,
    Address :String,   
    Phone :Number,
});

const Employees=mongoose.model("employees",employeesSchema);
module.exports= Employees;