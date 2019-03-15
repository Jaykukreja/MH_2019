const express =require('express');
const router=express.Router();
const bodyParser = require('body-parser');

const con = require('../database/databaseConnection');
const fun=require('../utils/utils.js');



router.post('/unverified', (req, res) =>{

  con.query('SELECT cid,fName, lName, contactNo FROM citizen where status = 0', function (error, results, fields) {
  if (error){
    console.log(error)
    res.sendStatus(400);
  }
  else
  { 
    console.log(results)
    /*res.sendStatus(200);
    const storage = multer.diskStorage({
      destination:function(req,file,cb){
        cb(null,'./uploads/citizen/'+cid)
      },
      filename:function(req,file,cb){
        cb(null,cid)
      }
    });
    for (var i = 0 ; i <= results.length - 1; i++) {
      con.query('SELECT photography from citizen_documents where cid = ?',[cid[i]], function (error, results, fields) {
      if (error){
        console.log(error)
        res.sendStatus(400);
      } 
      else
      {
        res.sendStatus(200);
        let temp = results;
        console.log(temp);
        //res.send(results);
      }
      });*/

      console.log(results.length)
      //const cid=5
      //var resultant_array=[];
      var resu=[];
      for (var i = 0; i < results.length; i++) {
      const cid = results[i].cid
      const contactNumber = results[i].contactNo;
      console.log(contactNumber)
      const firstName = results[i].fName;
      const lastName = results[i].lName;
      //const gender = results[i].gender;
      //const email = results[i].email;
      //const password = results[i].password;
      // const key=
      // const cn=fun.decrypt(key,contactNumber);
      // const fn=fun.decrypt(key,firstName);
      // const ln=fun.decrypt(key,lastName);
      // const gr=fun.decrypt(key,gender);
      // const em=fun.decrypt(key,email);
      // const ps=fun.decrypt(key,password); //,lastName:lastName
      let json1 = {cid:cid,firstName:firstName,contactNumber:contactNumber};
      //console.log(i);
      //console.log("ji"+resultant_array[i])
      resu.push(json1)
      //const temp=resu[i].push(json1)
      //console.log(json1)
      }
      // const contactNumber = results[i].contactNo;
      // const firstName = results[i].fname;
      // const lastName = results[i].lname;
      // const gender = results[i].gender;
      // const email = results[i].email;
      // const password = results[i].password;
      // const cn=fun.decrypt(key,contactNumber);
      // const fn=fun.decrypt(key,firstName);
      // const ln=fun.decrypt(key,lastName);
      // const gr=fun.decrypt(key,gender);
      // const em=fun.decrypt(key,email);
      // const ps=fun.decrypt(key,password); //,lastName:lastName
      // let json = {cid:5,firstName:fn,contactNumber:cn};
      // res.send(json)
      console.log("ishmeet ko bejna");
      console.log(resu);
    }

    //res.send(results);
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

module.exports = router