const express =require('express');
const router=express.Router();
var multer  = require('multer')
const bodyParser = require('body-parser');


const con = require('../database/databaseConnection');
const fun=require('../utils/utils.js');

router.get('/test',(req,res)=>{
  console.log("works");
});


//Displays unverified list consisting of pic, names, contact name
router.post('/unverified', (req, res) =>{

  con.query('SELECT cid,fName, lName, contactNo FROM citizen where status = 0', function (error, results, fields) {
  if (error){
    console.log(error)
    res.sendStatus(400);
  }
  else
  { console.log(results)
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


//approval
router.post('/unverified/approved',(req, res) =>{
	var cid = req.body.cid;
	connection.query('update citizen set status = 1 where cid = ?',[cid], function (error, fields) {
	if (error){
		console.log(error)
		res.sendStatus(400);
	}
	else
	{
		res.sendStatus(200);
		//res.send(results);
	}
	});
});


module.exports = router