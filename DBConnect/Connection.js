const mongoose= require("mongoose");

const URI="mongodb+srv://newUser:game1234@employeemanage.fzfcy.mongodb.net/Management?retryWrites=true&w=majority"
const connectDB= async()=>{

await mongoose.connect(URI,{
useUnifiedTopology:true,
useNewUrlParser:true,

});
console.log("online connection started....")
}

module.exports=connectDB;
