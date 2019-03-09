const http = require('http');
const express =require('express');
const app = express();
const bodyParser = require('body-parser');
//const mongoose = require("mongoose");
const Web3 = require('web3');
const BigNumber = require('bignumber.js');
const port=process.env.PORT || 8080;
const session = require('express-session');
const bcrypt = require('bcrypt-nodejs');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const multer = require('multer');
const path = require('path');
const encrypt= require('./encryptFolder.js');
const decrypt= require('./decryptFolder.js');
//const t = require('./passport.js');
const md5 = require('md5');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine','ejs');
var publicDir = require('path').join(__dirname,'/public');
app.use(express.static(publicDir));


var macfromip = require('macfromip');

//var Patient = require('./models/patient');
var staff = require('./models/staff');
//var Treatment = require('./models/treatment');

var router   = express.Router();

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017";

//Database Connection
//mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://localhost:27017/MediChain2', {useNewUrlParser: true});
//Login
app.post('/',(req, res)=>{
	console.log("working");
});


app.post('/signup',(req,res)=>{

 		var patientId = req.body.patientId;
 		const firstName = req.body.firstName;
		const lastName = req.body.lastName;
 		var password = req.body.password;
		//var hash = bcrypt.hashSync(password,bcrypt.genSaltSync(9));
		//var hash  = generateHash(password);
		var hash = md5(password);
		console.log(password);
		console.log(hash);
		dataArray = {patientId:patientId,firstName:firstName,lastName:lastName,password:hash}
		var data = new Patient(dataArray);
		data.save()
		.then(result => {
		console.log(result);
		console.log("success");
	})
		.catch(err => console.log(err));
})

app.post('/login', function(req,res){

		var username = req.body.uname;
		var password = req.body.pass;
		console.log(username);
		console.log("password is"+password);



MongoClient.connect(url, function(err, db) {
  	if (err) throw err;
  	var dbo = db.db("MediChain2");
		//var num=101;
  //Find the first document in the customers collection:
  dbo.collection("staff").findOne({},{"staffId":username}, function(err, result) {
			if(err){
				console.log(err);
			}
			else{
				console.log(result);
				console.log("found");
				const hash = result.password;
				console.log(hash)
				if(hash == password){
					//user_firstName,user_lastname,response=1
					var response={"success":"1","firstname":result.firstname,"lastname":result.lastname,"mobileNumber":"9594813901"}
					console.log("sahi hia");
					res.send(response);
				}
				else{console.log("galat");
					res.send({"success":"0"});
			}
  }
});

	});
});

//registerfcm
//notification

//var firebase = require('firebase');

const JSON = require('circular-json');

app.get('/',function(req,res){
	res.render(staff,{});
});

app.get('/exporttocsv', function(req, res, next) {
	console.log("Galat Hai");
	 var filename   = "staff.csv";
	 var dataArray;

	 MongoClient.connect(url, function(err, dbb) {
 			if (err) throw err;
 			var dbo = db.db("MediChain2");
			console.log("Galat Hai 2");
 			//var num=101;
 		//Find the first document in the customers collection:
 		dbo.collection("staffs").findOne({}, function(err, result) {
 				if(err){
 					console.log(err);
 					 res.send(err);

 				}
 				else{
					//console.log(filename);



					// const Json2csvParser = require('json2csv').Parser;
					// const fields = ['field1', 'field2', 'field3'];
					// const opts = { fields };
          //
					// try {
					//   const parser = new Json2csvParser(opts);
					//   const csv = parser.parse(result);
					//   console.log(csv);
					// } catch (err) {
					//   console.error(err);
					// }

 					res.statusCode = 200;
 					res.setHeader('Content-Type', 'text/csv');
 					res.setHeader("Content-Disposition", 'attachment; filename='+filename);
 					//res.csv(result, true);
					//res.csv(["staffId", "firstname", "lastname", "password", "role","registration_time","isBlocked","isDeleted"]);
					//res.csv(result,["staffId", "firstname", "lastname", "password", "role","registration_time","isBlocked","isDeleted"],true);
					//const json = JSON.stringify(obj);
					//console.log(result);
					res.send(result);
					console.log("Sahi Hai");
					 // console.log('result:', result);
				}
 	});

 	});
});



//
// app.get('/tocsv', function(req, res, next) {
//
//
// 	MongoClient.connect(url, function(err, db) {
// 	  	if (err) throw err;
// 	  	var dbo = db.db("MediChain2");
// 			//var num=101;
// 	  //Find the first document in the customers collection:
// 	  dbo.collection("staff").findOne({}, function(err, result) {
// 				if(err){
// 					console.log(err);
// 					 res.send(err);
// 				}
// 				else{
// 					var filename   = "staff.csv";
// 					var dataArray;
//
// 							res.statusCode = 200;
// 							res.setHeader('Content-Type', 'text/csv');
// 							res.setHeader("Content-Disposition", 'attachment; filename='+filename);
// 							res.csv(result, true);
// 							res.status(200).send(csv);
// 				}
// });
//
// 		});
//
// });


app.listen(8080);
console.log("Listening on 8080");
