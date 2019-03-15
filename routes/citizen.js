const express =require('express');
const router=express.Router();
const bodyParser = require('body-parser');

const con = require('../database/databaseConnection');
const fun=require('../utils/utils.js');


//Citizen Registration (APP).

router.post('/registration',(req,res)=>{
  console.log("ji");
	const contactNumber = req.body.phone;
	const firstName = req.body.fname;
	const lastName = req.body.lname;
	const gender = req.body.gender;
	const email = req.body.email;
	const password = req.body.password;
	const key = fun.generateKey();
  console.log(key);
  console.log(firstName);
  console.log(lastName);

	const cn=fun.encrypt(key,contactNumber);
	const fn=fun.encrypt(key,firstName);
	const ln=fun.encrypt(key,lastName);
	const gr=fun.encrypt(key,gender);
	const em=fun.encrypt(key,email);
	const ps=fun.encrypt(key,password);

  
	var sql = "INSERT INTO citizen (fname,lname,password,email,contactNo,gender) VALUES ('"+fn+"','"+ln+"','"+ps+"','"+em+"','"+cn+"','"+gr+"')";
	con.query(sql, function (err, result) {
	    if (err) throw err;
	    console.log("1 record inserted");
	  });
});


router.get('/timepass',(req,res)=>{
  console.log("hi")
  var result=[{fn:"jay",ln:"kukrea"}]
  console.log(result);
  res.render("home",{result:result})
  
});


router.post('/upload',(req,res)=>{
  // const k=req.body.uname;
  // const j=req.body.pass;
  console.log("jijiijij");
  const key = fun.generateKey();
  console.log(key);
  const temp=fun.citizenRegisteratn(1,key);

});

//takes 'contactNumber' and 'password' from front and logs in 

// router.post('/', (req, res) =>{
//      var contactNumber= req.body.contactNumber;
//      var password = req.body.password;
//      //Query to select the tuple of the user
//      con.query('SELECT * FROM citizen WHERE contactNumber = ?',[contactNumber], function (error, results, fields) {
//      if (error) {
//       console.log(error);
//       res.sendStatus(404);
//      }else{
//        if(results.length >0){
//           //User exists
//           if(results[0].password == password){
//              //Users password match
//              res.sendStatus(200).send({
//                "role":results[0].role
//              });
//           }
// 	        else{
//             //Users password do not match
//             res.sendStatus(404);
//           }
//        }
//        else{
//          //User does not exist
//          res.sendStatus(404);
//        }
//       }
//     });
// });

// //takes 'cid' from front and displays the details

// router.post('/view', (req,res) => {
// 	var cid= req.body.cid;
//   con.query('Select fname,lname, email,contactNo, gender,status from citizen where cid = ?',[cid],function(error,results,fields){
//     if(error){ 
//       console.log(error);
//       res.sendStatus(400);
//     }
//     else{
//       res.send(results);
//     }
//   });

router.get('/test',(req,res)=>{
  console.log("works");
})

module.exports = router