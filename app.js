var createError = require('http-errors');
var express = require('express');
var path = require('path');
const mongoose =require("mongoose");
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/Api/users');
var employeesRouter = require('./routes/Api/Employee');
const { Mongoose } = require('mongoose');
var session=require('express-session')
const connectDB=require("./DBConnect/Connection")
var app = express();
var sessionAuth=require("./middleware/SessionAuth");
var config=require("config");



app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge:60000 }
}))
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(sessionAuth);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.set('trust proxy', 1) // trust first proxy

app.use('/employees', employeesRouter);
app.use('/', usersRouter);
app.use('/', indexRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
//mongodb://localhost/Management
//connectDB();
mongoose.connect("mongodb+srv://newUser:game1234@employeemanage.fzfcy.mongodb.net/Management?retryWrites=true&w=majority",{ useNewUrlParser: true,useUnifiedTopology: true })

.then(async()=>{
console.log("Connnection has been created ");


}).catch((err)=>{
  console.log("Connection Failed");
  console.log(err);
})
//const Port=process.env.PORT||3000;
//app.listen(Port, ()=>console.log('server started'));*/
module.exports = app;
