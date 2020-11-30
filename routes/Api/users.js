var express = require('express');
var router = express.Router();
var User= require("../../Models/users")

/* GET users listing. */
router.get('/register', function(req, res, next) {
  res.render('users/register');
});
router.get('/login', function(req, res, next) {
  res.render('users/login');
});
router.get('/logout', function(req, res, next) {
  req.session.user=null;
  res.redirect('/login');
});
router.post("/login", async function (req, res, next) {
  let user = await User.findOne({
    Email: req.body.Email,
    Password: req.body.Password,
  });
  console.log(user);
  if (!user) return res.redirect("/login");
  req.session.user = user;
  return res.redirect("/");
});


router.post('/register', async function(req, res, next) {
 // console.log(req.body);
  let user =new User(req.body);
  await user.save();
  res.redirect('/employees');
});

module.exports = router;
