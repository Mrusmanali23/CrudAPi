var express = require('express');
var router = express.Router();
var Employee=require("../../Models/employees");
var checkSessionAuth=require("../../middleware/checkSession");
/* GET home page. */
router.get('/', async function(req, res, next) {
  let employees= await Employee.find();
  //console.log(employees);
  res.render('employees/list',{Name:"Employees List", employees  });
});
router.get('/add',checkSessionAuth, async function(req, res, next) {
  
  res.render('employees/add');
});
router.post('/add', async function(req, res, next) {
 // console.log(req.body);
 let newEmployee= new Employee(req.body);
 await newEmployee.save();
  res.redirect("/employees");
});
router.get('/delete/:id', async function(req, res, next) {
  //console.log(req.params.id);
  let emp=await Employee.findByIdAndDelete(req.params.id);
  res.redirect("/employees");
});
router.get('/edit/:id', async function(req, res, next) {
try{
  let emp=await Employee.findById(req.params.id);
  if (!emp)
    return res.status(400).send("Employee not found")
  return res.render("employees/edit",{emp})
}  catch(err){

    return res.status(400).send("Invalid ID");
  }
  //res.redirect("/employees");
});
router.post('/edit/:id', async function(req, res, next) {

  let emp=await Employee.findById(req.params.id);
  if (!emp)
    return res.status(400).send("Employee not found");
  else{
  emp.Name=req.body.Name;
  emp.Email=req.body.Email;
  emp.Address=req.body.Address;
  emp.Phone=req.body.Phone;
  await emp.save();
}
  res.redirect("/employees");
  //res.redirect("/employees");
});

module.exports = router;
